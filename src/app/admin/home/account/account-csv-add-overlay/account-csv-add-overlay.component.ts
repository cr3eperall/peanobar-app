import { HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from './../../../../services/UserDTO';
import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-account-csv-add-overlay',
  templateUrl: './account-csv-add-overlay.component.html',
  styleUrls: ['./account-csv-add-overlay.component.css']
})
export class AccountCsvAddOverlayComponent implements OnInit {

  @Input()
  users?:{ user: UserDTO; password: string; }[];

  errorMap=new Map<UserDTO,string>();
  showFailed=false;

  message:string="";
  mode:string="1";

  private _completed: number = 0;
  
  @Input()
  public set completed(value: number) {
    this._completed = value;
    this.progress=this.completed.toString()+'%';
  }
  public get completed(): number {
    return this._completed;
  }
  @HostBinding("style.--progress")
  progress:string="0%";
  
  private _failed?: { user: UserDTO; error: HttpErrorResponse; }[] | undefined = undefined;

  @Output()
  closed=new EventEmitter();
  @Output()
  upload=new EventEmitter<{ user: UserDTO; password: string; }[]>();

  failedUpdate_localized=$localize `Failed user updates:`;
  update_localized=$localize `Users to update`;

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.closed.emit();
    this.showFailed=false;
  }

  update(){
    this.upload.emit(this.users!);
  }

  @Input()
  public set failed(value: { user: UserDTO; error: HttpErrorResponse; }[] | undefined) {
    this._failed = value;
    if (value!==undefined&&this.completed===100) {
      
      this.users=[];
      for (const error of value) {
        this.users.push({user:error.user,password:""});
        this.errorMap.set(error.user,(error.error.error as string).substring((error.error.error as string).indexOf(" ")));
      }
      this.showFailed=true;
    }else if(value==undefined){
      this.showFailed=false;
      this.errorMap.clear();
    }
  }
  public get failed(): { user: UserDTO; error: HttpErrorResponse; }[] | undefined {
    return this._failed;
  }

  mousePosition = {
    x: 0,
    y: 0
  };

  mouseDown($event: MouseEvent) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }
  onClick(event: Event) {
    if (
      Math.abs(this.mousePosition.x - (event as PointerEvent).screenX)<2 &&
      Math.abs(this.mousePosition.y - (event as PointerEvent).screenY)<2
    ) {
      this.togglePassword(event);
    }
  }

  togglePassword(e:Event){
    const data=(e.target as HTMLInputElement);
    if (data.type=="password") {
      data.type="text";
    }else{
      data.type="password";
    }
  }

  getRole(id:number): string {
		switch (id) {
			case 1:
        return $localize `User`;
			case 2:
				return "Bar";
			case 3:
				return "Admin";
			default:
				return "";
		}
	}

  getDescription():string{
    switch (this.mode) {
      case "1":
        return $localize `Updates already existing accounts with matching usernames;
        adds new accounts if no matching username is found`;
      case "2":
        return $localize `Adds new accounts if no existing account has the same username;
        does nothing if username already exists`;
      case "3":
        return $localize `Updates already existing accounts with matching usernames;
        does nothing if no matching username is found`;
      default:
        return "";
    }
  }

  isDisabled():boolean{
    return this.users===undefined || this.failed!==undefined || this.errorMap.size>0;
  }

}

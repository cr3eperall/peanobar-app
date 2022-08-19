import { UserService } from './../../../services/bar/user.service';
import { UserDTO } from './../../../services/UserDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  private _classroom?: string | undefined;
  users?:UserDTO[];
  expanded=false;
  @Output()
	editAccount = new EventEmitter<UserDTO>();
  @Output()
  editClassroom=new EventEmitter<string>()

  constructor(private userService:UserService) { }

  public get classroom(): string | undefined {
    return this._classroom;
  }

  @Input()
  public set classroom(value: string | undefined) {
    this._classroom = value;
    if (value===undefined) {
      this.users=undefined;
      this.expanded=false;
    }
  }


  ngOnInit(): void {
  }

  onEditAccount(user:UserDTO) {
		this.editAccount.emit(user);
	}

  edit(){
    this.editClassroom.emit(this.classroom);
  }

  toggleExpansion(value:Event){
    this.expanded=!this.expanded;
    if (this.classroom!==undefined&&this.users===undefined) {
      this.userService.getClassroom(this.classroom!).subscribe((value)=>{
        this.users=value;
      })
    }
  }

}

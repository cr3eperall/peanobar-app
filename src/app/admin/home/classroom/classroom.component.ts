import { UserService } from './../../../services/bar/user.service';
import { UserDTO } from './../../../services/UserDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  private _classroom?: number | undefined;
  users?:UserDTO[];
  expanded=false;
  @Output()
	editAccount = new EventEmitter<UserDTO>();
  @Output()
  editClassroom=new EventEmitter<number>()

  constructor(private userService:UserService) { }

  public get classroom(): number | undefined {
    return this._classroom;
  }

  @Input()
  public set classroom(value: number | undefined) {
    this._classroom = value;
    if (value!==undefined) {
      this.userService.getClassroom(this.classroom!).subscribe((value)=>{
        this.users=value;
      })
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
  }

}

import { UserService } from './../../services/bar/user.service';
import { UserDTO } from './../../services/UserDTO';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //TODO add button to delete account/classroom
  mode="account";
  users?:UserDTO[]=undefined;
  classrooms?:(number|undefined)[]=undefined;
  accountToEdit:UserDTO|undefined|null=undefined;
  classroomToEdit:number|undefined|null=undefined;

  searchModel?="";
  prevDisabled=true;
  nextDisabled=true;
  size=10;
  page=1;
  nAccounts=0;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.countUsers().subscribe((value)=>{
      this.nAccounts=value;
      this.updatePrevNextDisabled();
    })
    this.updateUsers();
    this.userService.getAllClassrooms().subscribe((value)=>{
      this.classrooms=value;
    })
  }

  updatePrevNextDisabled(){
    if (this.page*+this.size>=this.nAccounts) {
        this.nextDisabled=true;
    }else{
      this.nextDisabled=false;
    }
    if (this.page<=1) {
      this.prevDisabled=true;
    }else{
      this.prevDisabled=false;
    }
  }

  pagePrev(){
    this.page--;
    this.updateUsers();
    this.updatePrevNextDisabled();
  }
  pageNext(){
    this.page++;
    this.updateUsers();
    this.updatePrevNextDisabled();
  }

  sizeChanged(){
    this.page=1;
    this.updateUsers();
    this.updatePrevNextDisabled();
  }

  onSearch(){
    if (this.searchModel==undefined||this.searchModel==="") {
      this.updateUsers();
      this.updateClassrooms();
    }else{
      this.userService.searchUser(this.searchModel!,"username").subscribe((value)=>{
        this.users=value;
        for (let i = 0; i < this.classrooms!.length; i++) {
          this.classrooms![i]=undefined;
        }
        this.classrooms=this.getClassroomsFor(this.users);
      })
    }
  }
  
  getClassroomsFor(users:UserDTO[]):number[]{
    let classrooms:number[]=[];
    for (const user of users) {
      if (!classrooms.includes(user.classroom)) {
        classrooms.push(user.classroom);
      }
    }
    return classrooms;
  }

  onClosedAccountEditor(){
    this.accountToEdit=undefined;
  }

  onClosedClassroomEditor(){
    this.classroomToEdit=undefined;
  }
  
  
  openAccountEditor(user:UserDTO){
    this.accountToEdit=user;
  }
  
  openClassroomEditor(classroom:number){
    this.classroomToEdit=classroom;
  }
  
  
  onOpenAddAccount(){
    this.accountToEdit=null;
  }
  
  onAccountEdited(event:{user:UserDTO,mode:"edit"|"add",password?:string}){
    if (event.mode==='add') {
      if (event.password!==undefined) {
        this.userService.createUser(event.user,event.password).subscribe((value)=>{
          this.users?.push(value);
          this.accountToEdit=undefined;
          if (this.mode=="classroom") {
            this.updateClassrooms();
          }
        })
      }
    }else{
      for (let i = 0; i < this.users!.length; i++) {
        if (this.users![i].uuid===event.user.uuid) {
          const q=this.userService.updateUser(this.users![i],event.user);
          if (event.user.balance!=this.users![i].balance) {
            this.userService.updateBalance(this.users![i].uuid,event.user.balance).subscribe((value)=>{
              q.subscribe((value)=>{
                this.users![i]=value;
                this.accountToEdit=undefined;
                  this.updateClassrooms();
              });
            })
          }else{
            q.subscribe((value)=>{
              this.users![i]=value;
              this.accountToEdit=undefined;
                this.updateClassrooms();
            });
          }
        }
      }
    }
  }
  
  onClassroomEdited(event:{old:number|undefined,new:number|undefined}){
    if (this.classrooms?.includes(event.old) && event.old!==undefined && event.new!==undefined) {
      this.userService.updateClassroom(event.old!,event.new!).subscribe((value)=>{
        this.updateClassrooms();
        this.classroomToEdit=undefined;
      });
    }
  }
  
  updateClassrooms(){
    for (let i = 0; i < this.classrooms!.length; i++) {
      this.classrooms![i]=undefined;
    }
    this.userService.getAllClassrooms().subscribe((value)=>{
      this.classrooms=value;
    })
  }

  updateUsers(){
    this.userService.getAll(this.page,this.size).subscribe((value)=>{
      this.users=value;
    })
  }
  onChange(event:Event){
    const e=event.target as HTMLInputElement;
    if (e.checked) {
      this.mode=e.value;
    }
  }
}

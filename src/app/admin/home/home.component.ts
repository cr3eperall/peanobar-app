import { HttpErrorResponse } from '@angular/common/http';
import { CsvUploadService } from './../../services/bar/csv-upload.service';
import { UserService } from './../../services/bar/user.service';
import { UserDTO } from './../../services/UserDTO';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode="account";
  users?:UserDTO[]=undefined;
  classrooms?:(string|undefined)[]=undefined;
  accountToEdit:UserDTO|undefined|null=undefined;
  classroomToEdit:string|undefined|null=undefined;
  
  csvUsers:{ user: UserDTO; password: string; }[]|undefined=undefined;
  csvUploadCompleted:number=0;
  csvUploadFailed?:{user:UserDTO,error:HttpErrorResponse}[]=undefined;

  searchModel?="";
  prevDisabled=true;
  nextDisabled=true;
  size=10;
  page=1;
  nAccounts=0;

  constructor(private userService:UserService, private csvService:CsvUploadService) { }

  ngOnInit(): void {
    this.classrooms=[];
    this.updateClassrooms();
    this.updateUsers();
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

  onEmpty(){
    if (this.searchModel==undefined||this.searchModel==="") {
      this.updateUsers();
      this.updateClassrooms();
    }
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
  
  getClassroomsFor(users:UserDTO[]):string[]{
    let classrooms:string[]=[];
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
  
  onClosedCSVOverlay(){
    this.csvUsers=undefined;
    this.csvUploadCompleted=0;
    this.csvUploadFailed=undefined;
  }
  
  openAccountEditor(user:UserDTO){
    this.accountToEdit=user;
  }
  
  openClassroomEditor(classroom:string){
    this.classroomToEdit=classroom;
  }
  
  resetFile(e:Event){
    const target = (e.target as HTMLInputElement);
    target.files=null;
    target.value="";
  }

  openCSV(e:Event){
    const file = (e.target as HTMLInputElement).files?.item(0)!;
    this.csvService.readFile(file).subscribe((value)=>{
      this.csvService.parseCSVintoUsers(value).subscribe({
        next:(value)=>{
          this.csvUsers=value;
        },error:(err)=>{
          if (err instanceof Error) {
            alert(err.message);
          }
        }
      })
    })
    
  }
  
  onOpenAddAccount(){
    this.accountToEdit=null;
  }
  
  onAccountEdited(event:{oldUser:UserDTO,user:UserDTO,mode:"edit"|"add",password?:string}){
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
          const q=this.userService.updateUser(event.oldUser,event.user);
          if (event.user.balance!=event.oldUser.balance) {
            this.userService.updateBalance(event.oldUser.uuid,event.user.balance).subscribe((value)=>{
              q.subscribe((value)=>{
                this.updateUsers();
                this.accountToEdit=undefined;
                  this.updateClassrooms();
              });
            })
          }else{
            q.subscribe((value)=>{
              this.updateUsers();
              this.accountToEdit=undefined;
              this.updateClassrooms();
            });
          }
        
    }
  }
  
  onClassroomEdited(event:{old:string|undefined,new:string|undefined}){
    if (this.classrooms?.includes(event.old) && event.old!==undefined && event.new!==undefined) {
      this.userService.updateClassroom(event.old!,event.new!).subscribe((value)=>{
        this.updateClassrooms();
        this.updateUsers();
        this.classroomToEdit=undefined;
      });
    }
  }

  onCSVUpload(users:{ user: UserDTO; password: string; }[]){
    let failed:{ user: UserDTO; error: HttpErrorResponse; }[]=[];
      this.csvService.uploadUsers(users,"update").subscribe({
        next:(value)=>{
          if (value.progress>0) {
            this.csvUploadCompleted=value.progress;
          }
          if(value.progress==100){
            if (failed.length==0) {
              this.onClosedCSVOverlay();
            }else{
              this.csvUploadFailed=failed;
            }
            this.updateUsers();
            this.updateClassrooms();
          }else if (value.progress==-1 && !value.success) {
            failed!.push({user:value.user,error:value.error!})
          }
        }
      })
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
    this.userService.countUsers().subscribe((value)=>{
      this.nAccounts=value;
      this.updatePrevNextDisabled();
    })
  }
  onChange(event:Event){
    const e=event.target as HTMLInputElement;
    if (e.checked) {
      this.mode=e.value;
    }
  }

  deleteUser(user:UserDTO){
    this.userService.deleteUser(user.uuid).subscribe((value)=>{
      this.updateUsers();
      this.updateClassrooms()
      this.accountToEdit=undefined;
    });
  }

  deleteClassroom(classroom:string){
    this.userService.deleteClassroom(classroom).subscribe((value)=>{
      this.updateClassrooms();
      this.updateUsers()
      this.classroomToEdit=undefined;
    })
  }

}

import { UserDTO } from './../../../../services/UserDTO';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-account-edit-overlay',
  templateUrl: './account-edit-overlay.component.html',
  styleUrls: ['./account-edit-overlay.component.css']
})
export class AccountEditOverlayComponent implements OnInit {
  
  private _account: UserDTO | undefined | null;

  modelAccount:UserDTO | undefined | null;
  password?:string;
  balance:string|undefined|null;
  message="";
  mode:"edit"|"add"="edit";

  @Output()
  closed=new EventEmitter();
  @Output()
  updated=new EventEmitter<{oldUser:UserDTO,user:UserDTO,mode:"edit"|"add",password?:string}>();
  @Output()
  delete=new EventEmitter<UserDTO>();
  
  addAccount_localized=$localize `Add Account`;
  editAccount_localized=$localize `Edit `;
  constructor() { }
  
  ngOnInit(): void {
  }
  
  public get account(): UserDTO | undefined | null{
    return this._account;
  }

  @Input()
  public set account(value: UserDTO | undefined | null) {
    this._account = value;
    if (value===undefined) {
      this.modelAccount=undefined;
    }else if(value!=null){
      this.mode='edit';
      this.modelAccount={
        uuid:value.uuid,
        fullName:value.fullName,
        username:value.username,
        email:value.email,
        role:value.role,
        balance:value.balance,
        classroom:value.classroom,
        cartOrder:value.cartOrder
      }
      this.balance=(this.modelAccount!.balance/100).toFixed(2);
    }else{
      this.mode='add';
      this.modelAccount={
        uuid:"",
        fullName:"",
        username:"",
        email:"",
        role:{id: 1, name: 'ROLE_USER'},
        balance:0,
        classroom:"",
        cartOrder:null!
      }
      this.password="";
      this._account=this.modelAccount;
    }
  }


  close(){
    this.closed.emit();
  }

  update(){
    if (this.mode==='add') {
      this.updated.emit({oldUser:this.account!,user:this.modelAccount as UserDTO,mode:this.mode,password:this.password!});
    }else{
      this.updated.emit({oldUser:this.account!,user:this.modelAccount as UserDTO,mode:this.mode});
    }
  }

  checkBal():boolean{
    if (this.balance!=null&&this.balance!=undefined) {
      const cost:number=Math.floor(Number.parseFloat(this.balance!)*100)
      if (cost<0) {
        this.message=$localize `The balance must be greater then 0€`;
        return false;
      }else{
        this.message="";
        this.modelAccount!.balance=cost;
        return true;
      }
    }
    return false;
  }

  isDisabled(){
    if (this.mode=='add') {
      if (this.modelAccount?.email===null||this.modelAccount?.email===undefined||this.modelAccount?.email==="") {
        return true;
      }
      if(this.modelAccount?.fullName===null||this.modelAccount?.fullName===undefined||this.modelAccount?.fullName===""){
        return true;
      }
      if(this.modelAccount?.username===null||this.modelAccount?.username===undefined||this.modelAccount?.username===""){
        return true;
      }
      if (this.modelAccount.classroom.length>15) {
        return true;
      }
      if (this.password===undefined||this.password===null||this.password?.length<8) {
        return true;
      }
      return false;
    }else{
      if(this.modelAccount?.balance!=this.account?.balance){
        return false;
      }else if (this.modelAccount?.classroom!=this.account?.classroom) {
        return false;
      }else if (this.modelAccount?.email!=this.account?.email){
        return false;
      }else if (this.modelAccount?.fullName!=this.account?.fullName) {
        return false;
      }
      if (this.message.length>0) {
        return true;
      }
      return true;
    }
  }

  deleteAcc(){
    if (confirm($localize `Are you sure you want to delete this Account?`)) {
      this.delete.emit(this.account!);
    }
  }

}

import { HeaderComponent } from './../user/header/header.component';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string="";
  password:string="";
  loginSucc:string="";
  status:number=0;
  @HostBinding("style.--color")
  color="rgb(0,0,0,0)";
  @HostBinding("style.--message-border-color")
  borderColor="rgb(0,0,0,0)"
  @HostBinding("style.--message-visibility")
  messageVisibility="hidden"

  constructor(private loginService:LoginService, private router:Router) {
  }
  
  login(){
    this.loginService.login(this.username,this.password,(resp)=>{
      if(resp==401){
        this.setMessage(0);
      }else{
        this.loginService.loginStatus().subscribe((ret)=>{
          if(ret==2)
          this.setMessage(1);
        });
      }
    });
  }

  setMessage(type:number){
    switch (type) {
      case 0:
        this.loginSucc="Wrong credentials";
        this.messageVisibility="visible";
        this.color="rgb(221, 75, 57)";
        this.borderColor="rgb(255, 0, 0)";
        break;
      case 1:
        this.loginSucc="Login success";
        this.messageVisibility="visible";
        this.color="rgb(4, 238, 4)";
        this.borderColor="rgb(0, 255, 0)";
        //redirect to homepage for role
        this.router.navigate(["/home"]);
        break;
      case 2:
        this.loginSucc="Already logged in";
        this.messageVisibility="visible";
        this.color="rgb(38, 67, 189)";
        this.borderColor="rgb(0, 0, 255)";
        //redirect to homepage for role
        this.router.navigate(["/home"]);
        break;
      case 3:
        this.loginSucc="Session expired";
        this.messageVisibility="visible";
        this.color="rgba(50, 50, 50, 50%)";
        this.borderColor="rgb(0, 0, 0)";
        break;
      default:
        this.loginSucc="";
        this.messageVisibility="hidden";
        break;
    }
  }

  ngOnInit(): void {
    this.loginService.loginStatus().subscribe((ret)=>this.setMessage(ret));
  }

}

import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../../services/login.service';
import { UserDTO } from './../../services/UserDTO';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  oldPassword="";
  password="";
  passwordConfirm="";
  user?:UserDTO;
  disabled=false;
  message="";
  constructor(private loginService:LoginService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getUser().subscribe({
      next:(value)=>{
        this.user=value;
      },
      error:(err)=>{
        this.user=undefined;
      }
    });
  }

  changePw(){
    if (this.password!=this.passwordConfirm) {
      return;
    }
    //TODO show error message
    this.loginService.changePassword(this.oldPassword,this.password).subscribe({
      next:(value)=>{
        if (value=="OK") {
          console.log("OK V");
          this.router.navigate([""], {relativeTo:this.route.root});
        }else{
          console.log(value);
        }
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err.error);
      }
    });
  }

  checkPw(){
    if (this.password!=this.passwordConfirm) {
      this.message=$localize `Passwords do not match`;
    }else if(this.password.length<8){
      this.message=$localize `Passwords too short`;
    }else{
      this.message="";
    }
  }


}

import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotService } from './../../services/forgot.service';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})
export class ResetpwComponent implements OnInit {
  username?:string;
  password?:string;
  confirmPassword?:string;
  message:string="";
  valid=false;

  @HostBinding("style.--msg-bg-color")
  bgColor="transparent";
  @HostBinding("style.--msg-color")
  msgColor="black"

  constructor(private forgotService: ForgotService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((value)=>{
      if (!value.has("token")) {
        this.bgColor="orangered";
        this.message=$localize `Invalid Token`;
        this.router.navigate([""], {relativeTo:this.route.root});
        return
      }
      if (value.get("token")!.length!==60) {
        this.bgColor="orangered";
        this.message=$localize `Invalid Token`;
        this.router.navigate([""], {relativeTo:this.route.root});
      }
    });
  }

  send(){
    this.route.queryParamMap.subscribe((value)=>{
      if (value.has("token")) {
        const token=value.get("token")!;
        if (this.checkPw()&&token.length==60 &&this.username!==undefined) {
          this.forgotService.newPassword(this.username!,token,this.password!).subscribe({
            next:(value)=>{
              if (value==="CHANGED") {
                this.bgColor="lightgreen";
                this.message=$localize `Password Changed`;
                this.router.navigate([""], {relativeTo:this.route.root});
              }else{
                this.bgColor="red";
                this.message=$localize `Invalid Credentials`;
                this.router.navigate([""], {relativeTo:this.route.root});
              }
            },error:(err:HttpErrorResponse)=>{
              this.bgColor="orangered";
              this.message=$localize `Invalid Credentials`;
              console.log(err.error);
            }
          })
        }
      }else{
        this.bgColor="orangered";
        this.message=$localize `Invalid Credentials`;
      }
    })
  }

  checkPw(){
    if (this.password===undefined || this.password==="" || this.confirmPassword===undefined || this.confirmPassword==="") {
      this.valid=false;
      this.message="";
      return false;
    }
    if (this.password!==this.confirmPassword!) {
      this.bgColor="orangered";
      this.message=$localize `Passwords do not match`;
      this.valid=false;
      return false;
    }else if(this.password.length<8){
      this.bgColor="orangered";
      this.message=$localize `Passwords too short`;
      this.valid=false;
      return false;
    }else{
      this.bgColor="transparent";
      this.message="";
      this.valid=true;
      return true;
    }
  }

}

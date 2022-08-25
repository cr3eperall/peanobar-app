import { HttpErrorResponse } from '@angular/common/http';
import { ForgotService } from './../../services/forgot.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  email?:string;
  message:string="";
  @HostBinding("style.--msg-bg-color")
  bgColor="transparent";
  @HostBinding("style.--msg-color")
  msgColor="black"
  sending=false;

  constructor(private forgotService:ForgotService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
  }

  send(){
    if (this.valid(this.email)) {
      this.sending=true;
      this.forgotService.forgot(this.email!,this.locale).subscribe({
        next:(value)=>{
          this.bgColor="lightgreen";
          this.message=$localize `Email Sent`;
          this.sending=false;
        },
        error:(err: HttpErrorResponse)=>{
          this.bgColor="red";
          this.message=$localize `Error sending mail`;
          this.sending=false;
        }
      })
    }else{
      this.bgColor="orangered";
      this.message=$localize `Put a valid email`
      this.sending=false;
    }
  }

  valid(email: string | undefined | null):boolean {
    if (this.email===undefined || this.email===null || this.email==="")  {
      return false;
    }
    const regexp:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email!);
  }

}

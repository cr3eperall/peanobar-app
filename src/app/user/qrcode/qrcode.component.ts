import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  qrcodeData="";
  width=Math.min(window.innerWidth,window.innerHeight*0.90);
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    let user;
    this.loginService.getUser().subscribe((value)=>{
      user=value;
      this.qrcodeData=user.uuid;
    });
  }

}

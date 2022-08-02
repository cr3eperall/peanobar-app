import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/bar/user.service';
import { UserDTO } from './../../services/UserDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { OrderStatus } from 'src/app/services/OrderDTO';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  enabled=true;
  currentDevice:MediaDeviceInfo|undefined=undefined;
  cameras:MediaDeviceInfo[]|undefined;
  scanSuccess=false;
  user:UserDTO|undefined;
  recharge:string|undefined|null="0";
  message="";
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onCamerasFound(devices:MediaDeviceInfo[]){
    this.cameras=devices;
  }

  onChange(e:Event){
    const ev=e.target as HTMLInputElement;
    for (const camera of this.cameras!) {
      if (camera.deviceId==ev.value) {
        this.currentDevice=camera;
      }
    }
  }

  check():boolean{
    if (this.recharge!=null) {
      const cost:number=Math.floor(Number.parseFloat(this.recharge)*100)
      if (cost<1) {
        this.message="The cost must be greater then 0.01€";
        return false;
      }else{
        this.message="";
        return true;
      }
    }
    return false;
  }

  onError(err:Error){ 
  }

  scanned(result:string){
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if(!result.match(regexExp)){
      return;
    }
    if (!this.scanSuccess) {
      this.getUser(result);
      this.scanSuccess=true;
    }
  }

  getUser(result:string){
    this.userService.getUserUncached(result).subscribe({
      next:(value)=>{
        this.user=value;
        console.log((value.balance/100).toFixed(2));
      },error:(err:HttpErrorResponse)=>{
        this.scanSuccess=false;
      }
    });
  }

  started(){
  }

  confirm(){
    if (this.check()&&this.user) {
      this.userService.getUserUncached(this.user.uuid).subscribe({
        next:(value)=>{
          console.log("before: "+value.balance);
          const newBal=value.balance+Math.floor(Number.parseFloat(this.recharge!)*100);
          this.userService.updateBalance(value.uuid,newBal).subscribe((nvalue)=>{
            console.log("after: "+nvalue);
            this.scanSuccess=false;
            this.user=undefined;
            this.recharge="0";
          });
        },error:(err:HttpErrorResponse)=>{
          this.scanSuccess=false;
        }
      });
      
    }
  }

}

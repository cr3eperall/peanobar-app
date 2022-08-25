import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/bar/user.service';
import { UserDTO } from './../../services/UserDTO';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
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
  searchQ?:string;
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
        this.message=$localize `The cost must be greater then 0.01€`;
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
      this.enabled=false;
    }
  }

  search(){
    if (this.searchQ!==undefined && this.searchQ!=="") {
      this.userService.getUserByUsername(this.searchQ!).subscribe({
        next:(value)=>{
          this.user=value;
          this.scanSuccess=true;
          this.message="";
          this.searchQ=""
        },error:()=>{
          this.message=$localize `User not found`
        }
      })
    }else{
      if (this.user!==undefined) {
        this.scanSuccess=false;
        this.enabled=true;
        this.user=undefined;
        this.recharge="0";
        this.upd();
      }
    }
  }

  getUser(result:string){
    this.userService.getUserUncached(result).subscribe({
      next:(value)=>{
        this.user=value;
      },error:(err:HttpErrorResponse)=>{
        this.scanSuccess=false;
      }
    });
  }

  started(){
  }

  upd(){
    const dev=this.currentDevice;
    for (const camera of this.cameras!) {
      if (camera.deviceId!==this.currentDevice?.deviceId) {
        this.currentDevice=camera;
        setTimeout(() => { this.currentDevice=dev; }, 700);
        return;
      }
    }
  }

  confirm(){
    if (this.check()&&this.user) {
      this.userService.getUserUncached(this.user.uuid).subscribe({
        next:(value)=>{
          const newBal=value.balance+Math.floor(Number.parseFloat(this.recharge!)*100);
          this.userService.updateBalance(value.uuid,newBal).subscribe((nvalue)=>{
            this.scanSuccess=false;
            this.enabled=true;
            this.user=undefined;
            this.recharge="0";
            this.upd();
          });
        },error:(err:HttpErrorResponse)=>{
          this.scanSuccess=false;
        }
      });
      
    }
  }

}

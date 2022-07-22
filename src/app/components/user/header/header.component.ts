import { UserDTO } from './../../../services/UserDTO';
import { LoginService } from './../../../services/login.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding("style.--header-color")
  headerColor="rgb(111, 165, 239)";
  user?:UserDTO;
  constructor(public router:Router, private loginService:LoginService) {
    this.router.events.subscribe((value)=>{
      if (value instanceof NavigationEnd) {
        this.loginService.getUser().subscribe({
          next:(value)=>{
            this.user=value;
          },
          error:(err)=>{
            this.user=undefined;
          }
        });
      }
    })
   }

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

}

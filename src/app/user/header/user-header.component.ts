import { UserDTO } from '../../services/UserDTO';
import { LoginService } from '../../services/login.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  user?:UserDTO;
  constructor(public router:Router, private loginService:LoginService) {
    this.user=loginService.cachedUser;
  }

  ngOnInit(): void {
    this.router.events.subscribe((value)=>{
      if (value instanceof NavigationEnd) {
        this.user=this.loginService.cachedUser;
      }
    })
  }

}

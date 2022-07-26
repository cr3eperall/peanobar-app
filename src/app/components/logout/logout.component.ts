import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginService.logout().subscribe({next:()=>{
      timer(500).subscribe(()=>{
        this.router.navigate(["login"]);
      });
    },error:()=>{
      timer(500).subscribe(()=>{
        this.router.navigate(["login"]);
      });
    }});
  }

}

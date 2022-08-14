import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-header',
  templateUrl: './bar-header.component.html',
  styleUrls: ['./bar-header.component.css']
})
export class BarHeaderComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

}

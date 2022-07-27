import { HttpClient } from '@angular/common/http';
import { OrderDTO } from './../OrderDTO';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { LoginService } from './../login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl=environment.apiUrl;
  constructor(private loginService:LoginService, private http:HttpClient) { }

  toProcess():Observable<OrderDTO[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<OrderDTO[]>(this.apiUrl+"/order/toprocess",{headers});
  }
}
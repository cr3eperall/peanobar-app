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

  complete(order:OrderDTO):Observable<OrderDTO>{
    const headers=this.loginService.getHeaders();
    const form=new FormData();
    form.append("id",order.id.toString());
    return this.http.post<OrderDTO>(this.apiUrl+"/order/complete",form,{headers});
  }

  countCompleted():Observable<number>{
    const headers=this.loginService.getHeaders();
    return this.http.get<number>(this.apiUrl+"/order/count",{headers});
  }

  getAll(page:number,size:number):Observable<OrderDTO[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<OrderDTO[]>(this.apiUrl+"/order/all?page="+page+"&size="+size,{headers});
  }
  
}

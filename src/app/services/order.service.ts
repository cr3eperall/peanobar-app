import { OrderDTO } from './OrderDTO';
import { Observable } from 'rxjs';
import { ProductDTO } from './ProductDTO';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl="http://192.168.178.111:8080/peanobar/api"
  constructor(private http:HttpClient, private loginService:LoginService) { }

  addToCart(product:ProductDTO,quantity:number):Observable<OrderDTO>{
    const headers=this.loginService.getHeaders();
    headers.append("enctype", "multipart/form-data");
    const formData = new FormData();
    formData.append("product",product.id.toString());
    formData.append("q",quantity.toString());
    return this.http.post<OrderDTO>(this.apiUrl+"/order/cart",formData,{headers});
  }

  sendOrder():Observable<OrderDTO>{
    const headers=this.loginService.getHeaders();
    return this.http.post<OrderDTO>(this.apiUrl+"/order/send", "", {headers});
  }

  getOrders(page:number,size:number):Observable<OrderDTO[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<OrderDTO[]>(this.apiUrl+"/order/ownorders?page="+page+"&size="+size,{headers});
  }

  countOrders():Observable<number>{
    const headers=this.loginService.getHeaders();
    return this.http.get<number>(this.apiUrl+"/order/countown",{headers});
  }
}

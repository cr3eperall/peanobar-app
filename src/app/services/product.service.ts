import { LoginService } from './login.service';
import { ProductDTO } from './ProductDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl="http://192.168.178.111:8080/peanobar/api"
  constructor(private http:HttpClient, private loginService:LoginService) { }

  public getAllProducts(): Observable<ProductDTO[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<ProductDTO[]>(this.apiUrl+"/product/all",{headers});
  }
}

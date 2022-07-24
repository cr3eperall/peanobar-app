import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { ProductDTO } from './ProductDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient, private loginService:LoginService) { }

  public getAllProducts(): Observable<ProductDTO[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<ProductDTO[]>(environment.apiUrl+"/product/all",{headers});
  }
}

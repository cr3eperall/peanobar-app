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

  public addProduct(product:ProductDTO):Observable<ProductDTO>{
    const data=new FormData();
    data.append("name",product.name.toString());
    data.append("cost",product.cost.toString());
    data.append("img",product.img.toString());
    data.append("type",product.type.toString());
    const headers=this.loginService.getHeaders();
    return this.http.post<ProductDTO>(environment.apiUrl+"/product",data,{headers})
  }

  public updateProduct(product:ProductDTO):Observable<ProductDTO>{
    const data=new FormData();
    data.append("id",product.id.toString());
    data.append("name",product.name.toString());
    data.append("cost",product.cost.toString());
    data.append("img",product.img.toString());
    data.append("type",product.type.toString());
    const headers=this.loginService.getHeaders();
    return this.http.patch<ProductDTO>(environment.apiUrl+"/product",data,{headers})
  }
}

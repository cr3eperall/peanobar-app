import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  apiUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  forgot(email:string, lang:string):Observable<{}>{
    return this.http.get(this.apiUrl+"/auth/forgot?email="+email+"&lang="+lang);
  }

  newPassword(username:string, token:string,newPassword:string):Observable<string>{
    let data:FormData=new FormData();
    data.append("username",username);
    data.append("token",token);
    data.append("password",newPassword);
    return this.http.post(this.apiUrl+"/auth/newpw",data, {responseType: 'text'});
  }
}

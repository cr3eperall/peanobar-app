import { Observable, shareReplay  } from 'rxjs';
import { LoginService } from './../login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { UserDTO } from './../UserDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCache=new Map<string,Observable<UserDTO>>();
  apiUrl=environment.apiUrl;

  constructor(private http:HttpClient, private loginService:LoginService) { }

  getUser(uuid:string):Observable<UserDTO>{
    if(this.userCache.has(uuid)){
      return this.userCache.get(uuid)!;
    }else{
      const headers=this.loginService.getHeaders();
      const user=this.http.get<UserDTO>(this.apiUrl+"/user/byuuid?uuid="+uuid,{headers}).pipe(shareReplay(1));
      this.userCache.set(uuid,user);
      return user;
    }
  }

}

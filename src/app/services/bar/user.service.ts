import { Observable, shareReplay, map } from 'rxjs';
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

  getUserByUsername(name:string):Observable<UserDTO>{
    const headers=this.loginService.getHeaders();
    return this.http.get<UserDTO>(this.apiUrl+"/user/byusername?username="+name,{headers});
  }

  getAllClassrooms():Observable<string[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<string[]>(this.apiUrl+"/user/classrooms",{headers});
  }

  getClassroom(classroom:string):Observable<UserDTO[]>{
    const headers=this.loginService.getHeaders();
    return this.http.get<UserDTO[]>(this.apiUrl+"/user/classroom?classroom="+classroom,{headers});
  }

  getAll(page:number, size:number):Observable<UserDTO[]>{
    const headers=this.loginService.getHeaders();
    const data=new FormData();
    const user=this.http.get<UserDTO[]>(this.apiUrl+"/user/all?page="+page+"&size="+size,{headers}).pipe(
      map((value)=>{
        for (const user of value) {
          this.userCache.set(user.uuid,new Observable((subscriber)=>{
            subscriber.next(user);
          }))
        }
        return value;
      })
    );
    return user;
  }

  getUserUncached(uuid:string):Observable<UserDTO>{
      const headers=this.loginService.getHeaders();
      const user=this.http.get<UserDTO>(this.apiUrl+"/user/byuuid?uuid="+uuid,{headers}).pipe(shareReplay(1));
      this.userCache.set(uuid,user);
      return user;
  }

  updateBalance(uuid:string,balance:number){
    const data=new FormData();
    data.append("uuid",uuid);
    data.append("bal",balance.toString());
    const headers=this.loginService.getHeaders();
    return this.http.post<UserDTO>(this.apiUrl+"/user/balance",data,{headers});
  }

  updateUser(oldUser:UserDTO,updated:UserDTO):Observable<UserDTO>{
    if (oldUser.uuid!=updated.uuid) {
      throw new Error("UUIDs are different!");
    }
    const headers=this.loginService.getHeaders();
    const data=new FormData();
    data.append("uuid",oldUser.uuid);
    if (oldUser.fullName!=updated.fullName) {
      data.append("name",updated.fullName);
    }
    if (oldUser.classroom!=updated.classroom) {
      data.append("classroom",updated.classroom);
    }
    if (oldUser.email!=updated.email) {
      data.append("email",updated.email);
    }
    return this.http.patch<UserDTO>(this.apiUrl+"/user",data,{headers});
  }

  createUser(user:UserDTO,password:string){
    const headers=this.loginService.getHeaders();
    const data=new FormData();
    data.append("name",user.fullName);
    data.append("username",user.username);
    data.append("email",user.email);
    data.append("role_id",user.role.id.toString());
    data.append("classroom",user.classroom);
    data.append("password",password);
    return this.http.post<UserDTO>(this.apiUrl+"/user",data,{headers});
  }

  updateClassroom(oldC:string,newC:string){
    const headers=this.loginService.getHeaders();
    const data=new FormData();
    data.append("old",oldC);
    data.append("new",newC);
    return this.http.patch<UserDTO>(this.apiUrl+"/user/classroom",data,{headers});
  }

  searchUser(by:string,mode:"fullname"|"username"):Observable<UserDTO[]>{
    const headers=this.loginService.getHeaders();
    let query="";
    if (mode=="fullname") {
      query="?fullname="+by;
    }else if (mode=='username') {
      query="?username="+by;
    }
    return this.http.get<UserDTO[]>(this.apiUrl+"/user/search"+query,{headers});
  }

  countUsers():Observable<number>{
    const headers=this.loginService.getHeaders();
    return this.http.get<number>(this.apiUrl+"/user/count",{headers});
  }

  deleteUser(uuid:string):Observable<{}>{
    const headers=this.loginService.getHeaders();
    return this.http.delete(this.apiUrl+"/user?uuid="+uuid,{headers});
  }

  deleteClassroom(uuid:string):Observable<{}>{
    const headers=this.loginService.getHeaders();
    return this.http.delete(this.apiUrl+"/user/classroom?classroom="+uuid,{headers});
  }
  
}

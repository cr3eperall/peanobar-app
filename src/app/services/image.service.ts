import { LoginService } from './login.service';
import { HttpClient} from '@angular/common/http';
import { Observable, subscribeOn } from 'rxjs';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public cache=new Map<number, SafeUrl>();
  constructor(private http:HttpClient,private loginService: LoginService,private sanitizer:DomSanitizer) { }
  apiUrl="http://192.168.178.111:8080/peanobar/api";

  getImage(id:number):Observable<SafeUrl>{
    const obs=new Observable<SafeUrl>((subscriber)=>{
      const img=this.cache.get(id);
      if((img)!==undefined){
        subscriber.next(img);
      }else{
        this.http.get(this.apiUrl+"/img?id="+id,{headers:this.loginService.getHeaders(),responseType:"blob"}).subscribe({next:(value)=>{
          var reader = new FileReader();
          reader.readAsDataURL(value);
          reader.onloadend = () => {
            const url=this.sanitizer.bypassSecurityTrustUrl(reader.result as string)
            this.cache.set(id,url);
            subscriber.next(url);
          };
        },error:(err)=>{
          console.log(err);
          subscriber.next("about:blank");
        }});
      }
    });
    return obs;
  }
}

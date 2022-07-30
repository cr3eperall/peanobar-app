import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public cache=new Map<number, SafeUrl>();
  constructor(private http:HttpClient,private loginService: LoginService,private sanitizer:DomSanitizer) { }
  apiUrl=environment.apiUrl;

  getImage(id:number):Observable<SafeUrl>{
    const obs=new Observable<SafeUrl>((subscriber)=>{
      const img=this.cache.get(id);
      if((img)!==undefined){
        subscriber.next(img);
      }else{
        this.http.get(this.apiUrl+"/img?id="+id,{headers:this.loginService.getHeaders(),responseType:"blob"}).subscribe({next:(value)=>{
          const reader = new FileReader();
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

  isImage(file:File):Observable<boolean>{
    const obs=new Observable<boolean>((subscriber)=>{
      var fileReader = new FileReader();
      fileReader.onloadend = function(e) {
        var arr = (new Uint8Array(e.target!.result as ArrayBuffer)).subarray(0, 4);
        var header = "";
        for(var i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        let type:string;
        switch (header) {
          case "89504e47":
              type = "image/png";
              break;
          case "47494638":
              type = "image/gif";
              break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
              type = "image/jpeg";
              break;
          default:
              type = "not/image"; // Or you can use the blob.type as fallback
              break;
        }
        subscriber.next(type!="not/image")
      };
      fileReader.readAsArrayBuffer(file);
    });
    return obs;
  }

  uploadImage(file:File):Observable<{id:number, url:SafeUrl}>{
    const data=new FormData();
    if (file.size>16700000) {
      return new Observable((subscriber)=>{
        subscriber.error("File too large");
      })
    }
    const obs=new Observable<{id:number, url:SafeUrl}>((subscriber)=>{
      this.isImage(file).subscribe((isImage)=>{
        if (!isImage) {
          subscriber.error("File isn't an image");
        }
        data.append("img",file);
        const headers=this.loginService.getHeaders();
        this.http.post<{id:number, data:string}>(this.apiUrl+"/img",data,{headers}).subscribe({
          next:(value)=>{
            const url=this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+value.data);
            subscriber.next({id:value.id,url:url});
            this.cache.set(value.id,url)
          },complete:()=>{
            subscriber.complete();
          },error:(err)=>{
            subscriber.error(err);
          }
        });
      });
    })
    return obs;
  }

  getAllImages():Observable<{id:number, url:SafeUrl}[]>{
    return this.http.get<{id:number, data:string}[]>(this.apiUrl+"/img/all",{headers:this.loginService.getHeaders()}).pipe(
      map((value)=>{
        const res:({id:number, url:SafeUrl}|undefined)[]=Array.apply(null,Array(value.length)) as ({id:number, url:SafeUrl}|undefined)[];
        for (const img of value) {
            const url=this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+img.data);
            res[res.indexOf(undefined)]={id:img.id,url:url}
        }
        for (const img of res) {
          this.cache.set(img!.id,img!.url)
        }
        return res as {id:number, url:SafeUrl}[];
      })
    );
  }
}

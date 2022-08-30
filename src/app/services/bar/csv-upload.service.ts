import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/bar/user.service';
import { UserDTO } from '../UserDTO';
import { Observable, map, observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrderStatus } from '../OrderDTO';

@Injectable({
	providedIn: 'root',
})
export class CsvUploadService {
	constructor(private userService:UserService) {}
  
  private defaults=new Map<string,string|undefined|{ id: number; name: string; }>([["fullname",undefined],["username",undefined],["email",undefined],["classroom","0"],["role",{id: 1,name: "ROLE_USER"}],["password",undefined]]);
  
  readFile(file:File):Observable<string>{
    return new Observable<string>((subscriber)=>{
      const fileReader=new FileReader();
      fileReader.onload=(e)=>{
        subscriber.next(fileReader.result as string);
      }
      fileReader.readAsText(file);
    })
  }

	parseCSVintoUsers(csv: string): Observable<{user:UserDTO,password:string}[]> {
		return new Observable<{user:UserDTO,password:string}[]>((subscriber) => {
      let parsedCsv=csv.replace(new RegExp("\r", 'g'),"");
      let rowArray = parsedCsv.split('\n');
      let users:{user:UserDTO,password:string}[]=[];
      let usernamesArray:string[]=[];
      let emailsArray:string[]=[];
			let types = rowArray[0].split(',');
			let typeMap = new Map<string, number>();
			try {
        for (let i = 0; i < types.length; i++) {
          const type = types[i].toLowerCase();
          switch (type) {
            case 'fullname':
              if (typeMap.has('fullname')) {
                throw new Error(
                  'Unable to parse csv file: duplicate type'
                );
              }
              typeMap.set('fullname', i);
              break;
            case 'username':
              if (typeMap.has('username')) {
                throw new Error(
                  'Unable to parse csv file: duplicate type'
                );
              }
              typeMap.set('username', i);
              break;
            case 'email':
              if (typeMap.has('email')) {
                throw new Error(
                  'Unable to parse csv file: duplicate type'
                );
              }
              typeMap.set('email', i);
              break;
            case 'classroom':
              if (typeMap.has('classroom')) {
                throw new Error(
                  'Unable to parse csv file: duplicate type'
                );
              }
              typeMap.set('classroom', i);
              break;
            case 'role':
              if (typeMap.has('role')) {
                throw new Error(
                  'Unable to parse csv file: duplicate type'
                );
              }
              typeMap.set('role', i);
              break;
            case 'password':
              if (typeMap.has('password')) {
                throw new Error(
                  'Unable to parse csv file: duplicate type'
                );
              }
              typeMap.set('password', i);
              break;
  
            default:
              console.warn("Found unknown type in csv file: "+type);
              break;
          }
        }
        for (let i = 1; i < rowArray.length; i++) {
          if (rowArray[i]=="") {
            continue;
          }
          const values = rowArray[i].split(",");
          if (values.length!=types.length) {
            throw new Error("Error while parsing csv file: length of values doesn't match length of types")
          }
          if (usernamesArray.includes(this.mapGetOrDefault(typeMap,values,"username"))) {
            throw new Error("Error while parsing csv file: duplicate username")
          }
          if (usernamesArray.includes(this.mapGetOrDefault(typeMap,values,"email"))) {
            throw new Error("Error while parsing csv file: duplicate email")
          }
          const user:{user:UserDTO,password:string}={user:{
            fullName:this.mapGetOrDefault(typeMap,values,"fullname"),
            username:this.mapGetOrDefault(typeMap,values,"username"),
            email:this.mapGetOrDefault(typeMap,values,"email"),
            classroom:this.mapGetOrDefault(typeMap,values,"classroom"),
            uuid:"",
            balance:0,
            cartOrder:{id:0,madeAt:"",owner:"",contents:[],status:OrderStatus.IN_CART,total:0},
            role:this.mapGetRoleOrDefault(typeMap,values)
          },password:this.mapGetOrDefault(typeMap,values,"password")}
          users.push(user);
          usernamesArray.push(user.user.username);
          emailsArray.push(user.user.email);
        }
        subscriber.next(users);
      } catch (error:any) {
        subscriber.error(error);
      }
		});
	}

  private mapGetRoleOrDefault(map:Map<string, number>, row:string[]):{ id: number; name: string; }{
    if (map.has("role")) {
      const roleId=parseInt(row[map.get("role")!]);
      return {id:roleId,name:""}
    }else if (this.defaults.has("role")) {
      return this.defaults.get("role")! as { id: number; name: string; };
    }else{
      throw new Error("Error while parsing csv file: missing type: role");
    }
  }

  private mapGetOrDefault(map:Map<string, number>, row:string[], get:string):string{
    if (map.has(get.toLowerCase())) {
      return row[map.get(get.toLowerCase())!];
    }else if (this.defaults.has(get)) {
      const val=this.defaults.get(get.toLowerCase());
      if (val==undefined) {
        throw new Error("Error while parsing csv file: missing type: "+get);
      }
      return val as string;
    }else{
      throw new Error("Error while parsing csv file: missing type: "+get);
    }
  }

  public divideExistingUsers(users:{user:UserDTO,password:string}[]):Observable<{existing:{existingUser:UserDTO,user:UserDTO,password:string}[],toAdd:{user:UserDTO,password:string}[]}>{
    return new Observable<{existing:{existingUser:UserDTO,user:UserDTO,password:string}[],toAdd:{user:UserDTO,password:string}[]}>((subscriber)=>{
      let existing:{existingUser:UserDTO,user:UserDTO,password:string}[]=[];
      let toAdd:{user:UserDTO,password:string}[]=[];
      let returned=users.length;
      for (const user of users) {
        this.userService.getUserByUsername(user.user.username).subscribe({
          next(value){
            existing.push({existingUser:value,user:user.user,password:user.password});
            returned--;
            if (returned==0) {
              subscriber.next({existing:existing,toAdd:toAdd});
            }
          },error(err:HttpErrorResponse){
            if (err.status==404 && (err.error as string).startsWith("User with username")) {
              toAdd.push(user);
              returned--;
              if (returned==0) {
                subscriber.next({existing:existing,toAdd:toAdd});
              }
            }
          }
        })
      }
    });
  }
  /**
  * @returns an observable that gives percentages updates
  */
  public uploadUsers(users:{user:UserDTO,password:string}[],mode:"update"|"add"|"edit"):Observable<{progress:number,user:UserDTO, success:boolean, error?:HttpErrorResponse}>{
    return new Observable<{progress:number,user:UserDTO, success:boolean, error?:HttpErrorResponse}>((subscriber)=>{
      this.divideExistingUsers(users).subscribe((value)=>{
        let toDo=users.length;
        if(mode=='add'){
          toDo=value.toAdd.length;
        }else if (mode=='edit') {
          toDo=value.existing.length;
        }
        let update=(user:UserDTO,success:boolean,error?:HttpErrorResponse)=>{
          if (!success) {
            subscriber.next({progress:-1,user:user, success:success, error:error});
          }
          toDo--;
          if (toDo==0) {
            console.log("done");
          }

          if (mode=='update') {
            subscriber.next({progress:100-(toDo/users.length)*100,user:user, success:success, error:error})
          }else if(mode=='add'){
            subscriber.next({progress:100-(toDo/value.toAdd.length)*100,user:user, success:success, error:error})
          }else if (mode=='edit') {
            subscriber.next({progress:100-(toDo/value.existing.length)*100,user:user, success:success, error:error})
          }
        }
        if (mode=='update') {
          this.addUsers(value.toAdd,update);
          this.editUsers(value.existing,update);
        }else if(mode=='add'){
          this.addUsers(value.toAdd,update);
        }else if (mode=='edit') {
          this.editUsers(value.existing,update);
        }
      });
    });
  }

  addUsers(users:{user:UserDTO,password:string}[],update:(user:UserDTO, success:boolean, error?:HttpErrorResponse)=>void){
    for (const user of users) {
      this.userService.createUser(user.user,user.password).subscribe({
        next(value) {
            update(value,true);
        },error(err:HttpErrorResponse) {
            update(user.user,false,err);
        }
      })
    }
  }

  editUsers(existing:{existingUser:UserDTO,user:UserDTO,password:string}[],update:(user:UserDTO, success:boolean, error?:HttpErrorResponse)=>void){
    for (const user of existing) {
      let newUser=user.user;
      newUser.uuid=user.existingUser.uuid;
      this.userService.updateUser(user.existingUser,newUser).subscribe({
        next(value) {
          update(value,true);
        },error(err:HttpErrorResponse) {
          update(user.user,false,err);
        }
      })
    }
  }

}

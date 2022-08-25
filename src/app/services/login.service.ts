import { environment } from './../../environments/environment';
import { OrderDTO, OrderStatus } from './OrderDTO';
import { UserDTO } from './UserDTO';
import { LoginDTO } from './LoginDTO';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpResponse,
	HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable, subscribeOn } from 'rxjs';
import {
  ActivatedRoute,
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class LoginService implements CanActivate {
	apiUrl = environment.apiUrl;
	constructor(private http: HttpClient, private router:Router,private thisroute:ActivatedRoute) {}
	public cachedUser?:UserDTO;

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| UrlTree
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree> {
		const obs = new Observable<boolean | UrlTree>((subscriber) => {
      this.getUser().subscribe((value) => {
				switch (value.role.id) {
					case 1:
            //USER
            if (state.url.startsWith("/bar")||state.url.startsWith("/admin")) {
              this.router.navigate([""],{relativeTo:this.thisroute.root})
              subscriber.next(false);
            }
            subscriber.next(true);
						break;
					case 2:
            //BAR
            if (!state.url.startsWith("/bar")) {
              this.router.navigate([""],{relativeTo:this.thisroute.root})
              subscriber.next(false);
            }
            subscriber.next(true);
						break;
					case 3:
            //ADMIN
            subscriber.next(true);
						break;
					default:
            subscriber.next(false);
						break;
				}
			},(err)=>{
        this.router.navigate([""],{relativeTo:this.thisroute.root})
        subscriber.next(false);
      });
		});
		return obs;
	}

	public loginStatus(): Observable<number> {
		const uuid = localStorage.getItem('uuid');
		const key = localStorage.getItem('API-KEY');
		const headers = new HttpHeaders({ 'x-api-key': uuid + ' ' + key });
		let obs = new Observable<number>((subscriber) => {
			if (uuid !== null && uuid !== undefined && key !== null && key !== undefined) {
				const result = this.http.get<UserDTO>(
					this.apiUrl + '/user/own',
					{ headers }
				);
				result.subscribe({
					next: (value: UserDTO) => {
						if (value.uuid == uuid) {
							subscriber.next(2);
						} else {
							subscriber.next(3);
						}
					},
					error: (error: any) => {
						subscriber.next(3);
					},
				});
			} else {
				subscriber.next(4);
			}
		});
		return obs;
	}

	public getUser(): Observable<UserDTO> {
		const headers = this.getHeaders();
		const obs = new Observable<UserDTO>((subscriber) => {
			this.http
				.get<UserDTO>(this.apiUrl + '/user/own', { headers })
				.subscribe((value) => {
					if (value.cartOrder == null) {
						value.cartOrder = {
							id: -1,
							total: 0,
							owner: value.uuid,
							madeAt: '2000-00-00T00:00:00.0000000',
							status: OrderStatus.IN_CART,
							contents: [],
						};
					}
					this.cachedUser=value;
					subscriber.next(value);
				},err=>subscriber.error(err));
		});
		return obs;
	}

	public login(
		username: string,
		password: string,
		then?: (response: number) => void
	) {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
		let result = this.http
			.post<LoginDTO>(this.apiUrl + '/auth/login', formData, {
				headers,
				observe: 'response',
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					if (then != undefined) {
						then(err.status);
					}
					return throwError(() => err);
				})
			);
		result.subscribe(
			(value: HttpResponse<LoginDTO>) => {
				if (value.body != null && value.ok) {
					localStorage.setItem('API-KEY', value.body.apikey);
					localStorage.setItem('uuid', value.body.uuid);
				}
				if (then != undefined) {
					then(value.status);
				}
			},
			(error: HttpErrorResponse) => {
				if (then != undefined) {
					then(error.status);
				}
			}
		);
		return 0;
	}

	logout(): Observable<UserDTO> {
		const headers = this.getHeaders();
		localStorage.removeItem('uuid');
		localStorage.removeItem('API-KEY');
		return this.http.get<UserDTO>(this.apiUrl + '/auth/logout', {
			headers,
		});
	}

	public getHeaders(): HttpHeaders {
		const uuid = localStorage.getItem('uuid');
		const key = localStorage.getItem('API-KEY');
		return new HttpHeaders({ 'x-api-key': uuid + ' ' + key});
	}

	changePassword(oldPw: string, newPw: string): Observable<string> {
		const headers = this.getHeaders();
		const body = new FormData();
		body.append('old', oldPw);
		body.append('new', newPw);
		return this.http.post(this.apiUrl + '/user/changepassword', body, {
			headers: headers,
			responseType: 'text',
		});
	}
}
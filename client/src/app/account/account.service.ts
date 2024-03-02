import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly baseUrl = 'http://localhost:5233/api/Account/';
  private userSource = new BehaviorSubject<User | null>(null);
  userSource$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadUser(token:string){
   let headers=new HttpHeaders();
   headers=headers.set('Authorization', `Bearer ${token}`);
   return this.http.get<User>(`${this.baseUrl}`, {headers}).pipe(
   map((user: User) => {
    if (user?.token) {
      localStorage.setItem('token', user.token);
      this.userSource.next(user);
    }
    return user;
  }),
  catchError((error)=>{
    console.error('Error loading user:',error);
    if(error instanceof HttpErrorResponse){
      if(error.status===404){
        console.log('not found ',error)
      }
    }
    return throwError(()=>error);
  })
)
  }

  login(loginModel: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}login`, loginModel).pipe(
      map((response) => {
           const user:User={
             displayName: response.displayName,
             email: response.email,
             token:response.token
           };


          localStorage.setItem('token', response.token);
          this.userSource.next(user);

        return user;
      })
    )
  }

  register(registerModel: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}register`, registerModel).pipe(
      map((user: User) => {
        if (user?.token) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
        return user;
      })
    )
  }

  checkEmailExists(email: string): Observable<boolean> {
   return this.http.get<boolean>(`${this.baseUrl}checkemail?email=${email}`)
  }

  logoutUser(): void {
    // Clear token from localStorage
    localStorage.removeItem('token');

    // Notify subscribers about logout
    this.userSource.next(null);

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}

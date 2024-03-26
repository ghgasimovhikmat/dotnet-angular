import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
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
   return this.http.get<User>(`${this.baseUrl}loaduser`, {headers}).pipe(
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

register(registerModel: any): Observable<any> {
  return this.http.post(`${this.baseUrl}register`, registerModel, {observe: 'response'})
    .pipe(
      map(response => response.body),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Registration failed due to an unexpected error.';

        if (error.status === 400 && error.error) {
          // Assuming errors are returned in an array
          try {
            const errors = error.error.errors || error.error; // Adjust based on your actual error structure
            if (Array.isArray(errors)) {
              errorMessage = errors.map(err => err.description).join(' ');
            } else {
              // Handle non-array error structure
              errorMessage = errors.title || JSON.stringify(errors);
            }
          } catch {
            // Fallback for when error parsing fails
            errorMessage = JSON.stringify(error.error);
          }
        }

        return throwError(errorMessage);
      })
    );
}

checkEmail(email: string): Observable<boolean> {
  const encodedEmail = encodeURIComponent(email);
  return this.http.get(`${this.baseUrl}checkemail?email=${encodedEmail}`, {observe: 'response'})
    .pipe(
      map(response => response.status === 200),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(false); // Email does not exist, which means it's available for registration
        }
        return throwError('An unexpected error occurred while checking the email.');
      })
    );
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



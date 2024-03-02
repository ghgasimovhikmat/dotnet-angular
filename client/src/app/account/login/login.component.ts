import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { LoadingService } from '../../core/services/loading.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm!:FormGroup;
//submitted=false;
constructor(
  private formBuilder:FormBuilder,
  private accountService:AccountService,
  private loadingService: LoadingService,
  private router:Router)
{}

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });
}

onSubmit(): void {
 // this.submitted = true;
   if(this.loginForm.valid){


    this.loadingService.loading();
    this.accountService.login(this.loginForm.value).subscribe(
    (user)=>{
      this.loadingService.idle();
      this.router.navigate(['/store']);
    },
    error=>{
      this.loadingService.loading();
    }
   )

   }

}
}

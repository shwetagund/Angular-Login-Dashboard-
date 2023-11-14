import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private router: Router, public authService: AuthService, public formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login(): void {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((resp: any) => {
        localStorage.setItem('token', resp.token)
         this.router.navigate(['/dashboard']);
      }, (err: HttpErrorResponse) => {
        console.error(err)
      })
    }
   }
}

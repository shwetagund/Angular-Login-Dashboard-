import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
   beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();
  });
  
 it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
   it('should render a login button', () => {
    fixture.detectChanges();
    const loginButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(loginButton).toBeTruthy();
    expect(loginButton.textContent).toContain('Login');
  });
 it('should have email and password input fields in the form', () => {
    fixture.detectChanges();
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="email"]');
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="password"]');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

   it('should initialize loginForm', () => {
    component.ngOnInit();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should call authService.login and navigate to dashboard on successful login', () => {
    const loginFormValue = { email: 'test@example.com', password: 'password123' };
    authService.login.and.returnValue(of({ token: 'fakeToken' }));
    component.loginForm.setValue(loginFormValue);
    component.login();
    expect(authService.login).toHaveBeenCalledWith(loginFormValue);
    expect(localStorage.getItem('token')).toBe('fakeToken');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle error on login failure', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();
    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

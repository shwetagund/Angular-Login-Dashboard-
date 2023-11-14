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

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

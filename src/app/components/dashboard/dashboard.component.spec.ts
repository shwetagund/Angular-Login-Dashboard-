import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { ApiService } from '../../shared/api.service';
import { DashboardModel } from './dashboard.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getEmploye', 'postEmploye', 'deleteEmploye']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should create the app', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should fetch employee list on ngOnInit', () => {
    const mockEmployeeList: DashboardModel[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', mobile: '1234567890' },
    ];
    apiServiceSpy.getEmploye.and.returnValue(of(mockEmployeeList));
    component.ngOnInit();
    expect(apiServiceSpy.getEmploye).toHaveBeenCalled();
    // expect(component.employees).toEqual(mockEmployeeList);
  });

  it('should add employee and refresh list on postEmplyDetails', fakeAsync(() => {
    const mockEmployee: DashboardModel = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      mobile: '9876543210',
    };
    apiServiceSpy.postEmploye.and.returnValue(of(mockEmployee));

    component.formValue.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      mobile: '9876543210',
    });
    component.postEmplyDetails();
    tick();
    expect(apiServiceSpy.postEmploye).toHaveBeenCalledWith(mockEmployee);
    expect(component.getEmployeeList).toHaveBeenCalled();
  }));

  it('should delete employee and refresh list on deleteEmployee', () => {
    const employeeId = 3;
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    apiServiceSpy.deleteEmploye.and.returnValue(of({}));

    component.deleteEmployee(employeeId);

    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this employee?');
    expect(apiServiceSpy.deleteEmploye).toHaveBeenCalledWith(employeeId);
    expect(component.getEmployeeList).toHaveBeenCalled();
  });
});

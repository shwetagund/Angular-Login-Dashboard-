// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { DashboardModel } from './dashboard.model';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../shared/api.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  employees = [];
  employeModelObj: DashboardModel = new DashboardModel();

  constructor(private formBuilder: FormBuilder, public apiService: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
    });

    this.getEmployeeList();
  }

  getEmployeeList(): void {
    this.apiService.getEmploye().subscribe(
      (res: any) => {
        this.employees = res;
      },
      (err: any) => {
        console.error('Error fetching employee list:', err);
      }
    );
  }

  postEmplyDetails(): void {
    this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;

    this.apiService.postEmploye(this.employeModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert('Employee added successfully');
        this.getEmployeeList(); // Refresh the employee list after adding a new employee
      },
      (err: any) => {
        alert('Something went wrong');
      }
    );
  }

  // editEmployee(employee: DashboardModel): void {
  //   this.selectedEmployee = employee;
  //   this.editMode = true;
  //   this.formValue.patchValue({
  //     firstName: employee.firstName,
  //     lastName: employee.lastName,
  //     email: employee.email,
  //     mobile: employee.mobile
  //   });
  //    if (this.modal) {
  //     this.modalService.open(this.modal, { centered: true });
  //   }
  // }

  deleteEmployee(employeeId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');

    if (confirmDelete) {
      this.apiService.deleteEmploye(employeeId).subscribe(
        (res: any) => {
          console.log(res);
          alert('Employee deleted successfully');
          this.getEmployeeList(); // Refresh the employee list after deleting an employee
        },
        (err: any) => {
          alert('Something went wrong');
        }
      );
    }
  }
}

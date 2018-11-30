import { Employee } from './../models/employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/shared/employee.service';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
// to bind to html page
  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }
// method creates a new employee object
  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }
// saves the employee object received from html
  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
  }
//activate the save() method
  onSubmit() {
    this.submitted = true;
    this.save();
  }

}

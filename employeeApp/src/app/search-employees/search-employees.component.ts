import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from 'src/shared/employee.service';

@Component({
  selector: 'search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {

  role: string;
  employees: Employee[];

  constructor(private employeeservice: EmployeeService) { }

  ngOnInit() {
    this.role = '';
  }
// search employees by role and get the list of employees by role
  private searchRoles() {
    this.employeeservice.getEmployeesbyRole(this.role)
      .subscribe(emp => this.employees = emp);
  }

  onSubmit() {
    this.searchRoles();
  }

}

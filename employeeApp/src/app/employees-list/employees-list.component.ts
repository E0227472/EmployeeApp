import { Employee } from './../models/employee';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/shared/employee.service';

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
// data is stored here from the service component. observable means data only stored when component loaded
  employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    // when component is loaded, the data is retrieved from the service component
    this.reloadData();
  }

  // getting all the employee data from the service
  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

}

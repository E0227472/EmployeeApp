import { Employee } from './../models/employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from 'src/shared/employee.service';
import { EmployeesListComponent } from '../employees-list/employees-list.component';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
// Inputs data from EmployeesListComponent. EmployeesListComponent is a parent component and employee-details is child component
  @Input() employee: Employee;

  constructor(private employeeService: EmployeeService, private listComponent: EmployeesListComponent) { }

  ngOnInit() {
  }

  // update the changes made in the form. Subscribe retrieves customer object based on id
  updateActive(isActive: boolean) {
    this.employeeService.updateEmployee(this.employee.id,
      { name: this.employee.name, role: this.employee.role, salary: this.employee.salary, active: isActive })
      .subscribe(
        data => {
          console.log(data);
          this.employee = data as Employee;
        },
        error => console.log(error));
  }
// delete Employee from the form. subscribe gets data from the backend
  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }

}

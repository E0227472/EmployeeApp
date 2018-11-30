
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8123/employees';
  private baseUrl2 = 'http://localhost:8123';

  constructor(private http: HttpClient) { }
// get employee by id
  getEmployee(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
// create new employee object and pass to url
  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  // update Employee object
  updateEmployee(id: number, employee: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }
// delete Employee Object
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
// get all employees
  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
// get employees by role
  getEmployeesbyRole(role: string): Observable<any> {
    return this.http.get(`${this.baseUrl2}/employeesRole/${role}`);
  }

  // get employees by salary range
  getEmployeesbySalary(salary: string): Observable<any> {
    return this.http.get(`${this.baseUrl2}/employeesrange/${salary}`);
  }

}

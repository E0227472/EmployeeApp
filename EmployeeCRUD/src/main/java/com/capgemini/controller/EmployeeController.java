package com.capgemini.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.beans.Employee;
import com.capgemini.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EmployeeController {

	@Autowired
	EmployeeRepository employeerepository;

	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeerepository.findAll();
	}

	// Get a single employee based on the id
	@GetMapping("/employees/{id}")
	public Employee getEmployeeById(@PathVariable(value = "id") int id) {
		Optional<Employee> emp = employeerepository.findById(id);

		return emp.get();
	}

	// Create a new employee
	@PostMapping("/employees")
	public Employee createNote(@Valid @RequestBody Employee employee) {
		return employeerepository.save(employee);
	}

	// update a single employee record based on id
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateNote(@PathVariable(value = "id") int id, @RequestBody Employee employee) {
		// get the employee based on the id passed in as parameters and then modify the
		// data
		Optional<Employee> emp = employeerepository.findById(id);
		// updating the employee object
		if (emp.isPresent()) {
			Employee _employee = emp.get();
			_employee.setName(employee.getName());
			_employee.setRole(employee.getRole());
			_employee.setSalary(employee.getSalary());
			_employee.setActive(employee.isActive());
			return new ResponseEntity<>(employeerepository.save(_employee), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Delete a Employee
	@DeleteMapping("/employees/{id}")
	public void deleteNote(@PathVariable(value = "id") int id) {
		Optional<Employee> emp = employeerepository.findById(id);
		Employee employee = emp.get();

		employeerepository.delete(employee);
	}

	// Get all the employees based on role
	@GetMapping("/employeesRole/{role}")
	public List<Employee> getEmployeeById(@PathVariable(value = "role") String role) {
		List<Employee> employee = employeerepository.findAll();
		List<Employee> employeesSelectedRole = new ArrayList<Employee>();
		for (Employee emp : employee) {
			if (emp.getRole().equals(role))
				employeesSelectedRole.add(emp);
		}

		return employeesSelectedRole;
	}

	// Get employees by salary range
	@GetMapping("/employeesrange/{salary}")
	public List<Employee> getAllEmployees(@PathVariable(value = "salary") double salary) {
		List<Employee> employee = employeerepository.findAll();
		List<Employee> employeesSelectedRole = new ArrayList<Employee>();
		for (Employee emp : employee) {
			if (emp.getSalary() >= salary) {
				employeesSelectedRole.add(emp);
			}
		}
		return employeesSelectedRole;

	}

}

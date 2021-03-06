import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Employee{
  empId: number;
  name: string;
  surname: string;
  occupation: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url = "http://localhost:3000/employees";
  
  constructor(private http: HttpClient) { }

  getAllData(){
    return this.http.get<[Employee]>(this.url);
  }

  getData(id: number){
    return this.http.get<Employee>(this.url + '/' + id);
  }

  postData(employee: Employee){
    return this.http.post(this.url, employee);
  }

  update(employee: Employee, id: number){
    return this.http.put(this.url + '/' + id, employee);

  }

  deleteData(id: number){
    return this.http.delete(this.url + '/' + id);
  }
}

import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import {Observable,of, from } from 'rxjs';

import { map } from 'rxjs/operators';
import {Student} from './studentmodel';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  Student={
    name: '',
    phonenumber: '',
    dateofbirth:'',
gender:'',
    address:[''],
    marks:['']
   
  };
   baseURL = 'http://localhost:8553/students';
   constructor(private http: HttpClient) { }

    postEmployee(emp?: Student) {
    console.log("received");
    console.log(emp);
    return this.http.post(this.baseURL, emp);
  }


   getstudentList():Observable<Student[]> {

    return this.http.get<Student[]>(this.baseURL);
  }




}
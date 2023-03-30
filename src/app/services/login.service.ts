import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { logindata } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient, private router:Router) { }

  logindata(datas:logindata){
    console.warn(datas)
   return this.http.post(`http://localhost:4000/api/login_in`,datas )
  }
}

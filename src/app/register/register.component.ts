
import { Component, EventEmitter } from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { friendiddata, registerdata } from '../datatype';
import { RegisterService } from '../services/register.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent  {
  _id:any
  conformfriend:any
  addfriend:any
  conformaddfriendids:any=[]


  isLoginError = new EventEmitter<boolean>(false)
  isSellerLogIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient,private router:Router,private register:RegisterService){
  }


  getUserFormData(data:registerdata){
      this.register.registerdata(data).subscribe((res:any)=>{
      this._id=res.data
      this.addfriend=res.data
      this.conformfriend=res.data
      this.conformaddfriendids.push( this.addfriend)
      this.conformaddfriendids.push( this.conformfriend)

    if(res){
      this.isSellerLogIn.next(true);
      localStorage.setItem("register", JSON.stringify(data))
      this.router.navigate(['login'])
      this.register.registeraddconform(this._id, this.conformaddfriendids).subscribe((res:any)=>{
      console.warn(res)
      })
    }
    })



  }


    }




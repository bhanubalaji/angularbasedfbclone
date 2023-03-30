
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { logindata } from '../datatype';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginerrmessage:string=""
isLoginError = new EventEmitter<boolean>(false)
isSellerLogIn = new BehaviorSubject<boolean>(false)
logindatastore:any
logindata:any
addfriendid:any
constructor(private http: HttpClient,private router:Router,private login:LoginService){
}

  onSubmit(datas:logindata){
      this.login.logindata(datas).subscribe((res:any)=>{
        console.warn(res)
        if(res){
      console.warn("logged in")
      localStorage.setItem("login", JSON.stringify(res))
      this.router.navigate(['entry'])
      this.logindatastore = localStorage.getItem("login")
      this.logindata =JSON.parse(this.logindatastore)
      this.addfriendid = this.logindata.userdata._id
      if(this.logindata.userdata._id){
        this.router.navigate(['entry'])
      }
      else{
        console.warn("fail to login")
        this.isLoginError.emit(true)
       }
     }




      });
     if(this.isLoginError){
      this.loginerrmessage="log in data is invalid"
     }
  }


}

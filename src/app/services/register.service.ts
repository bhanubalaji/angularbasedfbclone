import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { friendiddata, registerdata } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http:HttpClient, private router:Router) { }
  registerdata(data:registerdata){

    return this.http.post('http://localhost:4000/api/register',data)

  }



  registeraddconform(_id:any,conformaddfriendids:any ){
     console.log(_id)
    // console.log(conformfriend)s
     console.log(conformaddfriendids)
    return this.http.put<any>(`http://localhost:4000/api/registeraddconform/`+_id,{conformaddfriendids})
  }


}

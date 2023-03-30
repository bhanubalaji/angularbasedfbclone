import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { canceliddata, friendiddata, registerdata } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http:HttpClient) { }

  friendsdata(_id:any){
    console.warn("okk")
   return this.http.post(`http://localhost:4000/api/friendsdata`,{_id})

  }

  canceldata(id:canceliddata){
    console.warn(id)
    return this.http.post('http://localhost:4000/api/friendsdatacancel',id)

  }

  addfriend(_id:friendiddata,addfriendid:any){
    console.warn(_id)
    console.warn(addfriendid)
    console.warn( typeof addfriendid)
    return this.http.put<any>(`http://localhost:4000/api/addfriend/`+_id,{addfriendid})
  }

  alladdfriendsidmy(addfriendid:any){
    return this.http.post('http://localhost:4000/api/alladdfriendsidmy',{addfriendid})
  }

  conformfriend(_id:friendiddata,addfriendid:any){
    return this.http.put<any>(`http://localhost:4000/api/conformfriend/`+_id,{addfriendid})
  }

  allconformfriendsidmy(addfriendid:any){
    return this.http.post('http://localhost:4000/api/allconformfriendsidmy',{addfriendid})

  }

  myalladdfriendsidmy(addfriendid:any){
    return this.http.post('http://localhost:4000/api/myalladdfriendsidmy',{addfriendid})

  }

  myallconformfriendsidmy(addfriendid:any){
    return this.http.post('http://localhost:4000/api/myallconformfriendsidmy',{addfriendid})

  }


}

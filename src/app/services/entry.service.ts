import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }
  friendsdata(_id:any ){
    console.warn("okk")
   return this.http.post<any>(`http://localhost:4000/api/mydata`,{_id})

  }

  friendsdataofimage(_id:any ){
    console.warn("okklll")
   return this.http.post<any>(`http://localhost:4000/api/mydataotherimage`,{_id})

  }
  likedata(_id:any){
    console.log(_id)
    return this.http.post('http://localhost:4000/api/alladdfriendsidmy',{_id})

  }
  sharedata(_id:any){
    console.log(_id)
    return this.http.post('http://localhost:4000/api/alladdfriendsidmy',{_id})

  }
  commentdata(_id:any){
    console.log(_id)
    return this.http.post('http://localhost:4000/api/alladdfriendsidmy',{_id})

  }



  mydataselfphoto(_id:any){
    console.log("bhanu")
    return this.http.post<any>(`http://localhost:4000/api/mydataselfimage`,{_id})

   }

  selfoterimg(_id:any ){
    console.warn("okk")
   return this.http.post<any>(`http://localhost:4000/api/myotherselfimg`,{_id})

  }

}

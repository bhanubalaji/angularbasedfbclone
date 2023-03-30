import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelfdetailsService {

  constructor(private http:HttpClient) { }

  mydata(_id:any){
    console.log("ok")
   return this.http.post<any>(`http://localhost:4000/api/mydataphotoid`,{_id})

  }
  mydataofimage(_id:any){
   return this.http.post<any>(`http://localhost:4000/api/mydataimage`,{_id})

  }


   imgedataupdate(myphotoid:any,_id:any){
     return this.http.put<any>(`http://localhost:4000/api/postmyimageidatself/`+_id,{myphotoid})

    }


    imagepost(formData:any){
      return this.http.post<any>('http://localhost:4000/upload', formData)
      }

      mydataselfphoto(_id:any){
       return this.http.post<any>(`http://localhost:4000/api/mydataselfimage`,{_id})

      }

      mydataimgurl(selfimagesrc:any,_id:any){
        console.log(selfimagesrc)
        return this.http.put<any>(`http://localhost:4000/api/postmyimageidatselfurl/`+_id,{selfimagesrc})

       }

}

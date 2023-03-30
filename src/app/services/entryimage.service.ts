import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryimageService {

  constructor(private http:HttpClient) { }


    imagepost(formData:any){
     return this.http.post<any>('http://localhost:4000/upload', formData)
     }

    imgedataupdate(myphotoid:any,_id:any){
      return this.http.put<any>(`http://localhost:4000/api/postmyimageid/`+_id,{myphotoid})

     }


}

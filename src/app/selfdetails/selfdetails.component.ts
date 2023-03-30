import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { EntryService } from '../services/entry.service';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { SelfdetailsService } from '../services/selfdetails.service';
import { EntryimageService } from '../services/entryimage.service';
// import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient, HttpEventType } from '@angular/common/http'

@Component({
  selector: 'app-selfdetails',
  templateUrl: './selfdetails.component.html',
  styleUrls: ['./selfdetails.component.css']
})
export class SelfdetailsComponent implements OnInit  {
  formData: FormData = new FormData();
  selectedFile : any;
  // @ViewChild("singleinput", { static: false })
  singleinput!: ElementRef;
  // logindatastore:any
  // logindata: any;
//  _id: any;
  myphotoid:any;
  postdatamessage:any

  safeimageurl!: SafeUrl;
  mydataall: any
  logindatastore: any;
  logindata: any;
  x: any
  y: any
  _id: any;
  myotherdata: any;
  myothersdatas: any = [];
  imagesrc: any=[]
  textdata:any
  myphotodis:Boolean=false;
selfimgid:any
selfimagesrc: any




constructor(private mydata:SelfdetailsService, private mydatas: EntryimageService  , private sanitizer: DomSanitizer, private http:HttpClient){}

  ngOnInit(): void {


    this.logindatastore = localStorage.getItem("login")
    this.logindata = JSON.parse(this.logindatastore)
    this._id = this.logindata.userdata._id



    this.mydata.mydata(this._id).subscribe((res) => {
      this.mydataall = (res.x)
       console.log(  this.mydataall  )
       this.mydataall.shift()
       console.log(  this.mydataall  )

      for(var _id of this.mydataall ){
        var row: SafeUrl
          this.http.get('http://localhost:4000/image/'+_id, {observe:'body', responseType :'blob'} )
          .subscribe((res) => {
            console.log(res);
            var url = URL.createObjectURL(res)
             this.safeimageurl=this.sanitizer.bypassSecurityTrustUrl(url)
            this.imagesrc.push(this.safeimageurl)
            console.log(this.imagesrc)

          })

        }
    })



    this.mydata.mydataselfphoto(this._id).subscribe((res:any) => {
      console.log(res)
      this.selfimgid=res.x
      var _id=this.selfimgid
      this.http.post('http://localhost:4000/image',{_id}, {observe:'body', responseType :'blob'} )
      .subscribe((res) => {
        console.log(res);
        var url = URL.createObjectURL(res)
         this.safeimageurl=this.sanitizer.bypassSecurityTrustUrl(url)
        this.selfimagesrc=this.safeimageurl
        console.log(this.selfimagesrc)
        // this.mydata.mydataimgurl(this.selfimagesrc,this._id).subscribe((res) => {
        //   console.log(res)
        // })

      })


    })








 }



 myputosbutton(){
  this.myphotodis=true
 }


//  selfimg(){




//  }



 onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  console.warn(this.selectedFile)
}

onUpload() {
  const formData = new FormData();
  formData.append('file', this.selectedFile, this.selectedFile.name);
  console.warn(formData)

  this. mydata.imagepost(formData).subscribe((response) => {
      console.log(response);
      console.log(response.file.id);

      this.myphotoid = response.file.id
      // this.singleinput.nativeElement.value=""

      if(response.file.id){
        this.postdatamessage="photo is uploaded"
        this. mydata.imgedataupdate(this.myphotoid,this._id).subscribe((res)=>{
          console.warn(res)
          if(res){
            window.location.reload()
          }
         })
      }
    });

  }






}

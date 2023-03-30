import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http'
import { FormGroup, FormControl } from '@angular/forms';
import { EntryimageService } from '../services/entryimage.service';
@Component({
  selector: 'app-entryimage',
  templateUrl: './entryimage.component.html',
  styleUrls: ['./entryimage.component.css']
})
export class EntryimageComponent implements OnInit {

  formData: FormData = new FormData();
  selectedFile : any;
  @ViewChild("singleinput", { static: false })
  singleinput!: ElementRef;
  logindatastore:any
  logindata: any;
 _id: any;
  myphotoid:any;
  postdatamessage:any

  constructor(private http: HttpClient,private router:Router, private imageservice:EntryimageService){
  }
  ngOnInit(): void {
    this.logindatastore = localStorage.getItem("login")
    this.logindata =JSON.parse(this.logindatastore)
    this._id = this.logindata.userdata._id
    console.log( this._id)




  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.warn(this.selectedFile)
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    console.warn(formData)

    this.imageservice.imagepost(formData).subscribe((response) => {
        console.log(response.file.id);
        this.myphotoid = response.file.id
        this.singleinput.nativeElement.value=""

        if(response){
          this.postdatamessage="photo is uploaded"
          this.imageservice.imgedataupdate(this.myphotoid,this._id).subscribe((res)=>{
            console.warn(res)
           })
        }
      });

    }
  }

import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { EntryService } from '../services/entry.service';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { Socket } from 'ngx-socket-io';
// import    io from 'socket.io-client';
import { io } from 'socket.io-client';

// const SOCKET_ENDPOINT = 'http://localhost:4000';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  socket: any
  public message: string | undefined;
  likes: any = [[]]
  likesid: any
  // safeimageurl!: SafeUrl;
  mydataall: any;
  logindatastore: any;
  logindata: any;
  x: any
  y: any
  _id: any;
  myotherdata: any;
  myothersdatas: any = [];

  textdata: any

  imagesrc: any = [[]]
  safeimageurlall:any

 safeimageurl:any;
  selfimagesrc: any

  selfimagesothersrc: any = []
  safeimageurlss!: SafeUrl;
  safeimageurlsss!: SafeUrl;

  selfimgid: any;
  myotherselfpic: any
  safeimageurls!: SafeUrl;




  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer, private mydata: EntryService) {


    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });



  }


  ngOnInit(): void {

    this.logindatastore = localStorage.getItem("login")
    this.logindata = JSON.parse(this.logindatastore)
    this._id = this.logindata.userdata._id


    this.mydata.mydataselfphoto(this._id).subscribe((res: any) => {
      console.log(res)
      this.selfimgid = res.x
      var _id = this.selfimgid
      this.http.post('http://localhost:4000/image' ,{_id}, { observe: 'body', responseType: 'blob' })
        .subscribe((res) => {
          const url = URL.createObjectURL(res)
          console.log(url)
          this.safeimageurl = this.sanitizer.bypassSecurityTrustUrl(url)
          console.log(this.safeimageurl)
          this.selfimagesrc = this.safeimageurl
          console.log(this.selfimagesrc)
        })


    })




    this.mydata.friendsdataofimage(this._id).subscribe((res) => {

      console.log(res)
      console.log(res.z)
      var myothersdatas = res.z
      for (let i = 0; i < myothersdatas.length; i++) {
        var row: SafeUrl
        for (let j = 1; j < myothersdatas[i].length; j++) {
          const _id = myothersdatas[i][j]
          this.http.post('http://localhost:4000/image' ,{_id} , { observe: 'body', responseType: 'blob' })
            .subscribe((res) => {
              var url = URL.createObjectURL(res)
              this.safeimageurlall = this.sanitizer.bypassSecurityTrustUrl(url)
              var newarray = (this.safeimageurlall)
              myothersdatas[i][j] = newarray
            });

        }
      }
      this.imagesrc = myothersdatas
      console.log(this.imagesrc)
    })





    this.mydata.selfoterimg(this._id).subscribe((res: any) => {
      console.log(res)
      this.mydataall = (res)
      this.myotherselfpic = this.mydataall.y
      for (let item of this.myotherselfpic) {
        console.log(item)
        if (item !== null) {
          console.log("unnok")
          const _id = item

          this.http.post('http://localhost:4000/image' , {_id}, { observe: 'body', responseType: 'blob' })
            .subscribe((res) => {
              // console.log(res);
              var url = URL.createObjectURL(res)


              this.safeimageurlss = this.sanitizer.bypassSecurityTrustUrl(url)
              console.log(this.safeimageurlss);
              this.selfimagesothersrc.push(this.safeimageurlss)
              console.log(this.selfimagesothersrc)
            })
        }
        else {
          console.log("undef")
          const _id = '641d4cd3898bdbd96040cc7e'
          console.log(_id)
          this.http.post('http://localhost:4000/image', {_id}, { observe: 'body', responseType: 'blob' })
            .subscribe((res) => {
              var url = URL.createObjectURL(res)

              this.safeimageurlsss = this.sanitizer.bypassSecurityTrustUrl(url)
              console.log(this.safeimageurlsss);
              this.selfimagesothersrc.push(this.safeimageurlsss)
              console.log(this.selfimagesothersrc)
            })
        }
      }
    })




    this.mydata.friendsdata(this._id).subscribe((res) => {
      this.myotherdata = res.y
      console.log(this.myotherdata)
    })






    this.mydata.friendsdataofimage(this._id).subscribe((res) => {
      // console.log(res)
      var myothersdatas = res.z
      //  console.log(myothersdatas)
      // const newARRAY=[]
      var likes
      for (let i = 0; i < myothersdatas.length; i++) {
        var row: SafeUrl
        for (let j = 1; j < myothersdatas[i].length; j++) {
          let _id = myothersdatas[i][j]
          // console.log(_id)
          this.socket.emit('getLikes', { _id: _id });
          this.socket.on('likes', (data: any) => {

            if (data.post_id === _id) {
              var newarray = (data.likes);
              myothersdatas[i][j] = newarray
            }
            // console.log(this.likes)
          });

        }
      }
      this.likes = myothersdatas
    })









  }


  ngOnDestroy(): void {
    for (const imagesrc of this.imagesrc)
      window.URL.revokeObjectURL(imagesrc)
  }



  logout() {
    localStorage.removeItem("login")
    this.router.navigate(["/"])
  }


  like(_id: any) {
    this.socket.emit('like', { _id });
    console.log("inemitlike")

  }


}

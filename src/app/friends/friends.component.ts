import { Component, OnInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { canceliddata, friendiddata, registerdata } from '../datatype';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

   cancelinformation:string="";
   logindata:any
   logindatastore:any
   otherdataid:any
   addfriendid:any
   totaladdfriendsselfids:any
   otherconformid:any
   totalconformfriendsselfids:any=undefined ||  []
   allfriendsdata:any
   mytotaladdfriendsselfids:any
   mytotalconformfriendsselfids:any
   friendsdataalls:string[]=[]
   friendsdataall:any
   showElement :any


  constructor(private friends:FriendsService ){}


   ngOnInit(): void {






        console.warn("ok")
        this.logindatastore = localStorage.getItem("login")
        this.logindata =JSON.parse(this.logindatastore)
        this.addfriendid = this.logindata.userdata._id



        this.friends.friendsdata(this.addfriendid).subscribe((res:any)=>{
          console.log(res)
          var x=res
          console.log(x.data)
            this.friendsdataall=(x.data)
            console.log(this.friendsdataall)

           this.showElement = Array(this.friendsdataall.length).fill(true);
              })
            // console.log(this.friendsdataall)
            // console.log(this.friendsdataall)




        this.friends.alladdfriendsidmy(this.addfriendid).subscribe((result:any)=>{
          this.totaladdfriendsselfids=result.totaladdfriendid
            console.log(  this.totaladdfriendsselfids)
            // for( let items of   this.totaladdfriendsselfids ){
            //   this.friendsdataalls.push(items)
            //  }

          })


            this.friends.allconformfriendsidmy(this.addfriendid).subscribe((result:any)=>{
              this.totalconformfriendsselfids  =result.totalconformfriendid
              //console.log(this.totalconformfriendsselfids )
              // for( let items of  this.totalconformfriendsselfids  ){
              //   this.friendsdataalls.push(items)
              //  }
              })

              this.friends.myalladdfriendsidmy(this.addfriendid).subscribe((result:any)=>{
                this.mytotaladdfriendsselfids=result.totaladdfriendid
                 for( let items of this.mytotaladdfriendsselfids ){
                  this.friendsdataalls.push(items)
                 }

                })

                this.friends.myallconformfriendsidmy(this.addfriendid).subscribe((result:any)=>{
                  this.mytotalconformfriendsselfids  =result.totaladdfriendid
               //   console.log(result.totaladdfriendid)
               for( let items of this.mytotalconformfriendsselfids  ){
                this.friendsdataalls.push(items)
               }

                  })

             var x=   this.friendsdataalls.join(",")
        console.log(this.friendsdataalls)

  //  console.log(this.friendsdataall)
  //  for(var items in this.friendsdataall ){
  //   console.log(items)
  //  }
   }


   hideElement(i: number) {
    this.showElement[i] = false;
  }





addfriend(_id:friendiddata){

    this.friends.addfriend(_id,this.addfriendid).subscribe((res)=>{
     console.warn(res)
     this.otherdataid =res.otherid._id
     console.log(this.otherdataid)
    })
  }

conformfriend(_id:friendiddata){
  this.friends.conformfriend(_id,this.addfriendid).subscribe((res)=>{
    console.warn(res)
    this.otherconformid=res.otherid._id
    console.log(this.otherconformid)
   } )}

cancelsubmit(_id:canceliddata){
  console.warn(_id)
  const id ={_id}
  console.warn(id)
this.friends.canceldata(id).subscribe((res)=>{
  console.warn(res)
  if(res){
this.cancelinformation="this data is deleted"
}else{
  this.cancelinformation="this data is not deleted"
}
    })
}
}





//console.log(this.friendsdataalls)

 //for(let item of this.friendsdataall){
  //for(let ite of this.totaladdfriendsselfids){
    // for(let it of this.totalconformfriendsselfids ){
    //   for(let i of this.mytotaladdfriendsselfids ){
       // for(let items of this.mytotalconformfriendsselfids ){
          // if((item._id!=ite)){
            //  if(!(item==it)){
            //   if(!(item==i)){
               // if(!(item==items)){
                  // this.friendsdataalls.push(item)
             //console.log(item._id)
             //   }
     //         }
   //         }
        //    }

        // }
//       }
//     }
   //}
  //}

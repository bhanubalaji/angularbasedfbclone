import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { EntryComponent } from './entry/entry.component';
import { EntryimageComponent } from './entryimage/entryimage.component';
import { FriendsComponent } from './friends/friends.component';
import { HelpsComponent } from './helps/helps.component';
import { HomeComponent } from './home/home.component';
import { InfosComponent } from './infos/infos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelfdetailsComponent } from './selfdetails/selfdetails.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'entry',component:EntryComponent,canActivate:[AuthGuard]},
  {path:"entry/friends", component:FriendsComponent,canActivate:[AuthGuard]},
  {path:"entry/image-upload", component:EntryimageComponent,canActivate:[AuthGuard]},
  {path:"entry/selfdetails", component:SelfdetailsComponent,canActivate:[AuthGuard] },
  {path:"entry/help", component: HelpsComponent ,canActivate:[AuthGuard] },
  {path:"entry/info", component: InfosComponent  ,canActivate:[AuthGuard] }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

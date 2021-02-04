import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInUserGuard } from './guards/logged-in-user.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LikedComponent } from './pages/liked/liked.component';
import { LoginComponent} from './pages/login/login.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WatchComponent } from './pages/watch/watch.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInUserGuard]}, 
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInUserGuard]},
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'search', component: SearchComponent, canActivate: [LoggedInGuard] },
  { path: 'search/:movie', component: SearchComponent, canActivate: [LoggedInGuard] },
  { path: 'liked', component: LikedComponent, canActivate: [LoggedInGuard]},
  { path: 'movieInfo/:id', component: MovieInfoComponent, canActivate: [LoggedInGuard]},
  { path: 'profile/:username', component: UserProfileComponent, canActivate: [LoggedInGuard]},
  { path: 'watch', component: WatchComponent, canActivate: [LoggedInGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

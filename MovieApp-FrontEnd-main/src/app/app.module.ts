import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollMenuComponent } from './components/scroll-menu/scroll-menu.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { LikedComponent } from './pages/liked/liked.component';
import { MovieSearchCardComponent } from './components/movie-search-card/movie-search-card.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { CommentEntryComponent } from './components/comment-entry/comment-entry.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WatchComponent } from './pages/watch/watch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SearchComponent,
    ScrollMenuComponent,
    MovieItemComponent,
    LikedComponent,
    MovieSearchCardComponent,
    MovieInfoComponent,
    UserProfileComponent,
    WatchComponent,
    CommentEntryComponent,
    UserProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

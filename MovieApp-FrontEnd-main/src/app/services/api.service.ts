import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Movie } from '../interfaces/Movie'; 

import { MovieInfoComponent } from '../pages/movie-info/movie-info.component';
import { Comment } from '../interfaces/Comment';
import{HttpHeaders} from '@angular/common/http'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/MovieApp/api/';
  // private baseUrl = 'http://ec2-18-216-66-77.us-east-2.compute.amazonaws.com:8090/MovieApp/api/';
  public loggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public currentUser: User | null = null;

 
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: User): Promise<string>{
    return new Promise((resolve, reject) =>{
      this.http.post<User>(`${this.baseUrl}user/login`, user, {withCredentials: true}).subscribe(data => {
        if(data != null && data.firstName != null){ 
          let userStore = JSON.stringify(data); 
          localStorage.setItem("user", userStore); 
          this.setCurrentUser(data);
          this.loggedInUser.next(data); 
          this.router.navigate(['home']);   
          return resolve("Succesfully Logged In")  
        } else {
          return reject("Username or Password is incorrect");
        }  
      })
    }) 
  }

  isLoggedIn(): boolean{
    let loggedIn = false; 
    if(this.loggedInUser.value){ 
      loggedIn = true; 
    } else {
      this.logInFromLocalStorage(); 
      if(this.loggedInUser.value){
        loggedIn = true; 
      }
    }
    return loggedIn; 
  }

  private logInFromLocalStorage() {
    let loggedIn = localStorage.getItem('user');
    if (typeof loggedIn === 'string')
      this.loggedInUser.next(JSON.parse(loggedIn));
  }

  logout(){
    console.log("Clicking this");
    localStorage.clear(); 
    this.removeCurrentUser();
    this.loggedInUser.next(null);  
  }

  registerNewUser(newUser: User) {
    let message = '';
    console.log(newUser);
    this.http
      .post<User>(`${this.baseUrl}/user/register`, newUser)
      .subscribe((data) => {
        console.log(data);
        if (data != null) {
        } else {
          console.log('USER WAS REGISTERED');
          message = 'USER WAS REGISTERED';
          this.router.navigate(['login']);
        }
      });
    return message;

  }
  private setCurrentUser(data: User) {
    this.currentUser = data;
  }
  public getCurrentUser(): User | null {
    return this.currentUser;
  }
  private removeCurrentUser() {
    this.currentUser = null;
  }

  getListByMovieId(movieId: number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}lists/movieID?movieID=${movieId}`, {withCredentials: true});
  }

  getLikedMovies(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}lists/user/likedlist?userID=${this.loggedInUser.value?.id}`, {withCredentials: true});
  }


  getLikeListById(id: number):  Observable<any>{
    console.log(id); 
    return this.http.get<any>(`${this.baseUrl}lists/user/likedlist?userID=${id}`, {withCredentials: true});
  }

  getWatchList(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}lists/user/watchlist?userID=${this.loggedInUser.value?.id}`, {withCredentials: true})
  }



  addMovieToLikeList(movieID: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lists/like?movieID=${movieID}`, httpOptions, {withCredentials:true});
  }

  addMovieToWatchList(movieID: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lists/watch?userID=${this.loggedInUser.value?.id}&movieID=${movieID}`, httpOptions, {withCredentials: true});
  }

  removeFromLikedList(movieID: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lists/removelike?movieID=${movieID}`, httpOptions, {withCredentials: true})
  }

  removeFromWatchList(movieID: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}lists/removewatch?userID=${this.loggedInUser.value?.id}&movieID=${movieID}`, httpOptions, {withCredentials: true})
  }
  
  
  getCommentsByMovieId(id: number) : Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}comment/movieID/?movieID=${id}`, {withCredentials: true});
  }

  addCommentByMovieId(entry: Comment){
    return this.http.post<Comment>(`${this.baseUrl}comment/insert`, entry, {withCredentials: true});
  }

  deleteCommentById(id: number){
    return this.http.delete(`${this.baseUrl}comment/delete/?id=${id}`, {withCredentials: true});
  }

  getUserByUsername(username: string){
    return this.http.get(`${this.baseUrl}user/?username=${username}`, {withCredentials: true});
  }

}



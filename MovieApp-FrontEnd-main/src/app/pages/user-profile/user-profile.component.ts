import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { Movie } from '../../interfaces/Movie';
import { ApiService } from '../../services/api.service';
import { TmdbService } from '../../services/tmdb.service'; 

//New 
import{ActivatedRoute} from '@angular/router'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnChanges{
  user: User = new User();
  likedMovies: Movie[] = [];
  currentUserProfile: boolean = true; 

 
  username: string = ""

  testing = new BehaviorSubject<string>("")

  constructor(
    private apiService: ApiService,
    private tmdbService: TmdbService,
    private router: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes); 
  }


  ngOnInit(): void {

    this.router.params.subscribe((params) =>{
      this.username = params['username']; 
      this.likedMovies = []; 
      this.apiService.getUserByUsername(this.username).subscribe(data =>{
        this.user = Object.assign(new User(), data);
        let local = localStorage.getItem("user");
        if(typeof local === "string"){
          let user = JSON.parse(local).username; 
          if(this.username != user){
            this.currentUserProfile = false; 
          } else {
            this.currentUserProfile = true; 
          }
        } 
      
        this.apiService.getLikeListById(this.user.id).subscribe(
            data => {
              console.log(`DATA: ${JSON.stringify(data)}`)
              data.forEach((element: any) => {
                let id: number = element["movieID"];
                this.tmdbService.getMovieById(id).subscribe(
                  movie => {
                    let addMovie: Movie = this.tmdbService.dataToMovie(movie);
                    this.likedMovies.push(addMovie);
                  }
                )
              });
            }
          )
      })
    })

  



    
    
      
    

  }


  logout(){
    this.apiService.logout();
  }



}

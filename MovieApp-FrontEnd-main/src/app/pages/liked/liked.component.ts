import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css'],
})
export class LikedComponent implements OnInit {

  likedMoviesData: any[] = []; 
  likedMovies: Movie[] = []; 
  // loadingMovies: boolean = true; 
  constructor(private api: ApiService, private tmdb: TmdbService) { }

  ngOnInit(): void {
  

    this.api.getLikedMovies().subscribe( details => {
      this.likedMoviesData = details; 
      for(let movie of this.likedMoviesData){
        this.tmdb.getMovieById(movie.movieID).subscribe( details => {
          this.likedMovies.push(this.tmdb.dataToMovie(details))
          // this.loadingMovies = false; 
        }  
        )
      }
    });
  }

  remove(movie: Movie) {
    this.api.removeFromLikedList(movie.id).subscribe(() => {
      this.likedMovies = this.likedMovies.filter(
        (selected) => selected != movie
      );
    });
  }
}

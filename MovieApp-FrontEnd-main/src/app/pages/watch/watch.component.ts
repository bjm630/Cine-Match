import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/interfaces/Movie';
import { ApiService } from 'src/app/services/api.service';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  watchListDetails: any[] = []; 
  watchList: Movie[] = []; 
  // loadingMovies: boolean = true; 
  
  constructor(private api: ApiService, private tmdb: TmdbService) { }

  ngOnInit(): void {
  

    this.api.getWatchList().subscribe(details => {
      this.watchListDetails = details; 
      for(let movie of this.watchListDetails){
        this.tmdb.getMovieById(movie.movieID).subscribe(details =>{
          this.watchList.push(this.tmdb.dataToMovie(details));  
          // this.loadingMovies = false; 
        })
      }
    })
  }

  remove(movie: Movie) {
    this.api.removeFromWatchList(movie.id).subscribe(() =>{
      this.watchList = this.watchList.filter(selected => selected != movie); 
    })
     
  }
    

}

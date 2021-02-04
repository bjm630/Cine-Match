import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generate } from 'rxjs';
import { TmdbCollections } from 'src/app/interfaces/TmdbCollections';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  search: String = '';
  collection: any = TmdbCollections;

  constructor(private router: Router, private tmdb: TmdbService) {}

  ngOnInit(): void {}

  clickSearch(): void {
    console.log(`SEARCH: ${this.search}`);
    this.router.navigate(['/search', this.search]);
  }

  generateRandomMovie(): void {
    let movieId = Math.floor(Math.random() * 1000000); //range from 0-999999
    this.tmdb.getMovieById(movieId).subscribe(
      (data: any) => {
        if (data && !data.adult && data.poster_path) {
          this.router.navigate([`movieInfo/${movieId}`]);
        } else {
          //If movie is adult or lacks an image, search again!
          this.generateRandomMovie();
        }
      },
      (error) => {
        //If id is invalid, search again!
        this.generateRandomMovie();
      }
    );
  }
}

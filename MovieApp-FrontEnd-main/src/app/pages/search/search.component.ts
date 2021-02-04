import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/Movie';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchMovie: string = '';
  movies: Movie[] = [];
  private sub: any;
  isSearching: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private location: Location
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.searchMovie = params['movie'];
      if (this.searchMovie) {
        this.getMovies();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMovies() {
    this.location.go(`search/${this.searchMovie}`);
    this.movies = [];
    this.isSearching = true;
    this.tmdbService.getMovies(this.searchMovie).subscribe((data) => {
      this.movies = this.tmdbService.dataToMovieArray(data);
      this.isSearching = false;
      console.log(this.movies);
    });
  }
}

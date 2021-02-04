import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../interfaces/Movie';

@Component({
  selector: 'app-movie-search-card',
  templateUrl: './movie-search-card.component.html',
  styleUrls: ['./movie-search-card.component.css']
})
export class MovieSearchCardComponent implements OnInit {
  @Input() movie!: Movie;

  constructor() { }

  ngOnInit(): void {
    
  }

}

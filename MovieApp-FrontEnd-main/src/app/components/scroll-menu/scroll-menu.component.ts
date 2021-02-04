import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { TmdbCollections } from 'src/app/interfaces/TmdbCollections';
import { TmdbService } from 'src/app/services/tmdb.service';

interface MovieItem{
  id: number;
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-scroll-menu',
  templateUrl: './scroll-menu.component.html',
  styleUrls: ['./scroll-menu.component.css']
})
export class ScrollMenuComponent implements OnInit {

  @Input()
  listName : string = "";
  
  @Input()
  movieArray: Movie[] = [];

  @Input()
  collectionType: string | undefined;

  constructor(private movieService: TmdbService) { }

  /**
   * You will need to supply a collection type if you want to utilize TMDB's built in lists
   * Otherwise you will need to supply your own custom Movie array via the movieArray property
   */
  ngOnInit(): void {
    if(this.collectionType !== undefined){
      this.movieService.getMovieCollection(this.collectionType).subscribe(
        data => {
          this.movieArray = this.movieService.dataToMovieArray(data);
        }
      );
    }
  }

}

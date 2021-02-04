import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/Movie';
import { ApiKey } from '../../secrets/ApiKey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

  private searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + ApiKey + '&query=';
  private collectionUrlPrefix = 'https://api.themoviedb.org/3/movie/';
  private collectionUrlPostfix = '?api_key=' + ApiKey;

  constructor(private http: HttpClient) {}

  public getMovies(movieName: string): Observable<string> {
    return this.http.get<string>(this.searchUrl + movieName)
  }

  public getMovieCollection(type: string): Observable<string> {
    return this.http.get<string>(this.collectionUrlPrefix + type + this.collectionUrlPostfix)
  }

  public getMovieById(id: number): Observable<string>{
    return this.http.get<string>(this.collectionUrlPrefix + id + this.collectionUrlPostfix);
  }

  public dataToMovie(data: any): Movie {
    let movie: Movie = {
      id: 0,
      title: '',
      description: '',
      image: '',
      releaseDate: '',
      genre: '',
      rating: 0
    }
    movie.id =  data["id"];
    movie.title =  data["title"];
    movie.image = `https://image.tmdb.org/t/p/w500/${data["poster_path"]}`;
    movie.genre = data["genres"];
    movie.rating = data["vote_average"];
    movie.description = data["overview"];
    movie.releaseDate = data["release_date"];
    return movie
  }

  public dataToMovieArray(data: any): Movie[] {
    let movies: Movie[] = []
    let jsonMovies: any = data["results"];
    jsonMovies.forEach((jsonMovie: any) => {
      let movie: Movie = {
        id: 0,
        title: '',
        description: '',
        image: '',
        releaseDate: '',
        genre: '',
        rating: 0
        }
      if(jsonMovie["poster_path"] != null){
        movie.id = jsonMovie["id"];
        movie.title = `${jsonMovie["title"]}`;
        movie.description = `${jsonMovie["overview"]}`;
        movie.image = `https://image.tmdb.org/t/p/w200/${jsonMovie["poster_path"]}`;
        movie.releaseDate = `${jsonMovie["release_date"]}`;
        movies.push(movie);
      }
    });
    return movies;
  }
}

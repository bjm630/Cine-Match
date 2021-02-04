import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { LikedComponent } from './liked.component';
import {Movie} from '../../interfaces/Movie';

import {of} from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb.service';
import {delay} from 'rxjs/operators';




fdescribe('LikedComponent', () => {
  let component: LikedComponent;
  let fixture: ComponentFixture<LikedComponent>;


  let movies: Movie[]; 
  let movie: Movie; 
  let tmdbService: TmdbService; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      declarations: [ LikedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tmdbService = TestBed.get(TmdbService); 
    movies= [
      { id: 1,
        title: "test1",
        description: "description for test1 movie",
        image: "test1Image.url",
        releaseDate: "10/10/2020",
        genre: ["testGenre", "test2Genre"],
        rating: 1
      },
      {  id: 2,
        title: "test2",
        description: "description for test2 movie",
        image: "test2Image.url",
        releaseDate: "2/2/2020",
        genre: ["test2Genre"],
        rating: 2
      }
    ];
    movie = {
      id: 1,
        title: "test1",
        description: "description for test1 movie",
        image: "test1Image.url",
        releaseDate: "10/10/2020",
        genre: ["testGenre", "test2Genre"],
        rating: 1
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checks to see if we have remove function', () =>{
    expect(component.remove).toBeTruthy();
  })

  it('checks to see removeLikedList in the apiService is called once', () =>{
    const api = jasmine.createSpyObj("api", ["removeFromLikedList"]); 
    const tmdb = jasmine.createSpyObj("tmdb", [""]);
    api.removeFromLikedList.and.returnValue(of("something")) 
    const remove = new LikedComponent(api, tmdb); 
    remove.likedMovies = movies; 
    remove.remove(movie); 
    expect(api.removeFromLikedList).toHaveBeenCalledTimes(1);
  })

  //Dont know how to use this. 
  it('checks to see if tmdb and api service gets called on init', fakeAsync(() =>{
    // const api = jasmine.createSpyObj("api", ["getLikedMovies"]); 
    // const tmdb = jasmine.createSpyObj("tmdb", ["getMovieById"]); 
    // api.getLikedMovies.and.returnValue(of([])); 
    // tmdb.getMovieById.and.returnValue(of("test movie")); 
    // const init = new LikedComponent(api, tmdb); 
    
    // expect(init.likedMovies).toBeFalsy(); 
    // expect(init.likedMoviesData).toBeFalsy();
    spyOn(tmdbService, 'getMovieById').and.returnValue(of("test").pipe(delay(1))); 
    fixture.detectChanges()
    expect(component.likedMoviesData).toBeTruthy();
    // expect(tmdbService.getMovieById).toHaveBeenCalledWith(); 
    tick(1);

    
  }))




});

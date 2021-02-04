import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { MovieSearchCardComponent } from './movie-search-card.component';

describe('MovieSearchCardComponent', () => {
  let component: MovieSearchCardComponent;
  let fixture: ComponentFixture<MovieSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      declarations: [ MovieSearchCardComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchCardComponent);
    component = fixture.componentInstance;
    component.movie = {
      id: 0,
      title: "test",
      description: "test description",
      image: "string",
      releaseDate: "11/13/2020",
      genre: "horror",
      rating: 0
    }
    fixture.detectChanges();
  });

  it('basic', () => {
    expect(component).toBeTruthy();
  });

  it('has a title test', () => {
    expect(component.movie.title).toBe("test");
  });
});

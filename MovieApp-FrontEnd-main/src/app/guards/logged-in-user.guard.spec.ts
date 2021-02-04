import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggedInUserGuard } from './logged-in-user.guard';

describe('LoggedInUserGuard', () => {
  let guard: LoggedInUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ LoggedInUserGuard ]
    });
    guard = TestBed.inject(LoggedInUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

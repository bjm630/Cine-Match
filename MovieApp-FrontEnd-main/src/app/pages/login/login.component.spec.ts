import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { User } from 'src/app/interfaces/user';
import { FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(username: string, userPassword: string) {
    component.loginUser.username = username; 
    component.loginUser.password = userPassword;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial state is set to a blank user', ()=>{
    expect(component.errorMessage).toBeFalsy(); 
    expect(component.password).toEqual(""); 
    expect(component.username).toEqual(""); 
    expect(component.loginUser).toEqual(new User); 
    expect(component.successful).toBeFalsy();
  })

  it('when onSubmit() successful should become true', ()=>{
    component.onSubmit(); 
    expect(component.successful).toBeTruthy();
  })
  
  it('form is updated when the user changes values', () => {
    updateForm("test", "testpw"); 
    expect(component.loginUser.username).toEqual("test"); 
    expect(component.loginUser.password).toEqual("testpw");
  })

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMockComponent } from './login-mock.component';

describe('LoginMockComponent', () => {
  let component: LoginMockComponent;
  let fixture: ComponentFixture<LoginMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

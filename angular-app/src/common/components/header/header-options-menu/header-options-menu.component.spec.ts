import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOptionsMenuComponent } from './header-options-menu.component';

describe('HeaderOptionsMenuComponent', () => {
  let component: HeaderOptionsMenuComponent;
  let fixture: ComponentFixture<HeaderOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOptionsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

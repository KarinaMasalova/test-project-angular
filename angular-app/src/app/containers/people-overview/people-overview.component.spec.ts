import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleOverviewComponent } from './people-overview.component';

describe('PeopleOverviewComponent', () => {
  let component: PeopleOverviewComponent;
  let fixture: ComponentFixture<PeopleOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

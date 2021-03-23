import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTabPanelComponent } from './header-tab-panel.component';

describe('HeaderTabPanelComponent', () => {
  let component: HeaderTabPanelComponent;
  let fixture: ComponentFixture<HeaderTabPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTabPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

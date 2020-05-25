import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckFeedFormComponent } from './duck-feed-form.component';

describe('CustomerSupportComponent', () => {
  let component: DuckFeedFormComponent;
  let fixture: ComponentFixture<DuckFeedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuckFeedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuckFeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

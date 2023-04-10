import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativePostsComponent } from './alternative-posts.component';

describe('AlternativePostsComponent', () => {
  let component: AlternativePostsComponent;
  let fixture: ComponentFixture<AlternativePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternativePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternativePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOnPushComponent } from './child-on-push.component';

describe('ChildOnPushComponent', () => {
  let component: ChildOnPushComponent;
  let fixture: ComponentFixture<ChildOnPushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildOnPushComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildOnPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

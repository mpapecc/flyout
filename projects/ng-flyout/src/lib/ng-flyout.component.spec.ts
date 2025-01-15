import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFlyoutComponent } from './ng-flyout.component';

describe('NgFlyoutComponent', () => {
  let component: NgFlyoutComponent;
  let fixture: ComponentFixture<NgFlyoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgFlyoutComponent]
    });
    fixture = TestBed.createComponent(NgFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

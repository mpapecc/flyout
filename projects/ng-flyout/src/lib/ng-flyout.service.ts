import { Injectable, ViewContainerRef } from '@angular/core';
import { NgFlyoutComponent } from './ng-flyout.component';
import { Observable, skip } from 'rxjs';
import { Flyout } from './models/flyout';

@Injectable({
  providedIn: 'root'
})
export class NgFlyoutService {
  private flyoutsContainerRef!: ViewContainerRef;

  setFlyoutContainerRef(flyoutsContainerRef: ViewContainerRef) {
    this.flyoutsContainerRef = flyoutsContainerRef;
  }

  create<T>(flyoutData: Flyout<T>): Observable<T> {
    let flyout = this.flyoutsContainerRef.createComponent(NgFlyoutComponent);
    flyout.instance.flyoutData = flyoutData;
    flyout.instance.destroy = () => flyout.destroy();
    
    return flyout.instance.componentBehaviorSubject.pipe(skip(1)); 
    // pipe(skip(1)) is "hack" since first value that componentBehaviorSubject emits is one that is assigend on initialize
    // and that is null. Next value is ComponentRef of component we render as flyout content
  }
}

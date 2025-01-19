import { ApplicationRef, createComponent, Inject, Injectable, Injector } from '@angular/core';
import { NgFlyoutComponent } from './ng-flyout.component';
import { Observable, skip } from 'rxjs';
import { Flyout } from './models/flyout';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NgFlyoutService {

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) { }

  create<T>(flyoutData: Flyout<T>): Observable<T> {
    let flyoutComponentRef = createComponent(NgFlyoutComponent, {
      environmentInjector: this.applicationRef.injector,
      elementInjector: this.injector
    });

    this.applicationRef.attachView(flyoutComponentRef.hostView);
    this.document.body.appendChild(flyoutComponentRef.location.nativeElement);

    flyoutComponentRef.instance.flyoutData = flyoutData;
    flyoutComponentRef.instance.destroy = () => flyoutComponentRef.destroy();

    return flyoutComponentRef.instance.componentBehaviorSubject.pipe(skip(1));
    // pipe(skip(1)) is "hack" since first value that componentBehaviorSubject emits is one that is assigend on initialize
    // and that is null. Next value is ComponentRef of component we render as flyout content
  }
}

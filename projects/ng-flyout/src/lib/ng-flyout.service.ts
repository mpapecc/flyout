import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { NgFlyoutComponent } from './ng-flyout.component';
import { Observable, skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgFlyoutService {
  private flyoutsContainerRef!: ViewContainerRef;

  setFlyoutContainerRef(flyoutsContainerRef: ViewContainerRef) {
    this.flyoutsContainerRef = flyoutsContainerRef;
  }

  public create<T>(flyoutData: Flyout<T>): Observable<T> {
    let flyout = this.flyoutsContainerRef.createComponent(NgFlyoutComponent);
    flyout.instance.flyoutData = flyoutData;
    flyout.instance.destroy = () => flyout.destroy();

    flyoutData.closeFlyout = flyout.instance.destroy

    return flyout.instance.componentBehaviorSubject.pipe(skip(1)); 
    // pipe(skip(1)) is "hack" since first value that componentBehaviorSubject emits is one that is assigend on initialize
    // and that is null. Next value is ComponentRef of component we render as flyout content
  }

  public closeAll() {
    this.flyoutsContainerRef.clear()
  }
}

export class Flyout<T> {
  flyout!: ComponentRef<NgFlyoutComponent>;
  content!: Type<T>;
  title!: string;
  onClose!: () => void;
  closeFlyout!: () => void;
  size: FlyoutSize = FlyoutSize.Large;
  onOk!: () => void;
  onCancel!: () => void;

  isSmall() {
    return this.size == FlyoutSize.Small;
  }
}

export enum FlyoutSize {
  Small,
  Large
}

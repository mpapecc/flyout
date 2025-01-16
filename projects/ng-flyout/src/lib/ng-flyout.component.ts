import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flyout } from './models/flyout';

@Component({
  selector: 'ng-flyout',
  templateUrl: './ng-flyout.component.html',
  styleUrls: ['./ng-flyout.component.css']
})
export class NgFlyoutComponent implements OnInit, AfterViewInit {
  @ViewChild("contentComponentDiv", { read: ViewContainerRef }) contentComponentDiv!: ViewContainerRef;

  @Input() contentComponent!: any;
  @Output() backdropClickEvent: EventEmitter<any> = new EventEmitter();

  isOpen: boolean = false;
  flyoutData!: Flyout<any>;
  componentBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.flyoutData?.content)
        return;

      this.flyoutData.closeFlyout = () => this.destroyFlyout();
      let componentRef = this.contentComponentDiv.createComponent(this.flyoutData.content);
      this.componentBehaviorSubject.next(componentRef.instance);
    })
  }

  ngOnInit(): void {
    setTimeout(() => this.isOpen = true);
  }

  protected backdropClick() {
    this.isOpen = false;
    setTimeout(() => {
      this.backdropClickEvent.emit();
      this.flyoutData.onClose();
      this.destroy();
    }, 200);
  }

  destroy() { }

  protected destroyFlyout() {
    this.isOpen = false
    setTimeout(() => this.destroy(), 200);
  }
}

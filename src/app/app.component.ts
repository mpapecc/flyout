import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Flyout, NgFlyoutService } from 'ng-flyout';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flyout';
  @ViewChild("flyouts", {read: ViewContainerRef}) flyouts!: ViewContainerRef;

  constructor(public flyoutService: NgFlyoutService){}

  ngAfterViewInit(): void {
    this.flyoutService.setFlyoutContainerRef(this.flyouts);
  }

  openFlyout(){
    let flyout = new Flyout<FormComponent>();
    flyout.content = FormComponent
    flyout.title = "aloo";

    this.flyoutService.create(flyout).subscribe(formComponent => {
      formComponent.openAnotherFlyout = () =>{
        let anotherflyout = new Flyout();
        anotherflyout.title = "Another Flyout";

        this.flyoutService.create(anotherflyout);
      }
    });
  }
}

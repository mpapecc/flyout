import { Component, OnInit } from '@angular/core';
import { Flyout, HeaderButton, NgFlyoutService } from 'ng-flyout';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'flyout';

  constructor(public flyoutService: NgFlyoutService) { }

  ngOnInit(): void {
    this.openFlyout();
  }
  
  openFlyout() {
    let flyout = new Flyout<FormComponent>();
    flyout.content = FormComponent;
    flyout.title = "aloo";
    flyout.onClose = () => console.log("on close event")

    let doneButton = new HeaderButton();
    doneButton.text = "Gotov sam";
    doneButton.onClick = () => flyout.closeFlyout();
    doneButton.cssClass = "red-button"

    let consoleLogButton = new HeaderButton();
    consoleLogButton.text = "Console Log";
    consoleLogButton.onClick = () => {
      console.log("Console button clicked");
      flyout.closeFlyout();
    }

    flyout.headerButtons = [consoleLogButton, doneButton];

    this.flyoutService.create(flyout).subscribe(formComponent => {
      formComponent.openAnotherFlyout = () => {
        let anotherflyout = new Flyout();
        anotherflyout.title = "Another Flyout";
        this.flyoutService.create(anotherflyout);
      }
    });
  }
}

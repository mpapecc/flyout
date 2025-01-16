# Flyout
## Description

Extensible flyout component based on Angular (v16). Multiple flyouts can exists at same time and they are stored into flyouts DOM container. 

Flyout consists of header and content area:

* header : title and header buttons
* content : render Angular component passed to flyout

npm : https://www.npmjs.com/package/ng-flyout
install : npm i ng-flyout

## Setup

Import NgFlyoutModule into your app module and add it to your module imports array. Into root component html (e.g. app.component.html) add flyouts container template reference element :

```html
<div #flyouts></div>
```

Into root component class (app.component.ts) inject `NgFlyoutService`, add flyouts container property :

```ts
@ViewChild("flyouts", { read: ViewContainerRef }) flyouts!: ViewContainerRef;
```

and inside `AfterViewInit` pass container reference to service :

```ts
export class AppComponent implements AfterViewInit {
  @ViewChild("flyouts", { read: ViewContainerRef }) flyouts!: ViewContainerRef;

  constructor(public flyoutService: NgFlyoutService) { }

  ngAfterViewInit(): void {
    this.flyoutService.setFlyoutContainerRef(this.flyouts);
  }
}
```

## Usage

Flyout is created from code by injecting `NgFlyoutService` and calling `create(flyout: Flyout<T>)` where generic parameter `<T>` is component we want to render within content area and flyout parameter is additional data such as title, `onClose` callback etc.

`create` method return `Observerable<T>`. 

`HeaderButton` class is used to instantiate buttons in upper right header area.

```ts
export class SomeComponent {

  constructor(public flyoutService: NgFlyoutService) { }

  openFlyout() {
    let flyout = new Flyout<FormComponent>();
    flyout.content = FormComponent;
    flyout.title = "Title";

    let doneButton = new HeaderButton();
    doneButton.text = "Close";
    doneButton.onClick = () => flyout.closeFlyout();
    doneButton.cssClass = "red-button"

    flyout.headerButtons = [doneButton];

    this.flyoutService.create(flyout).subscribe((formComponent : FormComponent) => {
        // here you can access FormComponet public properties and methods
    })
  }
}
```


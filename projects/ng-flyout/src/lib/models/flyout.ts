import { ComponentRef, Type } from "@angular/core";
import { NgFlyoutComponent } from "../ng-flyout.component";

export class Flyout<T> {
    title: string = "";
    size: FlyoutSize = FlyoutSize.Large;
    flyout!: ComponentRef<NgFlyoutComponent>;
    content!: Type<T>;
    headerButtons: HeaderButton[] = [];
    onClose: () => void = () => { };
    closeFlyout: () => void = () => { };
    isSmall = () => this.size == FlyoutSize.Small;
}

export class HeaderButton {
    text: string = "";
    cssClass: string = "";
    onClick: () => void = () => { };
}

export enum FlyoutSize {
    Small,
    Large
}
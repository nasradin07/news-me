import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.html'
})
export class LeftMenuComponent {
  @Input() content;
  text: string;

  constructor(
  ) {
    console.log('Hello LeftMenuComponent Component');
    this.text = 'Hello World';
  }

}

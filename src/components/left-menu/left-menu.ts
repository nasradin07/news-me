import { Component, Input } from '@angular/core';

import { LeftMenuProvider } from '../../providers/left-menu/left-menu';
@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.html'
})
export class LeftMenuComponent {
  @Input() content;
  sources: any;

  constructor(
    private _leftMenuProviders: LeftMenuProvider
  ) {
  }

  ionViewWillEnter() {
    this._subscibeToSourcesFetchEvent();
  }

  private _subscibeToSourcesFetchEvent() {
    this._leftMenuProviders.sourcesFetchEvent$.subscribe(
      sources => this.sources = sources
    )
  }

  public goToSource() {
    console.log('go to source');
  }

  ionViewWillLeave() {
  
  }

}

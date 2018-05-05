import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationProvider } from '../../providers/configuration';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

export class FooterComponent implements OnInit, OnDestroy{
  categories;
  private _subscriptions: Subscription[] = [];
  constructor(
    private _configurationProvider: ConfigurationProvider,
  ) { }

  ngOnInit(){
    this.subscribeToCategoryFetchEvent();
    this.getNewsConfiguration();
  }

  public subscribeToCategoryFetchEvent() {
    this._subscriptions.push(
      this._configurationProvider.categoriesFetchEvent$.subscribe(
        categories => {
          this.categories = categories;
        })
    );
  } 

  public getNewsConfiguration() {
    this._configurationProvider.getClientNewsConfiguration();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

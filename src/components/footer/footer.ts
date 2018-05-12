import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationProvider } from '../../providers/configuration';
import { InitialConfigurationProvider } from '../../providers/initial-configuration';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

export class FooterComponent implements OnInit, OnDestroy{
  categories;
  public show;
  private _subscriptions: Subscription[] = [];
  constructor(
    private _configurationProvider: ConfigurationProvider,
    private _initialConfigurationProvider: InitialConfigurationProvider
  ) { }

  ngOnInit(){
    this.subscribeToCategoryFetchEvent();
    this.subscribeToInitialConfigurationFetchEvent();
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

  public subscribeToInitialConfigurationFetchEvent() {
    this._subscriptions.push(
      this._initialConfigurationProvider.initialConfigurationFetchEvent$.subscribe(
        notification => this.show = true
      )
    )
  }

  public getNewsConfiguration() {
    this._configurationProvider.getClientNewsConfiguration();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

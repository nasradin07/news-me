import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
    private _initialConfigurationProvider: InitialConfigurationProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) { }

  ngOnInit(){
    this.subscribeToCategoryFetchEvent();
    this.subscribeToInitialConfigurationFetchEvent();
    this.initializeClientNewsConfiguration();
  }

  public subscribeToCategoryFetchEvent() {
    this._subscriptions.push(
      this._configurationProvider.categoriesFetchEvent$.subscribe(
        notification => {
          this.categories = this.getNewsCategories();
          this._changeDetectRef.detectChanges();
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

  public initializeClientNewsConfiguration() {
    this._configurationProvider.initializeClientNewsConfiguration();
  }

  public getNewsCategories() {
    return this._configurationProvider.getNewsCategories();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationProvider } from '../../providers/configuration';

@Component({
  selector: 'replacment-list',
  templateUrl: 'replacment-list.html'
})
export class ReplacmentListComponent implements OnInit, OnDestroy{
  public show;
  @Input() set showReplacementList( show: boolean) {
    this.show = show;
  }
  @Input() category;
  _subscriptions: Subscription[] = [];
  replacementCategories;
  constructor(
    private _configurationProvider: ConfigurationProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscribeForReplacementCategoriesFetchEvent();
    this.getReplacementCategories();
    this._changeDetectRef.detectChanges()
  }

  public subscribeForReplacementCategoriesFetchEvent() {
    this._subscriptions.push(
      this._configurationProvider.categoriesForReplacementFetchEvent$.subscribe(
        replacementCategories => {
          setTimeout( () => this.replacementCategories = replacementCategories, 0);
          this._changeDetectRef.detectChanges();
        })
      );
  }

  public getReplacementCategories() {
    this.replacementCategories = this._configurationProvider.getReplacementsCategory();
    this._changeDetectRef.detectChanges();
  }

  public replaceCategory(newCategory) {
    const oldCategory = this.category;
    this._configurationProvider.replaceCategory(newCategory, oldCategory);
    this.closeReplacementList();
  }

  public closeReplacementList() {
    this.show = false;
  }

  ngOnDestroy() {
    this._changeDetectRef.detach();
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

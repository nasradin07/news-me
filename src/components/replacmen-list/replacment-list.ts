import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

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
    private _changePageProvider: ChangePageProvider,
    private _changeDetectRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscribeForReplacementCategoriesFetchEvent();
    this.subscribeToOpenReplacementListEvent();
    this.getReplacementCategories();
    this._changeDetectRef.detectChanges()
  }

  public subscribeToOpenReplacementListEvent() {
    this._subscriptions.push(
      this._changePageProvider.toggleReplacementList$.subscribe(
        notification => {
          this.show = notification;
        }
      )
    );
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
    console.log(this.category);
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

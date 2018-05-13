import { Component, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CategoryPage } from '../../pages/category/category';

import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

@Component({
  selector: 'open-category-component',
  templateUrl: './open-category.html'
})

export class OpenCategoryComponent implements OnDestroy{
  @Input() category;
  mousepressed;
  showReplacementList: boolean = false;
  private _subscriptions: Subscription[] = [];
  constructor(
    private _configurationProvider: ConfigurationProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _changePageProvider: ChangePageProvider
  ) {
  }

  public openReplacementList(event, category) {
    this.showReplacementList = false;
    event.preventDefault();
    this.mousepressed = true;
    console.log(category);
    setTimeout(() => {
      if (this.mousepressed === true) {
        this.showReplacementList = true;
        this._configurationProvider.saveCategoryForReplacement(category);
        this._changeDetectRef.detectChanges();
      }
    }, 1000);
  }

  public openPage(pageName) {
    this.mousepressed = false;
    if (this.showReplacementList === true) {
      return;
    } else {
      const params = {
        name: pageName
      };
      this._changePageProvider.changePage(CategoryPage, params);
    }
  }


  public getNewsConfiguration() {
    this._configurationProvider.getClientNewsConfiguration();
  }

  public saveNewsConfiguration(categories) {
    this._configurationProvider.saveClientNewsConfiguration(categories);
  }

  ngOnDestroy() {
    this._changeDetectRef.detach();
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}


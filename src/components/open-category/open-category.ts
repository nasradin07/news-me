import { Component, ChangeDetectorRef, Input,OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CategoryPage } from '../../pages/category/category';

import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

@Component({
  selector: 'open-category-component',
  templateUrl: './open-category.html'
})

export class OpenCategoryComponent implements OnInit, OnDestroy{
  @Input() category;
  mousepressed;
  showReplacementList: boolean = false;
  iconName;
  private _subscriptions: Subscription[] = [];
  constructor(
    private _configurationProvider: ConfigurationProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _changePageProvider: ChangePageProvider
  ) {
  }

  ngOnInit() {
    this.getIconName();
  }

  getIconName() {
    this.iconName = this.category.toLowerCase().replace( /\s/g, '-');
  }

  public openReplacementList(event, category) {
    this.showReplacementList = false;
    event.preventDefault();
    this.mousepressed = true;
    setTimeout(() => {
      if (this.mousepressed === true) {
        this.showReplacementList = true;
        this._configurationProvider.saveCategoryForReplacement(category);
        this._changeDetectRef.detectChanges();
      }
    }, 1000);
  }

  public openPage() {
    this.mousepressed = false;
    if (this.showReplacementList === true) {
      return;
    } else {
      const params = {
        name: this.category
      };
      this._changePageProvider.changePage(CategoryPage, params);
    }
  }


  ngOnDestroy() {
    this._changeDetectRef.detach();
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}


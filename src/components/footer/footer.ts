import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CategoryPage } from '../../pages/category/category';

import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

export class FooterComponent implements OnInit{
  categories;
  mousepressed;
  categoryPickerOpened: boolean;
  private _subscriptions: Subscription[] = [];
  constructor(
    private _configurationProvider: ConfigurationProvider,
    private _changePageProvider: ChangePageProvider
  ) {
  }

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

  public changeCategory(event, category) {
    event.preventDefault();
    this.mousepressed = true;
    setTimeout(() => {
      if (this.mousepressed === true) {
        this.categoryPickerOpened = true;
        this._configurationProvider.saveCategoryForReplacement(category);
      }
    }, 1000);
  }

  public openPage(pageName) {
    this.mousepressed = false;
    if (this.categoryPickerOpened === true) {
      this.categoryPickerOpened = false;
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

}

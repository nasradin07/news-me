import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { ConfigurationProvider } from '../../providers/configuration';
import { ChangePageProvider } from '../../providers/change-page';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

export class FooterComponent implements OnInit{
  allCategories: Array<{name: string, iconName: string}> = [
    { name: 'General News', iconName: 'albums'},
    { name: 'Business News', iconName: 'briefcase'},
    { name: 'Programming News', iconName: 'laptop' },
    { name: 'Sport News', iconName: 'football'},
    { name: 'Entertainment News', iconName: 'easel'},
    { name: 'Cryptocurrency News', iconName: 'cash'},
    { name: 'Lyfestyle News', iconName: 'heart' },
    { name: 'Technology News', iconName: 'phone-portrait' }
  ];
  categories;
  mousepressed;
  constructor(
    private _configurationProvider: ConfigurationProvider,
    private _changeDetectRef: ChangeDetectorRef,
    private _changePage: ChangePageProvider
  ) {
  }

  ngOnInit(){
    this.getNewsConfiguration();
  }

  public changeCategory(event, categoryName) {
    event.preventDefault();
    this.mousepressed = !this.mousepressed;
    if (this.mousepressed === true) {
      console.log('Runngin set')
      setTimeout(() => {
        if (this.mousepressed === true) {
        }
      }, 2000);
    } else {
      this.openPage(categoryName);
    }
  }

  public replaceCategory(data, oldCategoryName) {
    let newCategory = data[0];
    this._configurationProvider.getClientNewsConfiguration()
      .then(newsConfiguration => {
        let indexOfOldCategory = newsConfiguration.findIndex(category => oldCategoryName === category.name);
        console.log(indexOfOldCategory);
        newsConfiguration[indexOfOldCategory] = newCategory;
        this.categories = newsConfiguration;
        this._configurationProvider.saveClientNewsConfiguration(newsConfiguration);
        this._changeDetectRef.detectChanges();
    });
  }


  public getNewsConfiguration() {
    this._configurationProvider.getClientNewsConfiguration()
      .then(categories => {
        console.log(categories);
        if (categories !== null) {
        this.categories = categories
        } else {
           this.categories = this.allCategories.slice(0,5);
           this.saveNewsConfiguration(this.categories);
        }
      });
  }

  public getNotUsedCategories() {
      return this.allCategories.filter(category => {
        return !this.categories.find(usedCategory => category.name === usedCategory.name);
      });
  }

  public saveNewsConfiguration(categories) {
    this._configurationProvider.saveClientNewsConfiguration(categories);
  }

  public openPage(pageName) {
    this.mousepressed = false;
    this._changePage.changePage
   /* this.navCtrl.push(CategoryPage, {
      name: pageName
    });*/
  }

}

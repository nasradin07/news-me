import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { LeftMenuProvider } from '../../providers/left-menu';
import { LikeProvider } from '../../providers/like';
import { ChangePageProvider } from '../../providers/change-page';
import { NewsProvider } from '../../providers/news'

@Component({
  selector: 'page-single-article',
  templateUrl: 'single-article.html',
})
export class SingleArticlePage {
  article: any;
  date: any;
  indexInCategoryArray;
  categoryName;
  sourceName;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _leftMenuProvider: LeftMenuProvider,
    private _likeProvider: LikeProvider,
    private _newsProvider: NewsProvider,
    private _changePageProvider: ChangePageProvider,
    private _menuCtrl: MenuController,
    private _inAppBrowser: InAppBrowser
  ) {
    this.article = this.navParams.get('article');
    this.indexInCategoryArray = this.navParams.get('index');
    this.categoryName = this.navParams.get('parentCategory');
    this.sourceName = this.navParams.get('sourceName');
  }

  ionViewDidLoad() {
    this.date = (new Date(this.article.publishedAt)).toDateString();
    const source = this.article.source;
    this.notifyLeftMenuToShowNewsForSource(source);
  }

  public loadNewArticle(event) {
    event.preventDefault();
    let indexForNextArticle = this.getIndexForNewArticle(event);
    const article = this.getArticle(indexForNextArticle);
    if (article === false) {
      this.openMenu(event);
    } else {
       const params = {
        article: article,
        index: indexForNextArticle,
        parentCategory: this.categoryName,
        sourceName: this.sourceName
      };
      this.navCtrl.push(SingleArticlePage, params);
    }
  }

  public getIndexForNewArticle(event) {
    if (Math.abs(event.overallVelocityX) < 0.3 ) return;
    if (this.indexInCategoryArray === undefined) {
      return -1;
    }
    if (event.deltaX < -100) {
      return this.indexInCategoryArray + 1;
    } else if (event.deltaX > 100) {
      return this.indexInCategoryArray -1;
    }
  }

  public getArticle(indexForNextArticle) {
    if (this.categoryName !== undefined) {
      let mutateName = this.mutateName(this.categoryName);
      return this._newsProvider.getArticleByCategoryNameAndIndex(mutateName, indexForNextArticle);;
    } else if (this.sourceName !== undefined) {
      return this._newsProvider.getArticleBySourceNameAndIndex(this.sourceName, indexForNextArticle);
    } else {
      return false;
    }
  }

  public openMenu(event) {
    if (event.deltaX > 0) {
      this._menuCtrl.open('left');
    } else if(event.deltaX < 0) {
      this._menuCtrl.open('right');
    }
  }

  public mutateName(categoryName) {
    return categoryName.replace(/\s/g, '-').toLowerCase();
  }

  public notifyLeftMenuToShowNewsForSource(source) {
    this._leftMenuProvider.notifyLeftMenuToShowNewsForSource(source);
  }

  public goToSource() {
    const browser = this._inAppBrowser.create(this.article.url, '_self');
    browser.show();
  }

  public like(newsId) {
    this._likeProvider.like(newsId);
  }

  public dislike() {
    console.log('dislike');
  }

  public closeReplacementList() {
    this._changePageProvider.closeReplacementList();
  }

}

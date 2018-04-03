import { Component, Input } from '@angular/core';

import { ChangePageProvider } from '../../providers/change-page';
import { UserProvider } from '../../providers/user';
import { StorageProvider } from '../../providers/storage';
import { SingleArticlePage } from '../../pages/single-article/single-article';


@Component({
  selector: 'news-component',
  templateUrl: 'news.html'
})
export class NewsComponent {
  @Input() news;
  constructor(
    private _changePageProvider: ChangePageProvider,
    private _userProvider: UserProvider,
    private _storageProvider: StorageProvider
  ) {
  }

  public showArticle() {
    const params = {
      article: this.news
    };
    this.addArticleToVisitedNews(this.news._id);
    this._changePageProvider.changePage(SingleArticlePage, params);
  }

  public addArticleToVisitedNews(newsId) {
    if (this._userProvider.isUserLoggedIn() === false) {
      this._storageProvider.addToVisitedNews(newsId);
    } else {
      this._userProvider.addArticleToVisitedNews(newsId);
    }
  }

}

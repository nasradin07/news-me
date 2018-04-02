import { Component, Input } from '@angular/core';

import { ChangePageProvider } from '../../providers/change-page/change-page';

import { SingleArticlePage } from '../../pages/single-article/single-article';

@Component({
  selector: 'news-component',
  templateUrl: 'news.html'
})
export class NewsComponent {
  @Input() news;
  constructor(
    private _changePageProvider: ChangePageProvider
  ) {
  }

  public showArticle() {
    const params = {
      article: this.news
    };
   this._changePageProvider.changePage(SingleArticlePage, params);
  }

}

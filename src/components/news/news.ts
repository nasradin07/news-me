import { Component, Input } from '@angular/core';

@Component({
  selector: 'news-component',
  templateUrl: 'news.html'
})
export class NewsComponent {
  @Input() news;
  constructor() {
  }

  public goToSource(href) {
   window.location.href =  href;
  }

}

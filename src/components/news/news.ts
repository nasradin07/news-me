import { Component, Input } from '@angular/core';

/**
 * Generated class for the NewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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

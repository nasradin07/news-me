import { Injectable } from '@angular/core';

@Injectable() 
export class PagesProvider {

    constructor() {}

    public showNews(newsInCategory, numOfPage) {
      let newsInPage;
      let start = (numOfPage-1)*15, end = start + 15;
      if (end > newsInCategory.length) {
        newsInPage =  newsInCategory.slice(start);
      } else {
        newsInPage =  newsInCategory.slice(start, end);
      }
      return newsInPage;
    }

    public getNumberOfPages(length) {
        let numOfPages = Math.floor(length/15);
        let remainder = length % 15;
        if (remainder > 0) {
          numOfPages += 1;
        }
        return this._fillPages(numOfPages);
      }
    
      private _fillPages(numOfPages) {
          let pages = [];
        for (let i = 1; i <= numOfPages; i++) {
          pages.push(i);
        }
        return pages;
      }
}
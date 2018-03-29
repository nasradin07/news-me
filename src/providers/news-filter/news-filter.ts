import { Injectable } from '@angular/core';

@Injectable()
export class NewsFilterProvider {
  newsBySource: any;
  sources: any;
  constructor() {
    
  }

  public filterBySource(allNews) {
    const sources = {};
    allNews.forEach(news => {
      const newsSource = news.source;
      if (sources[newsSource] === undefined) {
        sources[newsSource] = [];
        sources[newsSource].push(news);
      } else {
        sources[newsSource].push(news);
      }
    });
    return sources;
  }

}

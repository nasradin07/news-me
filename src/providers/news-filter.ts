import { Injectable } from '@angular/core';

@Injectable()
export class NewsFilterProvider {
  newsBySource: any;
  sources: any;
  constructor(
    
  ) { }

  public filterBySource(allNews, sources) {
    allNews.forEach((news) => {
      const newsId = news._id;
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

  public filterAllNewsBySources(allNews) {
    const sources = {};
    Object.keys(allNews).forEach(newsCategory => {
      this.filterBySource(allNews[newsCategory], sources);
    });
    return sources;
  }

  public filterNewsFromCache(news, displayedNews) {
    let filteredNews = news.filter(article => {
      return !displayedNews.find(displayedArticle => article._id === displayedArticle._id);
    });
    return filteredNews;
  }

 

}

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
   // console.log(allNews);
    allNews.forEach(a => {
     // console.log(a);
    //  console.log(newsByCategory.news);
      //this.filterBySource(newsByCategory.news, sources);
    });
    return sources;
  }

 

}

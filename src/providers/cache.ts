import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';

import { NewsFilterProvider } from './news-filter';

@Injectable()
export class CacheProvider {
  _key = 'http://api-news-me.ml/public/today-news?client=mobile'; 
    constructor(
        private _cache: CacheService,
        private _newsFilterProvider: NewsFilterProvider
    ) {}

    public cacheRequest(key, request) {
        return this._cache.loadFromObservable(key, request);
    }

    public setDefaultTTP(time) {
        this._cache.setDefaultTTL(time);
    }

    public saveInCache(key, allNews) {
        return this._cache.saveItem(key, allNews);
    }
    
    public getNewsFromCache(key) {
        return this._cache.getItem(key);
    }

    public getInitialConfigurationFromCache(key) {
        return this._cache.getItem(key);
    }
    
    public removeNewsFromCache(displayedNews, categoryName?) {
        let key = this._key;
        this.getNewsFromCache(key).then(clienConfiguration => {
            let newsInCache = clienConfiguration.newsCategories;
            if (categoryName !== undefined) {
                let categoryIndex = newsInCache.findIndex(newsInCategory => {
                    return newsInCategory.categoryName === categoryName;
                });
                let filteredNews = this.filterCategory(displayedNews, newsInCache[categoryIndex]);
                newsInCache[categoryIndex].news = filteredNews;
                clienConfiguration.newsCategories = newsInCache;
            } else  {
                let filteredNews = [];
                newsInCache.forEach(category => {
                    let news = this.filterCategory(displayedNews, category);
                    filteredNews.push({
                        categoryName: category.categoryName,
                        news: news
                    });
                });
                clienConfiguration.newsCategories = filteredNews;
            }
            this.saveInCache(key, clienConfiguration);
        });
    }


    public filterCategory(displayedNews, newsInCategory) {
        return this._newsFilterProvider.filterNewsFromCache(newsInCategory.news, displayedNews);
    }

    public clearCache() {
        this._cache.clearAll();
    }
}
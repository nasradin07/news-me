import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';

import { NewsFilterProvider } from './news-filter';

@Injectable()
export class CacheProvider {

    constructor(
        private _cache: CacheService,
        private _newsFilterProvider: NewsFilterProvider
    ) {}

    public cacheRequest(key, request) {
        return this._cache.loadFromDelayedObservable(key, request);
    }

    public saveNewsToCache(key, allNews) {
        this._cache.saveItem(key, allNews);
    }
    
    public getNewsFromCache(key) {
    return this._cache.getItem(key);
    }
    
    public removeNewsFromCache(key, displayedNews, categoryName) {
        console.log('called');
        this.getNewsFromCache(key).then(newsInCache => {
            console.log(categoryName);
            console.log(newsInCache);
       // let filteredNews =  this._newsFilterProvider
         //   .filterDisplayedNews(newsInCache[categoryName].news, displayedNews);
        });
    }

    public clearCache() {
        this._cache.clearAll();
    }
}
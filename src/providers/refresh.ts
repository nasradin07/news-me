import { Injectable } from '@angular/core';

import { SpinnerPage } from '../pages/spinner/spinner';

import { ChangePageProvider } from './change-page';
import { InitialConfigurationProvider } from './initial-configuration';

@Injectable()
export class RefreshProvider{

    constructor(
        private _changePageProvider: ChangePageProvider,
        private _initialConfigurationProvider: InitialConfigurationProvider
    ) {}

    public refreshApp() {
        this._changePageProvider.changePage(SpinnerPage);
        this._initialConfigurationProvider.getInitialConfiguration();
    }
}
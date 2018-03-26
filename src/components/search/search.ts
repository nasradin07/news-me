import { Component } from '@angular/core';


@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {

  searchTerm: string;

  constructor() {
  }

  handleInput(event) {
    console.log('Handling input');
  }

}

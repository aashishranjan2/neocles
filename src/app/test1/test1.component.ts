import {Component, OnInit} from '@angular/core';
import * as randomWords from 'random-words';

export interface IEntry {
  id: number;
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  data: IEntry[];
  page = 1;
  pageSize = 20;
  emptyArray = new Array(1000);

  filteredData: IEntry[];
  previous = false;
  constructor() {
  }

  ngOnInit() {

    this.data = [];

   
    for (let i = 0; i < 10000; i++) {
      this.data.push({
        id: i,
        name: randomWords({exactly: 3, join: ' '}),
        description: randomWords({exactly: 100, join: ' '}),
        status: ['new', 'submitted', 'failed'][Math.floor(Math.random() * 3)]
      });
    }
    this.filteredData = this.data;
    this.populateFilteredData('');

  }

  populateFilteredData(filter) {
    this.filteredData = [];
    let filterArr = filter.split(' ');
   filterArr.map ((filter) => {

    const filteredTempData = this.data.filter((entry) => {
          return (entry.name.indexOf(filter) !== -1 || entry.description.indexOf(filter) !== -1 || entry.status.indexOf(filter) !== -1);
           
        });
        this.filteredData = this.filteredData.concat(filteredTempData);
      }) 
  }

  updateFilter($event: KeyboardEvent) {
    this.populateFilteredData(($event.target as HTMLInputElement).value);
  }

  showNext() {
    this.page++;

    this.previous = this.page === 1 ? false: true;
  }
  showPrevious() {
    this.page--;
    this.previous = this.page === 1 ? false: true;
  }
}

import { Injectable } from '@angular/core';
import { DataService } from '../app/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  data;
  public showingBookmarked = false;
  public sortedByAscending = false;

  constructor(private dataService: DataService, private router: Router) {
    this.data = this.dataService.sampleData;
    console.log('Reading local json files');
    console.log(dataService.sampleData);
  }

  viewApplication(application) {
    this.dataService.applicationDetail = application;
    this.router.navigate(['/application-detail']);
  }

  bookmarkApplication(application) {
    application.bookmarked = !application.bookmarked;
    localStorage.setItem('inMemoryDB', JSON.stringify(this.dataService.sampleData));
    console.log(localStorage.getItem('inMemoryDB'));
  }

  filterBookmarkedApplications() {
    if (this.showingBookmarked) {
      this.data = this.dataService.sampleData;
    } else {
      this.data = this.data.filter((application) => {
        return application.bookmarked === true;
      });
    }
    this.showingBookmarked = !this.showingBookmarked;
  }

  sortByDate() {
    if (this.sortedByAscending === false) {
      this.data.sort(function (a, b) {
        a = new Date(a.applied);
        b = new Date(b.applied);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    } else {
      this.data.sort(function (a, b) {
        a = new Date(a.applied);
        b = new Date(b.applied);
        return a > b ? 1 : a < b ? -1 : 0;
      });
    }
    this.sortedByAscending = !this.sortedByAscending;
  }

}

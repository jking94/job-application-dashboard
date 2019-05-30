import { Injectable } from '@angular/core';
import { DataService } from '../app/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  positions;
  data;
  public showingBookmarked = false;
  public sortedByDateAscending = true;
  public sortedByExpAscending = false;

  constructor(private dataService: DataService, private router: Router) {
    this.positions = this.dataService.positions;
    this.data = this.dataService.sampleData;
  }

  viewApplication(application) {
    this.dataService.applicationDetail = application;
    this.router.navigate(['/application-detail']);
  }

  bookmarkApplication(application) {
    application.bookmarked = !application.bookmarked;
    localStorage.setItem('inMemoryDB', JSON.stringify(this.dataService.sampleData));
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
    if (this.sortedByDateAscending === false) {
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
    this.sortedByDateAscending = !this.sortedByDateAscending;
  }
  sortByExperience() {
    if (this.sortedByExpAscending === false) {
      this.data.sort(function (a, b) {
        a = a.experience;
        b = b.experience;
        return a > b ? -1 : a < b ? 1 : 0;
      });
    } else {
      this.data.sort(function (a, b) {
        a = a.experience;
        b = b.experience;
        return a > b ? 1 : a < b ? -1 : 0;
      });
    }
    this.sortedByExpAscending = !this.sortedByExpAscending;
  }

}

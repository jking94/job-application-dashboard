import { Injectable } from '@angular/core';
import { DataService } from '../app/data.service';
import { Router } from '@angular/router';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  hoursWanted = 0;
  experience = 0;
  day = '';
  name = '';
  positions: Array<any>;
  data: Array<any>;
  dataFromServer: Array<any>;
  selectedPosition: string;
  showingBookmarked = false;
  sortedByDateAscending = false;
  // sortedByExpAscending = false;
  sortByDay = false;

  constructor(private dataService: DataService, private router: Router) {
    this.positions = this.dataService.positions;
    this.data = this.dataService.sampleData;
    this.dataFromServer = this.dataService.sampleData;
  }
  // Applies filters to job applications
  applyFilters() {

    // Filters job applications based on bookmarked status
    this.data = this.dataFromServer;
    if (!this.showingBookmarked) {
    } else {
      this.data = this.dataFromServer.filter((application) => {
        return application.bookmarked === true;
      });
    }

    // Filters job applications based on name
    this.data = this.data.filter((application) => {
      return application.name.toLowerCase().includes(this.name.toLowerCase());
    });

    // Filters job applications by position
    if (this.selectedPosition === undefined) {
      this.data = this.data;
    } else {
      this.data = this.data.filter((application) => {
        return application.position === this.selectedPosition;
      });
    }

    // Filters job applications by experience
    this.data = this.data.filter((application) => {
      return parseInt(application.experience) >= this.experience;
    });

    // Filters job applications by Day/Hours Available for that Day
    this.data = this.data.filter((application) => {
      if (this.day !== '') {
        return application.availability[this.day] >= this.hoursWanted && application.availability[this.day] !== 0;
      } else {
        return application;
      }
    });

  }

  toggleDayRadioGroup() {
    this.sortByDay = !this.sortByDay;
    this.day = '';
    this.hoursWanted = 0;
    this.applyFilters();
  }

  viewApplication(application) {
    this.dataService.applicationDetail = application;
    this.router.navigate(['/application-detail']);
  }

  bookmarkApplication(application) {
    application.bookmarked = !application.bookmarked;
    localStorage.setItem('inMemoryDB', JSON.stringify(this.dataFromServer));
    this.applyFilters();
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

  // sortByExperience() {
  //   if (this.sortedByExpAscending === false) {
  //     this.data.sort(function (a, b) {
  //       a = a.experience;
  //       b = b.experience;
  //       return a > b ? -1 : a < b ? 1 : 0;
  //     });
  //   } else {
  //     this.data.sort(function (a, b) {
  //       a = a.experience;
  //       b = b.experience;
  //       return a > b ? 1 : a < b ? -1 : 0;
  //     });
  //   }
  //   this.sortedByExpAscending = !this.sortedByExpAscending;
  // }

}
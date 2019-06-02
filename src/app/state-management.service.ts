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
  sortByDay = false;

  constructor(private dataService: DataService, private router: Router) {
    this.positions = this.dataService.positions;
    this.data = this.dataService.sampleData;
    this.dataFromServer = this.dataService.sampleData;
  }

  applyFilters() {
    this.filterByBookmarkedStatus();
    this.filterByName();
    this.filterByPosition();
    this.filterByExperience();
    this.filterByDaysAndHoursAvailable();
  }

  filterByBookmarkedStatus() {
    this.data = this.dataFromServer;
    if (this.showingBookmarked) {
      this.data = this.dataFromServer.filter((application) => {
        return application.bookmarked === true;
      });
    }
  }

  filterByName() {
    this.data = this.data.filter((application) => {
      return application.name.toLowerCase().includes(this.name.toLowerCase());
    });
  }

  filterByPosition() {
    if (this.selectedPosition !== undefined) {
      this.data = this.data.filter((application) => {
        return application.position === this.selectedPosition;
      });
    }
  }

  filterByExperience() {
    this.data = this.data.filter((application) => {
      return parseInt(application.experience) >= this.experience;
    });
  }

  filterByDaysAndHoursAvailable() {
    if (this.day !== '') {
      this.data = this.data.filter((application) => {
        return application.availability[this.day] >= this.hoursWanted && application.availability[this.day] !== 0;
      });
    }

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
    this.data.sort((a, b) => {
      a = new Date(a.applied);
      b = new Date(b.applied);
      if (this.sortedByDateAscending === false) {
        return a > b ? -1 : a < b ? 1 : 0;
      } else {
        return a > b ? 1 : a < b ? -1 : 0;
      }
    });
    this.sortedByDateAscending = !this.sortedByDateAscending;
  }

}

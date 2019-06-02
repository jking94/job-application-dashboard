import { Injectable } from '@angular/core';
import { DataService } from '../app/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  hoursWanted = 0;
  experience = 0;
  day = '';
  name = '';
  positions: Array<any>;
  jobApplications: Array<any>;
  selectedPosition: string;
  showingBookmarked = false;
  sortedByDateAscending = false;
  sortByDay = false;

  constructor(private dataService: DataService, private router: Router) {
    this.positions = this.dataService.positions;
    this.jobApplications = this.dataService.sampleData;
  }
  // Filter functions
  applyFilters() {
    this.jobApplications = this.dataService.sampleData;
    this.filterByBookmarkedStatus();
    this.filterByName();
    this.filterByPosition();
    this.filterByExperience();
    this.filterByDaysAndHoursAvailable();
  }

  filterByBookmarkedStatus() {
    if (this.showingBookmarked) {
      this.jobApplications = this.dataService.sampleData.filter((application) => {
        return application.bookmarked === true;
      });
    }
  }

  filterByName() {
    this.jobApplications = this.jobApplications.filter((application) => {
      return application.name.toLowerCase().includes(this.name.toLowerCase());
    });
  }

  filterByPosition() {
    if (this.selectedPosition !== undefined) {
      this.jobApplications = this.jobApplications.filter((application) => {
        return application.position === this.selectedPosition;
      });
    }
  }

  filterByExperience() {
    this.jobApplications = this.jobApplications.filter((application) => {
      return parseInt(application.experience) >= this.experience;
    });
  }

  filterByDaysAndHoursAvailable() {
    if (this.day !== '') {
      this.jobApplications = this.jobApplications.filter((application) => {
        return application.availability[this.day] >= this.hoursWanted && application.availability[this.day] !== 0;
      });
    }
  }

  // Non-Filter Functions
  filterBookmarkedApplications() {
    this.showingBookmarked = !this.showingBookmarked;
    this.applyFilters();
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
    localStorage.setItem('inMemoryDB', JSON.stringify(this.dataService.sampleData));
    this.applyFilters();
  }

  sortByDate() {
    this.jobApplications.sort((a, b) => {
      a = new Date(a.applied);
      b = new Date(b.applied);
      if (!this.sortedByDateAscending) {
        return a > b ? -1 : a < b ? 1 : 0;
      } else {
        return a > b ? 1 : a < b ? -1 : 0;
      }
    });
    this.sortedByDateAscending = !this.sortedByDateAscending;
  }

}

import { Injectable } from '@angular/core';
import { DataService } from '../app/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  sortByDay = false;
  hoursWanted;
  day;
  name;
  positions;
  data;
  dataFromServer;
  selectedPosition;
  experience;
  public showingBookmarked = false;
  public sortedByDateAscending = true;
  public sortedByExpAscending = false;

  constructor(private dataService: DataService, private router: Router) {
    this.positions = this.dataService.positions;
    this.data = this.dataService.sampleData;
    this.dataFromServer = this.dataService.sampleData;
  }

  toggleDayRadioGroup() {
    this.sortByDay = !this.sortByDay;
    this.day = "";
    console.log(this.sortByDay);
  }

  viewApplication(application) {
    this.dataService.applicationDetail = application;
    this.router.navigate(['/application-detail']);
  }

  bookmarkApplication(application) {
    application.bookmarked = !application.bookmarked;
    localStorage.setItem('inMemoryDB', JSON.stringify(this.dataFromServer));
  }

  filterBookmarkedApplications() {
    if (this.showingBookmarked) {
      this.data = this.dataFromServer;
    } else {
      this.data = this.dataFromServer.filter((application) => {
        return application.bookmarked === true;
      });
    }
    this.showingBookmarked = !this.showingBookmarked;
  }

  filterByPosition() {
    this.data = this.dataService.sampleData;
    if (this.selectedPosition === undefined) {
      this.data = this.dataService.sampleData;
    } else {
      this.data = this.dataFromServer.filter((application) => {
        return application.position === this.selectedPosition;
      });
    }
  }

  filterByName() {
    this.data = this.dataFromServer.filter((application) => {
      return application.name.toLowerCase().includes(this.name.toLowerCase());
    });
  }

  filterByExperience() {
    this.data = this.dataFromServer.filter((application) => {
      return parseInt(application.experience) >= this.experience;
    });

  }
  filterByDay() {
    console.log(this.hoursWanted);
    this.data = this.dataFromServer.filter((application) => {
      if (this.hoursWanted > 0) {
        return application.availability[this.day] >= this.hoursWanted;
      } else {
        return application.availability[this.day] > 0;
      }

    });
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

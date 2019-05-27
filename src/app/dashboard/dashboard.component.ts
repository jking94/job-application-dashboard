import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data;
  public showingBookmarked = false;

  constructor(public dataService: DataService, private router: Router) {
    this.data = this.dataService.sampleData;
    console.log('Reading local json files');
    console.log(dataService.sampleData);
  }

  ngOnInit() {
  }

  viewApplication(application) {
    this.dataService.applicationDetail = application;
    this.router.navigate(['/application-detail']);
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

}

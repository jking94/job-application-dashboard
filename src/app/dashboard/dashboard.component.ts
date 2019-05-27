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
    this.data = this.data.filter((application) => {
      return application.bookmarked === true;
    });
  }

}

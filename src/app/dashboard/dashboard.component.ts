import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data = this.dataService.sampleData;

  constructor(public dataService: DataService, private router: Router) {
    console.log('Reading local json files');
    console.log(dataService.sampleData);
  }

  ngOnInit() {
  }

  viewApplication(application) {
    this.dataService.applicationDetail = application;
    this.router.navigate(['/application-detail']);
  }

}

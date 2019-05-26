import { Component, OnInit } from '@angular/core';
import data from '../../sampleData/data.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
    console.log('Reading local json files');
    console.log(data);
  }

  ngOnInit() {
  }

}

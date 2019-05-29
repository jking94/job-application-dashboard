import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../state-management.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public stateManagement: StateManagementService) { }

  ngOnInit() {
  }

}

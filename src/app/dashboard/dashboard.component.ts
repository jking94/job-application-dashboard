import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(public stateManagement: StateManagementService) { }

  ngOnInit() {
    this.stateManagement.applyFilters();
  }

  formatLabel(value: number | null) {
    if (!value) { return 0; }
    return value;
  }

  filterBookmarkedApplications() {
    this.stateManagement.showingBookmarked = !this.stateManagement.showingBookmarked;
    this.stateManagement.applyFilters();
  }

}

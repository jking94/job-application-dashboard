import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

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

  filterBookmarkedApplications() {
    this.stateManagement.showingBookmarked = !this.stateManagement.showingBookmarked;
    this.stateManagement.applyFilters();
  }

}

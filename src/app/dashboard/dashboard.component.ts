import { Component, OnInit } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public stateManagement: StateManagementService) {
  }

  ngOnInit() {
  }

}

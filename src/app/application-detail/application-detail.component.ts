import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  application = this.dataService.applicationDetail;

  constructor(public dataService: DataService, private router: Router) {
    console.log(this.application);
    if (this.application === undefined) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }

}

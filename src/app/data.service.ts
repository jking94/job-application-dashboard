import { Injectable } from '@angular/core';
import data from '../sampleData/data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sampleData = data;
  applicationDetail;

  constructor() {
    this.sampleData.map((application) => {
      application['bookmarked'] = false;
    });
  }
}

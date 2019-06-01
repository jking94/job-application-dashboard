import { Injectable } from '@angular/core';
import data from '../sampleData/data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sampleData;
  positions;
  applicationDetail;


  constructor() {

    if (localStorage.getItem('inMemoryDB') === null) {
      localStorage.setItem('inMemoryDB', JSON.stringify(data));
      this.sampleData = JSON.parse(localStorage.getItem('inMemoryDB'));
      this.sampleData.map((application) => {
        application['bookmarked'] = false;
      });
      this.sampleData.forEach((application) => {
        application['schedule'] = [];
        application['schedule'].push(
          {
            Hours: application.availability['M'], displayName: 'Monday'
          },
          {
            Hours: application.availability['T'], displayName: 'Tuesday'
          },
          {
            Hours: application.availability['W'], displayName: 'Wednesday'
          },
          {
            Hours: application.availability['Th'], displayName: 'Thursday'
          },
          {
            Hours: application.availability['F'], displayName: 'Friday'
          },
          {
            Hours: application.availability['S'], displayName: 'Saturday'
          },
          {
            Hours: application.availability['Su'], displayName: 'Sunday'
          },
        );
      });

      this.sampleData.sort(function (a, b) {
        a = new Date(a.applied);
        b = new Date(b.applied);
        return a < b ? -1 : a > b ? 1 : 0;
      });

      localStorage.setItem('inMemoryDB', JSON.stringify(this.sampleData));

    } else {
      this.sampleData = JSON.parse(localStorage.getItem('inMemoryDB'));
    }

    function distinctPositions(value, index, self) {
      return self.indexOf(value) === index;
    }
    const nonDistinctPositions = this.sampleData.map((application) => application.position);
    this.positions = nonDistinctPositions.filter(distinctPositions);

  }
}

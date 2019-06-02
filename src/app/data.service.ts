import { Injectable } from '@angular/core';
import data from '../sampleData/newData.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sampleData;
  positions;
  applicationDetail;

  constructor() {

    if (localStorage.getItem('inMemoryDB') === null) {
      this.sampleData = data;
      this.sampleData.forEach((application) => {
        application['bookmarked'] = false;
      });

      this.transformSchdule();

      this.sampleData.sort(function (a, b) {
        a = new Date(a.applied);
        b = new Date(b.applied);
        return a < b ? -1 : a > b ? 1 : 0;
      });

      localStorage.setItem('inMemoryDB', JSON.stringify(this.sampleData));

    } else {
      this.sampleData = JSON.parse(localStorage.getItem('inMemoryDB'));
    }
    const nonDistinctPositions = this.sampleData.map((application) => application.position);
    this.positions = nonDistinctPositions.filter(this.distinctPositions);

  }

  private distinctPositions(value, index, self) {
    return self.indexOf(value) === index;
  }

  private transformSchdule() {
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
  }
}

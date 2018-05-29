import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { TrainingAttempt } from '../shared/trainingAttempt';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-trainingAttempt',
  templateUrl: './trainingAttempts.component.html',
  styleUrls: ['./trainingAttempts.component.css']
})
export class TrainingAttemptsComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  trainingAttempts = [];
  trainingAttempts2: MatTableDataSource<TrainingAttempt>;

  table_titles = ['createdAt', 'number', 'state', 'question', 'answer', 'user'];



  ngOnInit() {
    // When the component is created, it defines the variables to create the material table
    console.log(this.service.user_type);
    /*
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.companies2 = new MatTableDataSource(this.companies);*/
      this.getTrainingAttemptsByState('wrong');
    /*}
    */
  }

  getTrainingAttemptsByState(state: string) {
    return this.httpService.getTrainingAttemptsByState(state).subscribe(data => this.listTrainingAttempts(data));
  }

  listTrainingAttempts(data) {
    console.log(data);
  }


}

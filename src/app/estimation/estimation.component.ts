import { Component, OnInit } from '@angular/core';
import {GeneralServiceService} from '../general-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../shared/company';
import {BiddingProject} from '../shared/biddingProject';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {
  guess;

  constructor(public service: GeneralServiceService, public router: Router) {
  }

  form() {
    this.guess = new FormGroup({
      cost: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      time: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  estimation_validation(guess) {
    for (let company of this.service.companies) {
      if (this.service.username === company.project_manager_username) {
        for (let project of this.service.projects) {
          if (company.active_project === project.project_id) {
            var current_project = project;
          }
        }
      }
    }
    const max_time = current_project.time + current_project.time * 0.1;
    const min_time = current_project.time - current_project.time * 0.1;
    const max_cost = current_project.cost + current_project.cost * 0.1;
    const min_cost = current_project.cost - current_project.cost * 0.1;

    return (guess.time >= min_time && guess.time <= max_time) && (guess.cost >= min_cost && guess.cost <= max_cost);
  }

  ngOnInit() {
    // if (this.service.user_type === undefined) {
    //  this.router.navigate(['']);
    // }
    if (this.service.user_type === "Team Member") {
      this.router.navigate(['restricted']);
    }
    else {
      this.form();
    }
  }

  onClickSubmit(guess) {
    if(this.estimation_validation(guess)){
      this.router.navigate(['home']);
    }
  }
}

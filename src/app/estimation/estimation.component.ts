import { Component, OnInit } from '@angular/core';
import {GeneralServiceService} from '../general-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../shared/company';
import {BiddingProject} from '../shared/biddingProject';
import {Estimation} from '../shared/estimation';

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

  getProject(username){
    for (let user of this.service.users) {
      if (username === user.username) {
        for (let company of this.service.companies) {
          if (user.company_name === company.name) {
            for(let project of this.service.projects){
              if(company.current_project_name === project.project_name) {
                return project;
              }
            }
          }
        }
      }
    }
  }

  estimation_validation(guess) {
    const current_project = this.getProject(this.service.username);
    const threshold = this.service.parameter[0].threshold;
    const real_time = current_project.time;
    const real_cost = current_project.cost;

    const max_time = real_time + real_time * (threshold / 100);
    const min_time = real_time - real_time * (threshold / 100);
    const max_cost = real_cost + real_cost * (threshold / 100);
    const min_cost = real_cost - real_cost * (threshold / 100);

    return (guess.time >= min_time && guess.time <= max_time) && (guess.cost >= min_cost && guess.cost <= max_cost);
  }

  getCompany(username){
    for (let user of this.service.users) {
      if (username === user.username) {
        for (let company of this.service.companies) {
          if (user.company_name === company.name) {
            return company;
          }
        }
      }
    }
  }

  sendEstimation(guess) {
    const project_name = this.getProject(this.service.username).project_name;
    if (this.service.username !== undefined && project_name !== undefined && guess.time !== undefined && guess.cost !== undefined ) {
      this.service.estimations.push( new Estimation(this.service.username, project_name, guess.cost, guess.time));
    }
  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
     this.router.navigate(['']);
    } else if (this.service.user_type === "Team Member") {
      this.router.navigate(['restricted']);
    } else {
      let userCompany = this.getCompany(this.service.username);
      if(userCompany.resources >= 1) {
        this.form();
      }
      else {
        // TODO : POPUP WARNING ABOUT LACK OF RESOURCES
      }
    }
  }

  onClickSubmit(guess) {
    let userCompany = this.getCompany(this.service.username);
    userCompany.resources -= 1;   // TODO: Make the change to the database when its fully implemented
    this.sendEstimation(guess);   // TODO: Make the change to the database when its fully implemented

    if (this.estimation_validation(guess)) {
      this.router.navigate(['home/users/projectmanager/functions']);
      // TODO: POPUP CONGRATULATING THE USER
    } else {
      // TODO: POPUP WARNING THE USER
    }
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }
}

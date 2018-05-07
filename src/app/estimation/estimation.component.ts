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

    const max_time = current_project.time + current_project.time * 0.1;
    const min_time = current_project.time - current_project.time * 0.1;
    const max_cost = current_project.cost + current_project.cost * 0.1;
    const min_cost = current_project.cost - current_project.cost * 0.1;

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
    userCompany.resources -= 1;
    if (this.estimation_validation(guess)) {
      this.router.navigate(['home/users/projectmanager/functions']);
      // TODO: POPUP CONGRATULATING THE USER
    } else {
      // TODO: POPUP WARNING THE USER
    }
  }

  redirecttopm(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }
}

import { Component, OnInit } from '@angular/core';
import {GeneralServiceService} from '../general-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../shared/company';
import {BiddingProject} from '../shared/biddingProject';
import {Estimation} from '../shared/estimation';
import {HttpService} from '../http.service';
import {User} from "../shared/user";
import {Record} from "../shared/record";
import {InstantProject} from "../shared/instantProject";

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {
  guess;
  incorrect_time = false;
  incorrect_cost = false;
  correct_guess = false;
  can_estimate = true;
  have_resources = true;
  current_company;
  current_project;    // shouldn't be an instant but a bidding project
  threshold;
  max_time;
  min_time;
  max_cost;
  min_cost;

  constructor(public service: GeneralServiceService, public httpService: HttpService, public router: Router) {
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

  fillCompany() {
    this.httpService.getCompanyById(this.service.user.companyId).subscribe(data => {
    this.current_company = data;
    this.fillProject(data);
    });
  }

  fillProject(company) {
    this.httpService.getRecordsByFinishDateAndCompany(null, company.id).subscribe(data => this.findProjectByRecord(data));
  }

  findProjectByRecord(record) {
    this.httpService.getBiddingProjectById(record.project).subscribe(data => {this.current_project = data;
      this.getThreshold();
    });
  }

  getThreshold() {
    this.httpService.getUsersByRole('Game Administrator').subscribe(data => {
      const data2 = JSON.parse(JSON.stringify(data));
      this.threshold = data2[0].threshold;
      this.max_time = this.current_project.time + this.current_project.time * this.threshold;
      this.min_time = this.current_project.time - this.current_project.time * this.threshold;
      this.max_cost = this.current_project.cost + this.current_project.cost * this.threshold;
      this.min_cost = this.current_project.cost - this.current_project.cost * this.threshold;
      console.log(this.current_project);
      console.log(this.current_company);
    });
  }

  validate_time(guess) {
    return (guess.time >= this.min_time && guess.time <= this.max_time);
  }

  validate_cost(guess) {
    return (guess.cost >= this.min_cost && guess.cost <= this.max_cost);
  }

  sendEstimation(guess) {
    const project_name = this.current_project.project_name;
    if (this.service.username !== undefined && project_name !== undefined && guess.time !== undefined && guess.cost !== undefined ) {
      // this.service.estimations.push( new Estimation(this.service.username, project_name, guess.cost, guess.time));
    }
  }

  haveResources() {
    if (this.current_company !== undefined) {
      return this.current_company.companyResource > 0;
    }
  }
  ngOnInit() {
    if (this.service.user_type === undefined) {
     this.router.navigate(['']);
    }
    else if (this.service.user_type === "Team Member") {
        this.router.navigate(['restricted']);
    }
    else {
      this.fillCompany();
      let has_company = true;
      let has_enough_resources = true;
      let has_bidding_project = true;

      has_company = (this.current_company !== undefined);
      if(has_company){
        has_enough_resources = (this.current_company.companyResource >= 1);
      }
      has_bidding_project = this.current_project instanceof BiddingProject;

      if (has_company && has_enough_resources && has_bidding_project){
          this.form();
      }
      else {
        this.can_estimate = false;
      }
    }
  }

  onClickSubmit(guess) {
    //TODO: Renovar la compañia con cada click
    //TODO: Primero enviar la solicitud a la bd y luego cambio el recurso en el objeto a mano
    this.fillCompany();
    const newCompany = { companyResource : this.current_company.companyResource - 1 };
    this.httpService.updateCompany(newCompany, this.service.user.companyId);
    this.correct_guess = false;
    this.incorrect_time = false;
    this.incorrect_cost = false;
    this.sendEstimation(guess);   // TODO: Make the change to the database when its fully implemented

    this.incorrect_time = !this.validate_time(guess);
    this.incorrect_cost = !this.validate_cost(guess);

    this.correct_guess = !(this.incorrect_time || this.incorrect_cost);
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }
}

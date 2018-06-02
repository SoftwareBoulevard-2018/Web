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
  load_complete = false;
  current_company;
  current_project;    // shouldn't be an instant but a bidding project
  threshold;
  max_time;
  min_time;
  max_cost;
  min_cost;
  has_bidding_project = true;
  no_longer_has_enough_resources = false;

  constructor(public service: GeneralServiceService, public httpService: HttpService, public router: Router) {
  }

  //validation and control functions
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

  //fill date of the company from de database
  fillCompany() {
    this.httpService.getCompanyById(this.service.user.companyId).subscribe(data => {
    this.current_company = data;
    this.fillProject(data);
    },
      error => {  this.current_company = undefined;
                        this.load_complete = true;
                        this.can_estimate = false;
    });
  }

  //fill date of the project from de database
  fillProject(company) {
    this.httpService.getRecordsByFinishDateAndCompany(null, company.id).subscribe(data => this.findProjectByRecord(data),
      error => {  this.current_project = undefined;
        this.load_complete = true;
        this.can_estimate = false;
    });
  }

  //function that searches for a project id and brings it from the database
  findProjectByRecord(record) {
    this.httpService.getBiddingProjectById(record.project).subscribe(data => {this.current_project = data;
      this.getThreshold();
    }, error => {  this.current_project = undefined;
      this.load_complete = true;
      this.can_estimate = false;
    });
  }

  //function that searches for a user rol and bring it threshold from the database
  getThreshold() {
      this.httpService.getUsersByRole('Game Administrator').subscribe(data => {
      const data2 = JSON.parse(JSON.stringify(data));
      this.threshold = data2[0].threshold;
      this.max_time = this.current_project.time + this.current_project.time * this.threshold;
      this.min_time = this.current_project.time - this.current_project.time * this.threshold;
      this.max_cost = this.current_project.cost + this.current_project.cost * this.threshold;
      this.min_cost = this.current_project.cost - this.current_project.cost * this.threshold;

      let has_company = true;
      let has_enough_resources = true;

      has_company = (this.service.user.companyId !== null || this.service.user.companyId !== undefined);
      if(has_company){
        has_enough_resources = (this.current_company.companyResource >= 1);
      }

      this.has_bidding_project = (this.max_time >= 0);
      this.enoughResources();
      this.load_complete = true;
      this.can_estimate = has_company && has_enough_resources && this.has_bidding_project;
    }, error => {

      });
  }

  //function compare the real time and the estimate time
  validate_time(guess) {
    return (guess.time >= this.min_time && guess.time <= this.max_time);
  }

  //function compare the real cost and the estimate cost
  validate_cost(guess) {
    return (guess.cost >= this.min_cost && guess.cost <= this.max_cost);
  }

  //modify and send the estimation to the database
  sendEstimation(guess) {
    this.httpService.getEstimationByPMAndProject(this.service.user.username,this.current_project.name).subscribe(est => {
      let new_attempt_number;
      if (est.length !== 0) {
        new_attempt_number = est[est.length - 1].attemptNumber + 1;
      }
      else {
        new_attempt_number = 1;
      }
      const newEstimation = new Estimation(new_attempt_number, this.service.user.username, this.current_project.name, guess.time, guess.cost, this.correct_guess);
      this.httpService.createEstimation(newEstimation).subscribe(data2 => {});
    }, error => {

    });
  }

  //check if the company have resources to estimate project
  enoughResources() {
    if (this.current_company !== undefined) {
      this.have_resources = this.current_company.companyResource > 0;
    }
  }

  //main operation
  ngOnInit() {
    this.form();
    if (this.service.user_type === undefined) {
     this.router.navigate(['']);
    }
    else if (this.service.user_type === "Team Member") {
        this.router.navigate(['restricted']);
    }
    else {
      this.fillCompany();
    }
  }

  //validate button operation, check if the estimate are correct
  onClickSubmit(guess) {

    this.correct_guess = false;
    this.incorrect_time = false;
    this.incorrect_cost = false;

    this.incorrect_time = !this.validate_time(guess);
    this.incorrect_cost = !this.validate_cost(guess);

    this.correct_guess = !(this.incorrect_time || this.incorrect_cost);
    let newResource = this.current_company.companyResource - 1;
    if(this.current_company.companyResource <= 0){
      this.no_longer_has_enough_resources = true;
    }
    else{
      this.current_company.companyResource -= 1;
      const newCompany = { companyResource: newResource };
      this.httpService.updateCompany(newCompany, this.service.user.companyId).subscribe( data => {},
          error => {});
      this.sendEstimation(guess);
    }

  }

  //exit button operation
  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }
}

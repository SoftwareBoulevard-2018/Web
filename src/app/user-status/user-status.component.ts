import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  current_company;
  performance: number;
  color = 'primary';
  mode = 'determinate';
  right_estimations = 0;
  wrong_estimations = 0;

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    this.current_company = this.search_company(this.service.user_to_be_updated.company_name);
    if (this.service.user_to_be_updated.role === 'Developer' || this.service.user_to_be_updated.role === 'Tester'
    || this.service.user_to_be_updated.role === 'Analyst') {
      if ((this.service.user_to_be_updated.questions_answered_wrong + this.service.user_to_be_updated.questions_answered_right) !== 0) {
        this.performance = (this.service.user_to_be_updated.questions_answered_right /
          (this.service.user_to_be_updated.questions_answered_wrong + this.service.user_to_be_updated.questions_answered_right)) * 100;
      } else {
        this.performance = 0;
      }
    } else {
      this.define_estimations();
      if ((this.right_estimations + this.wrong_estimations) !== 0) {
        this.performance = (this.right_estimations /
          (this.wrong_estimations + this.right_estimations)) * 100;
      } else {
        this.performance = 0;
      }
    }
  }
  redirect(event) {
    this.router.navigate(['home/users/user-status/update']);
  }
  redirect2(event) {
    this.service.company_to_be_updated = this.current_company;
    this.router.navigate(['home/companies/company-status']);
  }
  date_formatter(date?: Date) {
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  }
  search_company (company_name) {
    for (const company of this.service.companies) {
      if (company.name === company_name) {
        return company;
      }
    }
  }
  search_project (project_name) {
    for (const project of this.service.projects) {
      if (project.project_name === project_name) {
        return project;
      }
    }
  }
  define_estimations(){
    for (const estimation of this.service.estimations){
      if (estimation.username === this.service.user_to_be_updated.username) {
        const project = this.search_project(estimation.project_name);
        if ( (estimation.cost <= 1.1 * project.cost && estimation.cost >= 0.9 * project.cost) &&
          (estimation.time <= 1.1 * project.time && estimation.time >= 0.9 * project.time) ) {
          this.right_estimations += 1;
        } else {
          this.wrong_estimations += 1;
        }
      }
    }
  }
}

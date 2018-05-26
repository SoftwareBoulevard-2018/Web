import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  // These variables help to define the efficiency (performance) of the users and the style of the performance bar
  user;
  performance;
  color = 'primary';
  mode = 'determinate';

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    // This component defines the performance shown in the html based on the user that will be shown and on its role
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    this.getUserById(this.service.user_to_be_updated);
    // this.current_company = this.search_company(this.service.user_to_be_updated.companyName);
    /* if (this.service.user_to_be_updated.role === 'Developer' || this.service.user_to_be_updated.role === 'Tester'
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
    } */
  }

  getUserById(userId) {
    return this.httpService.getUserById(userId).subscribe(data => { this.user = data;
    if ( this.user.resourcesSpent === 0 || (this.user.correctTrainingQuestions === 0
      && this.user.correctProjectQuestions === 0) ) {
      this.performance = 0;
    } else {
      this.performance = ((this.user.correctTrainingQuestions +
        this.user.correctProjectQuestions) / this.user.resourcesSpent) * 100;
    }
      this.getCompanyById(data.companyId);
    console.log(this.user);
      console.log(this.user.correctProjectQuestions);
      console.log(this.user.correctTrainingQuestions);
    console.log(this.performance);
    });
  }

  getCompanyById(companyId) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      const fuck = JSON.parse(JSON.stringify(data));
      this.user.id = fuck.id;
      this.user.companyName = data.name;
      this.user.companyImage = data.image;
    }, error => {
      this.user.companyName = undefined;
      this.user.companyImage = undefined;
      }); }

  redirect(event) {
    this.router.navigate(['home/users/user-status/update']);
  }
  redirect2(event) {
    // redirects to company status defining the necessary data
    this.service.company_to_be_updated = this.user.id;
    this.router.navigate(['home/companies/company-status']);
  }
  /* date_formatter(date?: Date) {
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  } */
  /* search_company (companyName) {
    // Searches for a company by its name
    for (const company of this.service.companies) {
      if (company.name === companyName) {
        return company;
      }
    }
  } */
  /* search_project (project_name) {
    // Searches for a project by its name
    for (const project of this.service.projects) {
      if (project.project_name === project_name) {
        return project;
      }
    }
  } */
  /* define_estimations() {
    // defines the number of correct and incorrect estimations of a project manager
    for (const estimation of this.service.estimations) {
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
  } */
}

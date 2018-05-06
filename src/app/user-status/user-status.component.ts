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

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    this.current_company = this.search_company(this.service.user_to_be_updated.company_name);
    if ((this.service.user_to_be_updated.questions_answered_wrong + this.service.user_to_be_updated.questions_answered_right) !== 0) {
      this.performance = (this.service.user_to_be_updated.questions_answered_right /
        (this.service.user_to_be_updated.questions_answered_wrong + this.service.user_to_be_updated.questions_answered_right)) * 100;
    } else {
      this.performance = 0;
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

}

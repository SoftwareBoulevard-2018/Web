import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-status',
  templateUrl: './company-status.component.html',
  styleUrls: ['./company-status.component.css']
})
export class CompanyStatusComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  current_company;

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.search_user_company();
    } else {
      this.current_company = this.service.company_to_be_updated;
    }
  }
  search_user_company() {
    for (const user of this.service.users) {
      if (user.username === this.service.username) {
        if (!(user.company_name === undefined)) {
          this.current_company = this.search_company(user.company_name);
        }
      }
    }
  }
  search_company (company_name) {
    for (const company of this.service.companies) {
      if (company.name === company_name) {
        return company;
      }
    }
  }
  redirect(event) {
    this.service.company_to_be_updated = this.current_company;
    this.router.navigate(['home/companies/company-status/update']);
  }
  date_formatter(date?: Date) {
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  }

}

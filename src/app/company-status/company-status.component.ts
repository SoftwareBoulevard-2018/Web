import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-company-status',
  templateUrl: './company-status.component.html',
  styleUrls: ['./company-status.component.css']
})
export class CompanyStatusComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  // Variables necessary to define the users in the company and the company itself, also the table of those users
  current_company;
  users = [];
  users2;
  table_titles = ['competency', 'name', 'username', 'role', 'correct_answers', 'wrong_answers'];

  ngOnInit() {
    // Defines the company that will be shown in the html
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      // this.search_user_company();
    } else {
      this.current_company = this.service.company_to_be_updated;
    }
    if (this.current_company !== undefined) {
      this.users = JSON.parse(JSON.stringify(this.current_company.team_members));
      this.users2 = new MatTableDataSource(this.users);
    }
  }
  /*search_user_company() {
    // Searches for the company of the user in session
    for (const user of this.service.users) {
      if (user.username === this.service.username) {
        if (!(user.companyName === undefined)) {
          this.current_company = this.search_company(user.companyName);
          return;
        }
      }
    }
    this.current_company = undefined;
  } */
  search_company (company_name) {
    for (const company of this.service.companies) {
      if (company.name === company_name) {
        return company;
      }
    }
  }
  redirect(event) {
    // Redirects to company update and defines the necessary variables
    this.service.company_to_be_updated = this.current_company;
    this.router.navigate(['home/companies/company-status/update']);
  }
  date_formatter(date?: Date) {
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  }
  applyFilter(filterValue: string) {
    // Function necessary to filter values on the table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }
}

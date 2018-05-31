import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {HttpService} from '../http.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-company-status',
  templateUrl: './company-status.component.html',
  styleUrls: ['./company-status.component.css']
})
export class CompanyStatusComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // Variables necessary to define the users in the company and the company itself, also the table of those users
  fuck = 0;
  current_company;
  users = [];
  users2: MatTableDataSource<User>;
  table_titles = ['competency', 'name', 'username', 'role', 'correct_answers', 'wrong_answers'];

  ngOnInit() {
    // Defines the company that will be shown in the html
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }  else if (this.service.company_to_be_updated === undefined) {
      this.current_company = undefined;
    } else {
      this.users2 = new MatTableDataSource(this.users);
      this.getCompanyById(this.service.company_to_be_updated);
    }
  }

  getCompanyById(companyId) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
        this.current_company = data;
        this.getProjectManager('Project Manager', companyId);
      this.getDevelopers(companyId);
    });
  }

  getProjectManager(role, companyId) {
    return this.httpService.getUserByRoleCompany(role, companyId).subscribe( data => {
      this.current_company.projectManager = data[0];
      console.log(this.current_company.projectManager);
    });
  }

  getDevelopers(companyId) {
    return this.httpService.getUserByRoleCompany('Developer', companyId).subscribe( data => {
      this.list(data);
      this.getAnalysts(companyId);
    });
  }

  getAnalysts(companyId) {
    return this.httpService.getUserByRoleCompany('Analyst', companyId).subscribe( data => {
      this.list(data);
      this.getTesters(companyId);
    });
  }

  getTesters(companyId) {
    return this.httpService.getUserByRoleCompany('Tester', companyId).subscribe( data => {
      this.list(data);
    });
  }

  list(users) {
    for (const user of Object.values(users)) {
      console.log(this.users2);
      this.fuck += 1;
      this.users.push({
        competency: user.competencyLevel,
        name: user.name, username: user.username,
        role: user.role, correctProjectQuestions: user.correctProjectQuestions,
        correctTrainingQuestions: user.correctTrainingQuestions, resourcesSpent: user.resourcesSpent
      });
      this.users2.data = this.users;
      console.log(this.users2);
    }
  }

  redirect(event) {
    // Redirects to company update and defines the necessary variables
    this.service.company_to_be_updated = this.current_company.id;
    this.router.navigate(['home/companies/company-status/update']);
  }
  /* date_formatter(date?: Date) {
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
  } */
  applyFilter(filterValue: string) {
    // Function necessary to filter values on the table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }
}

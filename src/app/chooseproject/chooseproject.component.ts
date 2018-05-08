import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-chooseproject',
  templateUrl: './chooseproject.component.html',
  styleUrls: ['./chooseproject.component.css']
})
export class ChooseprojectComponent implements OnInit {
  table_titles = ['Project_ID', 'Project_Name', 'Required_K', 'Rewarded_K', 'Analyst_Level', 'Developer_Level', 'Tester_Level', 'Select'];
  correct_guess = true;
  projects = [];
  projects2;

  constructor(public service: GeneralServiceService, public router: Router) { }

  search_project(project_id) {
    for (const project of this.service.projects) {
      if (this.projects === project_id) {
        return project;
      }
    }
  }

  redirect1(event, element) {
    const username = this.service.username;
    for (const user of this.service.users) {
      if (username === user.username) {
        for (const company of this.service.companies) {
          if (user.company_name === company.name) {
            company.current_project_name = element.project_name;
          }
        }
      }
    }
  }

  getCompany(username) {
    for (const user of this.service.users) {
      if (username === user.username) {
        for (const company of this.service.companies) {
          if (user.company_name === company.name) {
            return company;
          }
        }
      }
    }
  }

  getProject(username) {
    for (const user of this.service.users) {
      if (username === user.username) {
        for (const company of this.service.companies) {
          if (user.company_name === company.name) {
            for (const project of this.service.projects) {
              if (company.current_project_name === project.project_name) {
                return project;
              }
            }
          }
        }
      }
    }
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Game Administrator') {
      this.router.navigate(['restricted']);
    } else {
      this.projects = JSON.parse(JSON.stringify(this.service.projects));
      this.projects2 = new MatTableDataSource(this.projects);
      console.log(this.projects2);
      // this.users2.paginator = this.paginator;
      // this.users2.sort = this.sort;
    }
  }

}


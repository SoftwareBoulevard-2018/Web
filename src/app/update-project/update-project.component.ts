import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  projects = [];
  projects2 = [];
  project2;
  project3;

  table_titles = ["id", "name", "update"];

  ngOnInit() {
	// Checks User permissions and transforms the data to the format read by material tables
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    }

    else {
      this.projects = JSON.parse(JSON.stringify(this.service.projects));
      this.project2 = new MatTableDataSource(this.projects);
      this.projects2 = JSON.parse(JSON.stringify(this.service.projects2));
      this.project3 = new MatTableDataSource(this.projects2);
    }
  }

  applyFilter(filterValue: string) {
	// Function necessary by the table filter
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.project2.filter = filterValue;
  }

  applyFilter2(filterValue: string) {
	// Function necessary by the table filter
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.project3.filter = filterValue;
  }

  search_project(name) {
	// Searches project by its name
    for (let project of this.service.projects) {
      if (project.project_name === name) {
        return project;
      }
    }
  }

  search_project2(name) {
	// Searches project by its name
    for (let project of this.service.projects2) {
      if (project.project_name === name) {
        return project;
      }
    }
  }

  redirect(event, element) {
	// Redirects to update bidding project and sends the necessary variables
    this.service.project_to_be_updated = this.search_project(element.project_name);
    this.router.navigate(['home/set-up/update-project/update-bidding-project']);
  }

  redirect2(event, element) {
	// Redirects to update instant project and sends the necessary variables
    this.service.project_to_be_updated = this.search_project2(element.project_name);
    this.router.navigate(['home/set-up/update-project/update-instant-project']);
  }

}

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
  project2;

  table_titles = ["id", "name", "update"];

  ngOnInit() {
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
      //this.users2.paginator = this.paginator;
      //this.users2.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.project2.filter = filterValue;
  }

  search_project(name) {
    for (let project of this.service.companies) {
      if (company.name === name) {
        return company;
      }
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) {
  }

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  companies = [];
  companies2;

  table_titles = ["image", "name", "project manager", "status", "update"];

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    }

    else {
      this.companies = JSON.parse(JSON.stringify(this.service.companies));
      this.companies2 = new MatTableDataSource(this.companies);
      //this.users2.paginator = this.paginator;
      //this.users2.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.companies2.filter = filterValue;
  }

  search_company(name) {
    for (let company of this.service.companies) {
      if (company.name === name) {
        return company;
      }
    }
  }

  redirect(event, element) {
    this.service.user_to_be_watched = this.search_company(element.username);
    this.router.navigate(['home/companies/company-status']);
  }

  redirect2(event, element) {
    this.service.company_to_be_updated = this.search_company(element.name);
    this.router.navigate(['home/companies/company-status/update']);
  }
}

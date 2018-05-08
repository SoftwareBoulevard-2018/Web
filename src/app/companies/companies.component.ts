import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) {
  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // Variables used for the creation of the material table

  companies = [];
  companies2;

  table_titles = ['creation_date', 'image', 'name', 'project manager', 'capacity_k', 'resources', 'status', 'update'];



  ngOnInit() {
    // When the component is created, it defines the variables to create the material table
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.companies = JSON.parse(JSON.stringify(this.service.companies));
      this.companies2 = new MatTableDataSource(this.companies);
      // this.users2.paginator = this.paginator;
      // this.users2.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    // Function used to filter the values on the material table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.companies2.filter = filterValue;
  }

  search_company(name) {
    for (const company of this.service.companies) {
      if (company.name === name) {
        return company;
      }
    }
  }

  redirect(event, element) {
    // Redirects to the company status defining the necessary variable
    this.service.company_to_be_updated = this.search_company(element.name);
    this.router.navigate(['home/companies/company-status']);
  }

  redirect2(event, element) {
    // Redirects to the company update defining the necessary variable
    this.service.company_to_be_updated = this.search_company(element.name);
    this.router.navigate(['home/companies/company-status/update']);
  }
  redirect3(event) {
    // Redirects to the company creation
    this.router.navigate(['home/companies/create']);
  }
}

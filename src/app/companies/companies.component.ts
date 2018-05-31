import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Company} from '../shared/company';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  companies = [];
  companies2: MatTableDataSource<Company>;

  table_titles = ['createdAt', 'image', 'name', 'projectManager', 'capacityK', 'companyResource', 'status', 'update'];



  ngOnInit() {
    // When the component is created, it defines the variables to create the material table
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.companies2 = new MatTableDataSource(this.companies);
      this.getAllCompanies();
    }
  }

  getAllCompanies() {
    return this.httpService.getAllCompanies().subscribe(data => this.listCompanies(data));
  }

  listCompanies(data) {
    console.log(data);
    this.companies = [];
    for (const value of Object.values(data.data)) {
      this.getUserByRoleCompany('Project Manager', value);
    }
  }

  getUserByRoleCompany(role, company) {
    return this.httpService.getUserByRoleCompany(role, company.id).subscribe(data => {
        const fuck = JSON.parse(JSON.stringify(data));
      if (fuck[0] !== undefined) {
        company.projectManager = fuck[0].username;
        this.companies.push({
          id: company.id, createdAt: company.createdAt,
          name: company.name, image: company.image,
          capacityK: company.capacityK, companyResource: company.companyResource, projectManager: company.projectManager
        });
        this.companies2.data = this.companies;
        console.log(this.companies2);
        console.log(data);
      } else {
        company.projectManager = undefined;
        this.companies.push({ id: company.id, createdAt: company.createdAt,
          name: company.name, image: company.image,
          capacityK: company.capacityK, companyResource: company.companyResource, projectManager: company.projectManager});
        this.companies2.data = this.companies;
        console.log(this.companies2);
      }
    });
  }

  applyFilter(filterValue: string) {
    // Function used to filter the values on the material table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.companies2.filter = filterValue;
  }

  redirect(event, element) {
    // Redirects to the company status defining the necessary variable
    this.service.company_to_be_updated = element.id;
    this.router.navigate(['home/companies/company-status']);
  }

  redirect2(event, element) {
    // Redirects to the company update defining the necessary variable
    this.service.company_to_be_updated = element.id;
    this.router.navigate(['home/companies/company-status/update']);
  }
  redirect3(event) {
    // Redirects to the company creation
    this.router.navigate(['home/companies/create']);
  }
}

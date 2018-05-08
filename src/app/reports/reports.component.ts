import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralServiceService} from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
// import {MatTableModule} from '@angular/material/table';
// import {EmailComponent} from '../email/email.component';

/**
 * @title Companies with most K-Units
 */

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  companies = [];
  companies2;
  //users = [];
  //users2;

  table_titles_company = ['image', 'name', 'capacity_k', 'status'];
  //table_titles_user = ['name', 'username', 'role', 'company', 'status'];

  ngOnInit() {
    this.companies = JSON.parse(JSON.stringify(this.service.companies));
    this.companies2 = new MatTableDataSource(this.companies);
    // this.companies2.paginator = this.paginator;
    this.companies2.sort = this.sort;
    /**console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.users = JSON.parse(JSON.stringify(this.service.users));
      for (const user of this.users) {
        user.hide_password = true;
      }
      this.users2 = new MatTableDataSource(this.users);
      console.log(this.users2);
      this.users = JSON.parse(JSON.stringify(this.service.users));
      for (const user of this.users) {
        user.hide_password = true;
      }
      // this.users2.paginator = this.paginator;
      this.users2.sort = this.sort;
    }*/
  }
  applyFilterCompany(filterValue: string) {
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

  redirect1Company(event, element) {
    this.service.company_to_be_updated = this.search_company(element.name);
    this.router.navigate(['home/companies/company-status']);
  }

  /**applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  search_user(username) {
    // Searches user by its username
    for (const user of this.service.users) {
      if (user.username === username) {
        return user;
      }
    }
  }

  redirect(event, element) {
    // Redirects to User status and defines the necessary variables
    this.service.user_to_be_updated = this.search_user(element.username);
    this.router.navigate(['home/users/user-status']);
  }
  redirect2(event, element) {
    // Redirects to User update and defines the necessary variables
    this.service.user_to_be_updated = this.search_user(element.username);
    this.router.navigate(['home/users/user-status/update']);
  }*/

}

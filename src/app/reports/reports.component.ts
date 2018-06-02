import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralServiceService} from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {HttpService} from '../http.service';
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

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('sort3') sort3: MatSort;

  active_tab = 1;
  companies_by_resources = [];
  companies_by_resources2;
  companies_by_capacityK = [];
  companies_by_capacityK2;
  users_by_efficiency = [];
  users_by_efficiency2;
  PM_by_efficiency = [];
  PM_by_efficiency2;

  table_titles_companies_by_resources = ['image', 'name', 'resources', 'status'];
  table_titles_companies_by_capacityK = ['image', 'name', 'capacity_k', 'status'];
  table_titles_users_by_efficiency = ['username', 'name', 'role', 'correct', 'wrong', 'efficiency', 'status'];
  table_titles_PM_by_efficiency = ['username', 'name', 'correct', 'wrong', 'efficiency', 'status'];

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.companies_by_resources2 = new MatTableDataSource(this.companies_by_resources);
      this.companies_by_capacityK2 = new MatTableDataSource(this.companies_by_capacityK);
      this.users_by_efficiency2 = new MatTableDataSource(this.users_by_efficiency);
      this.PM_by_efficiency2 = new MatTableDataSource(this.PM_by_efficiency);
      this.getAllCompanies();
      this.getDevelopers();
      this.getPMs();
    }
  }

  getAllCompanies() {
    return this.httpService.getAllCompanies().subscribe(data => {
      this.listCompanies(data);
    });
  }

  listCompanies(companies) {
    let element;
    console.log(companies);
    for (const company of Object.values(companies.data)) {
      element = { id: company.id,
        image: company.image,
        name: company.name, capacity_k: company.capacityK,
        resources: company.companyResource
      };
      this.companies_by_resources.push(element);
      this.companies_by_capacityK.push(element);
      this.companies_by_resources2.data = this.companies_by_resources;
      this.companies_by_capacityK2.data = this.companies_by_capacityK;
      this.companies_by_resources2.sort = this.sort;
      this.companies_by_capacityK2.sort = this.sort1;
    }
  }

  getDevelopers() {
    return this.httpService.getUsersByRole('Developer').subscribe(data => {
      this.list(data);
      this.getAnalysts();
    });
  }

  getAnalysts() {
    return this.httpService.getUsersByRole('Analyst').subscribe(data => {
      this.list(data);
      this.getTesters();
    });
  }

  getTesters() {
    return this.httpService.getUsersByRole('Tester').subscribe(data => {
      this.list(data);
    });
  }

  list(users) {
    console.log(users);
    for (const user of Object.values(users)) {
      if (user.resourcesSpent !== 0) {
        user.efficiency = ((user.correctProjectQuestions + user.correctTrainingQuestions) / (user.resourcesSpent) * 100);
      } else {
        user.efficiency = 0;
      }
      user.correct = (user.correctProjectQuestions + user.correctTrainingQuestions);
      user.wrong = user.resourcesSpent - user.correct;
      this.users_by_efficiency.push({ id: user.id,
        name: user.name, username: user.username,
        role: user.role, efficiency: user.efficiency,
        correct: user.correct, wrong: user.wrong
      });
      this.users_by_efficiency2.data = this.users_by_efficiency;
      this.users_by_efficiency2.sort = this.sort2;
    }
  }

  getPMs() {
    return this.httpService.getUsersByRole('Project Manager').subscribe(data => {
      this.listPM(data);
    });
  }

  listPM(users) {
    console.log(users);
    for (const user of Object.values(users)) {
      this.getRightEstimations(user);
    }
  }

  getRightEstimations(user){
    this.httpService.getEstimationByProjectManagerUsernameAndState(user.username, 'true').subscribe( data => {
      user.correctEstimations = data.length;
      this.getWrongEstimations(user);
    });
  }

  getWrongEstimations(user){
    this.httpService.getEstimationByProjectManagerUsernameAndState(user.username, 'false').subscribe( data => {
      user.wrongEstimations = data.length;
      if ( user.correctEstimations === 0 && user.wrongEstimations === 0) {
        user.performance = 0;
      } else {
        user.performance = ((user.correctEstimations) /
          (user.correctEstimations + user.wrongEstimations)) * 100;
      }
      this.PM_by_efficiency.push({ id: user.id,
        name: user.name, username: user.username,
        efficiency: user.performance, correct: user.correctEstimations,
        wrong: user.wrongEstimations
      });
      this.PM_by_efficiency2.data = this.PM_by_efficiency;
      this.PM_by_efficiency2.sort = this.sort3;
    });
  }

  applyFilterCompany(filterValue: string, table) {
    // Function used to filter the values on the material table
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    table.filter = filterValue;
  }

  redirect1Company(event, element) {
    this.service.company_to_be_updated = element.id;
    this.router.navigate(['home/companies/company-status']);
  }

  redirect(event, element) {
    this.service.user_to_be_updated = element.id;
    this.router.navigate(['home/users/user-status']);
  }

  tabChange(event, arg) {
    this.active_tab = arg;
  }

}

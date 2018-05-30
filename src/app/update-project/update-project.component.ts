import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {BiddingProject} from '../shared/biddingProject';
import {InstantProject} from '../shared/instantProject';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  projects = [];
  projects2 = [];
  project2: MatTableDataSource<BiddingProject>;
  project3: MatTableDataSource<InstantProject>;

  table_titles = ["id", "name", "update"];

  ngOnInit() {
    // When the component is created, it defines the variables to create the material table
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.project2 = new MatTableDataSource(this.projects);
      this.getAllBiddingProjects();
      this.project3 = new MatTableDataSource(this.projects2);
      this.getAllInstantProjects();
    }
  }

  getAllBiddingProjects(){
    return this.httpService.getAllBiddingProjects().subscribe(data => 
      this.listBiddingProjects(data));
  }
  
  listBiddingProjects(data){
    this.projects = [];
    data = JSON.parse(JSON.stringify(data)).data
    for (let biddingProject of data) {
      this.projects.push({ id: biddingProject.id, name: biddingProject.name});
    }
    this.project3.data = this.projects;
    console.log(this.project3);
    console.log(data);
  }

  getAllInstantProjects(){

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

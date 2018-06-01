import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {HttpService} from "../http.service";
import { BiddingProject } from "../shared/biddingProject";
import { InstantProject } from "../shared/instantProject";
import {invitations} from "../shared/invitations";
import {User} from "../shared/user";
import {Record} from "../shared/record";

@Component({
  selector: 'app-chooseproject',
  templateUrl: './chooseproject.component.html',
  styleUrls: ['./chooseproject.component.css']
})
export class ChooseprojectComponent implements OnInit {
  table_titles = [ 'Project_Name', 'required_K', 'Rewarded_K', 'Analyst_Level', 'Developer_Level', 'Tester_Level','cost', 'Select'];
  correct_guess = true;
  projects = [];
  projects2;
  load_complete = false;
  formdata;
  invalid = false;
  success = false;
  user;
  users2: MatTableDataSource<User>;
  users = [];
  auxiliar;
  invalid_name = false;
  newinvitation;
  state="unattended";
  record;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  // method for the correct function of the button
  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Game Administrator' || this.service.user.companyId=== null) {
      this.router.navigate(['restricted']);
    } else {
      this.users2 = new MatTableDataSource(this.users);
      this.getAllUsers();
      console.log(this.users2);
      this.getallinstants();

    }
  }

  getAllUsers() {
    return this.httpService.getAllBiddingProjects().subscribe(data => {this.listUser(data);
      this.load_complete = true;
    });
  }
  getallinstants(){
    return this.httpService.getAllInstantProjects().subscribe(data => this.listUser2(data));
  }


  getCompanyById(companyId, user) {
    return this.httpService.getBiddingProjectById(companyId).subscribe(data => {
      console.log("entro en get company");
      user.projectName = data.name;
      user.hide_password = true;
    //  if(user.companyName===undefined && user.role!=='Game Administrator' && user.role!=='Project Manager') {
        this.users.push({

          id: user._id,
          Project_Name: user.name, required_K: user.required_K,
          Rewarded_K: user.rewarded_K, Analyst_Level: user.required_analyst_level,
          Developer_Level: user.required_developer_level, Tester_Level: user.required_tester_level,
          cost: user.cost
        });
        this.users2.data = this.users;
        console.log(this.users2);
      //}
    }, error => {
     // if(user.companyName===undefined && user.role!=='Game Administrator' && user.role!=='Project Manager') {

        console.log("entro en get company!!!!!!!!!!!!!!!");
        this.users.push({
          id: user._id,
          Project_Name: user.name, required_K: user.required_K,
          Rewarded_K: user.rewarded_K, Analyst_Level: user.required_analyst_level,
          Developer_Level: user.required_developer_level, Tester_Level: user.required_tester_level,
          cost: user.cost
        });
        this.users2.data = this.users;
      console.log("la que te pario");
        console.log(user._id);
     // }
      console.log(this.users2);

    });
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  listUser(data) {
    console.log(data);
    this.users = [];
    for (const value of Object.values(data.data)) {
      console.log(value);
      this.getCompanyById(value.id, value);
    }
  }

  listUser2(data) {
    console.log(data);

    for (const value of Object.values(data.data)) {
      console.log(value);
      this.getCompanyById(value.id, value);
    }
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  haveCompany() {
    if (this.service.user.companyId === null){
      return false;
    } else {
      return true;
    }
  }

  getInvitation(formdata) {
    let today = new Date();
    console.log(formdata.id)
    this.record = new Record(today.getDate(),null, this.service.user.companyId, formdata.id);
    this.httpService.createRecord(this.record);
    alert("Congratulations, You have chosen a project");
    this.router.navigate(['home/users/projectmanager/functions']);


  }





  createinvitation(inv) {
    return this.httpService.createinvitations(inv).subscribe(data => console.log(data));
  }

  onClickSubmit(data) {
    // Validates the data input on the form and if it's correct then creates the user
    // this.auxiliar = this.new_username(data.username);
    console.log(data);
    this.getInvitation(data);
  }
}


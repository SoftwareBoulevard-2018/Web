import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {HttpService} from "../http.service";
import { BiddingProject } from "../shared/biddingProject";
import { InstantProject } from "../shared/instantProject";
import {invitations} from "../shared/invitations";
import {User} from "../shared/user";

@Component({
  selector: 'app-chooseproject',
  templateUrl: './chooseproject.component.html',
  styleUrls: ['./chooseproject.component.css']
})
export class ChooseprojectComponent implements OnInit {
  table_titles = [ 'Project_Name', 'Required_K', 'Rewarded_K', 'Analyst_Level', 'Developer_Level', 'Tester_Level','Cost', 'Select'];
  correct_guess = true;
  projects = [];
  projects2;
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
  xx=0;

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

    }
  }

  getAllUsers() {
    return this.httpService.getAllBiddingProjects().subscribe(data => this.listUser(data));
  }
  getallinstants(){
    return this.httpService.getAllInstantProjects().subscribe(data => this.listUser(data));
  }


  getCompanyById(companyId, user) {
    return this.httpService.getBiddingProjectById(companyId).subscribe(data => {
      console.log("entro en get company");
      user.projectName = data.name;
      user.hide_password = true;
    //  if(user.companyName===undefined && user.role!=='Game Administrator' && user.role!=='Project Manager') {
        this.users.push({

          Project_ID: user.id,
          Project_Name: user.name, Required_K: user.required_k,
          Rewarded_K: user.rewarded_K, Analyst_Level: user.required_analyst_level,
          Developer_Level: user.required_developer_level, Tester_Level: user.required_tester_level,
          Cost:user.cost
        });
        this.users2.data = this.users;
        console.log(this.users2);
      //}
    }, error => {
     // if(user.companyName===undefined && user.role!=='Game Administrator' && user.role!=='Project Manager') {

        console.log("entro en get company!!!!!!!!!!!!!!!");
        this.users.push({
          Project_ID: user.id,
          Project_Name: user.name, Required_K: user.required_k,
          Rewarded_K: user.rewarded_K, Analyst_Level: user.required_analyst_level,
          Developer_Level: user.required_developer_level, Tester_Level: user.required_tester_level,
          Cost: user.cost
        });
        this.users2.data = this.users;
      console.log("la que te pario");
        console.log(user);
     // }
      console.log(this.users2);
      this.getallinstants();
    });
  }

  listUser(data) {
    console.log(data);
    this.users = [];
    console.log("entro en lista de usuarios");
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

  getInvitation(formdata){
    return this.httpService.getinvitationsByUserAndCompany(formdata.id, this.service.user.companyId).subscribe(data => {

        this.auxiliar = false;
        console.log(this.auxiliar)

      },
      error => {
        this.auxiliar = true;
        this.xx=this.xx+1;

        console.log(this.auxiliar);
        this.newinvitation= new invitations(formdata.id, this.service.user.companyId, this.state );

        this.createinvitation(this.newinvitation);
      });

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


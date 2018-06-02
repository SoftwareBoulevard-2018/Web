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
  table_titles = [ 'Project_Name', 'required_K', 'Rewarded_K', 'Analyst_Level', 'Developer_Level', 'Tester_Level', 'Select'];
  correct_guess = true;
  projects = [];
  projects2;
  load_complete;
  formdata;
  company;
  devUsers = [];
  testUsers = [];
  anUsers = [];
  maxLevelDevUser;
  maxLevelTestUser;
  maxLevelAnUser;
  invalid = false;
  success = false;
  user;
  project_selected;
  users2: MatTableDataSource<User>;
  users = [];
  state="unattended";
  record;
  haveProject;
  haveTeam;
  haveCompany;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  // method for the correct function of the button
  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Game Administrator') {
      this.router.navigate(['restricted']);
    } else {
      this.users2 = new MatTableDataSource(this.users);
      this.getAllUsers();
      this.getallinstants();

    }
  }

  getAllUsers() {
    return this.httpService.getAllBiddingProjects().subscribe(data => {this.listUser(data);
      this.verifyCompany();;
    });
  }
  getallinstants(){
    return this.httpService.getAllInstantProjects().subscribe(data => this.listUser2(data));
  }

  canChooseProject(){
    if(this.haveCompany){
      if(this.haveTeam){
        if(this.haveProject){
          return "complete"
        } else {
          return "project"
        }
      } else {
        return "team"
      }
    } else {
      return "company"
    }
  }

  getCompanyById(companyId, user) {
    return this.httpService.getBiddingProjectById(companyId).subscribe(data => {
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

        this.users.push({
          id: user._id,
          Project_Name: user.name, required_K: user.required_K,
          Rewarded_K: user.rewarded_K, Analyst_Level: user.required_analyst_level,
          Developer_Level: user.required_developer_level, Tester_Level: user.required_tester_level,
          cost: user.cost
        });
        this.users2.data = this.users;

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

  createRecord(formdata) {
    this.record = new Record(null,null, this.service.user.companyId, formdata.id);
    console.log(this.record);
    this.httpService.createRecord(this.record).subscribe(data=>console.log(data));

    alert("Congratulations, You have chosen a project");
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  verifyTLevel(){
    console.log("VerifyTlevel");
    return this.httpService.getUserByRoleCompany("Tester", this.service.user.companyId).subscribe(data => {
      this.testUsers = JSON.parse(JSON.stringify((data)));
      this.maxLevelTestUser = 0;
      for (let i=0; i<this.testUsers.length; i++){
        let current_test_level = this.testUsers[i].competencyLevel;
        if (this.maxLevelTestUser <= current_test_level){
          this.maxLevelTestUser = current_test_level;
        }
      }
      this.verifyDLevel();
    });
  }

  verifyDLevel() {
    console.log("VerifyDlevel");
    return this.httpService.getUserByRoleCompany("Developer", this.service.user.companyId).subscribe(data => {
      this.devUsers = JSON.parse(JSON.stringify((data)));
      this.maxLevelDevUser = 0;
      for (let i = 0; i < this.devUsers.length; i++) {
        let current_dev_level = this.devUsers[i].competencyLevel;
        if (this.maxLevelDevUser <= current_dev_level) {
          this.maxLevelDevUser = current_dev_level;
        }
      }
      this.verifyALevel();
    });
  }

  verifyALevel() {
    console.log("VerifyAlevel");
    return this.httpService.getUserByRoleCompany("Analyst", this.service.user.companyId).subscribe(data => {
      this.anUsers = JSON.parse(JSON.stringify((data)));
      this.maxLevelAnUser = 0;
      for (let i = 0; i < this.anUsers.length; i++) {
        let current_an_level = this.anUsers[i].competencyLevel;
        if (this.maxLevelAnUser <= current_an_level) {
          this.maxLevelAnUser = current_an_level;
        }
      }
      this.verifyLevel();
    });
  }

  verifyLevel() {
    console.log("VerifyLevel");
    if ((this.project_selected.Analyst_Level !== undefined) &&
      (this.project_selected.Developer_Level !== undefined) &&
      (this.project_selected.Tester_Level !== undefined))
    {
      if ((this.project_selected.Analyst_Level <= this.maxLevelAnUser) &&
        (this.project_selected.Developer_Level <= this.maxLevelDevUser) &&
        (this.project_selected.Tester_Level <= this.maxLevelTestUser))
      {
        console.log("si esta reconociendo esto");
        this.createRecord(this.project_selected);
      } else {
        alert("You can not choose this project because the level of competence of any member of your team is lower than required by this project");
      }
    } else {
      console.log("no esta reconociendo esto");
      this.createRecord(this.project_selected);
    }
  }

  verifyTeam(){
    let test = [];
    let dev = [];
    let an = [];
    this.httpService.getUserByRoleCompany("Tester", this.service.user.companyId).subscribe(data => {
      test = data;
      this.httpService.getUserByRoleCompany("Developer", this.service.user.companyId).subscribe(data2 => {
        dev = data2;
        this.httpService.getUserByRoleCompany("Analyst", this.service.user.companyId).subscribe(data3 => {
          an = data3;
          if((test.length >> 0) && (dev.length > 0) && (an.length > 0)){
            this.haveTeam = true;
            this.verifyProject();
          } else {
            this.load_complete = true;
          }
        });
      });
    });
  }

  verifyProject(){
    console.log("verifyProject");
    this.httpService.getRecordsByFinishDateAndCompany(null, this.service.user.companyId).subscribe(data => {
      this.load_complete = true;
      },
      error1 => {
      this.haveProject = true;
      this.load_complete = true;
      });
  }

  verifyCompany(){
    if (this.service.user.companyId !== null){
      console.log("VerifyCompany si tiene");
      this.haveCompany = true;
      this.verifyTeam();
    } else {
      console.log("VerifyCompany no tiene");
      this.load_complete = true;
    }
  }

  saveCompany(companyID){
    console.log("saveCompany");
    return this.httpService.getCompanyById(companyID).subscribe(data => {
    this.company = data;
      if(this.project_selected.required_K !== undefined){
        if(this.company.capacityK >= this.project_selected.required_K){
          this.verifyTLevel();
        } else {
          alert("You can not choose this project because its capacity K is not enough");
        }
      } else {
        this.verifyTLevel();
      }
    });
  }

  onClickSubmit(data) {
    console.log("onClickSubmit");
    this.project_selected = data;
    console.log(this.project_selected);
    this.saveCompany(this.service.user.companyId);
    // Validates the data input on the form and if it's correct then creates the user
    // this.auxiliar = this.new_username(data.username);
  }
}


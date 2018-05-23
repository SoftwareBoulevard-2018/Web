import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from '../shared/company';

@Component({
  selector: 'app-recruit-member',
  templateUrl: './recruit-member.component.html',
  styleUrls: ['./recruit-member.component.css']
})
export class RecruitMemberComponent implements OnInit {
  formdata;
  project_managers;
  invalid = false;
  success = false;
  user;
  aux;
  sumary;

  constructor(public service: GeneralServiceService, public router: Router) { }
  // method for the correct function of the button
  form() {
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
  }
  // this method fill the list of the possible members of a team. The method verify that you can only invite people without a team
  possible_members(){
    // list of people that don't have team
    this.project_managers = []
    for (let user of this.service.users){
      // the verification that you can only invite with the team member role (analyst, tester, developer)
      if (user.company_name === undefined && (user.role!="Project Manager") && (user.role!= "Game Administrator")){
        this.project_managers.push(user);
        for(let company of this.service.companies){
          if(!(company.project_manager === undefined) && company.project_manager.username === user.username){
            this.project_managers.pop();
            break;
          }
        }
      }
    }
  }
  getCompany(username) {
    for (const user of this.service.users) {
      if (username === user.username) {
        for (const company of this.service.companies) {
          if (user.company_name === company.name) {
            return company;
          }
        }
      }
    }
  }
  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }
  // the method of the button
  onClickSubmit(data) {
  if (data.project_manager !== this.service.username) {
    // summary is an accumulator and aux is the variable that contains who invites and who receives the invitation
    this.sumary = 0;
    this.aux = this.service.username.concat("-");
    this.aux = this.aux.concat(data.project_manager);
    // if is the first invitation of de DB it is automatically saved in the array of invitations (this.service.invitations)
    if (this.service.invitations.length === 0 ) {
      this.service.invitations.push( this.aux);
      console.log(this.service.invitations);
      this.success = true;
      this.invalid = false;
    }
    // if you already invite that person you will receive an error
    else{
      for (let inv of this.service.invitations){
        this.sumary = this.sumary + 1;
        if (this.aux === inv) {
          this.invalid = true;
          this.success = false;
          break;
        }
        // if is the first time that you invite that person the invitation is sent
        else if (this.aux !== inv && this.sumary === this.service.invitations.length ){
          this.service.invitations.push( this.aux);
          console.log(this.service.invitations);
          this.success = true;
          this.invalid = false;
          break;
        }
    }
    }
  }
  else{
    this.success = false;
    this.invalid = true;
  }
  }
  // The verification of the roles, because the PM is the only person that can invite people
  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Game Administrator") {
      this.router.navigate(['restricted'])
    }
    else {
      this.possible_members();
      this.form();
    }
  }


}

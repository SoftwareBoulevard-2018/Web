import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from "../shared/company";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  formdata;
  project_managers;
  lacking_project_manager = false;
  totally_empty = false;
  invalid = false;
  invalid_name = false;
  success = false;
  repeated_field = false;
  hide = true;
  user;

  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
    this.formdata = new FormGroup({
      name: new FormControl(''),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
  }

  possible_project_managers(){
    this.project_managers = []
    for (let user of this.service.users){
      if (user.role === "Project Manager"){
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

  new_name(name){
    for(let company of this.service.companies){
      if(name === company.name){
        return false;
      }
    }
    return true;
  }

  current_project_manager(){
    if (this.service.company_to_be_updated.project_manager === undefined){
      this.lacking_project_manager = true;
    }
    else{
      this.lacking_project_manager = false;
    }
  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
       this.router.navigate([''])
     }

    else if (this.service.user_type === "Team Member") {
       this.router.navigate(['restricted'])
     }

     else {
    this.current_project_manager();
    this.possible_project_managers();
    this.form();
    }
  }

  onClickSubmit(data) {
    if(data.name === '' && data.img === '' &&
      (!(this.lacking_project_manager) || data.project_manager === '' || data.project_manager === undefined)){
      this.invalid_name = false;
      this.totally_empty = true;
      this.invalid = false;
      this.success = false;
      this.repeated_field = false;
    }
    else if (!(/^[a-zA-Z ]+$/.test(data.name)) && !(data.name === '')) {
      this.invalid_name = true;
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.repeated_field = false;
    }
    else if(!(this.new_name(data.name))){
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = true;
      this.success = false;
      this.repeated_field = false;
    }
    else if(data.name === this.service.company_to_be_updated.name || data.img === this.service.company_to_be_updated.image){
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.repeated_field = true;
    } else if (this.new_name(data.name)){
        if (!(data.name === '')){
          this.service.company_to_be_updated.name = data.name;
          this.update_members(data.name, this.service.company_to_be_updated);
        }
        if (!(data.img === '')){
          this.service.company_to_be_updated.image = data.img;
        }
        if(!(data.project_manager === '' || data.project_manager === undefined || !(this.lacking_project_manager))){
          this.service.company_to_be_updated.project_manager = this.search_modify_user(data.project_manager,
            this.service.company_to_be_updated.name);
        }
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = false;
      this.success = true;
      this.repeated_field = false;
      this.possible_project_managers();
      this.current_project_manager();
      console.log(this.service.companies);
      this.form();
    }
    console.log(this.service.companies);
  }

  search_modify_user(username, company_name) {
    for (let user of this.service.users){
      if (user.username === username){
        user.company_name = company_name;
        console.log(user);
        return user;
      }
    }
  }

  update_members(company_name, company) {
    if (!(company.project_manager === undefined)) {
      company.project_manager.company_name = company_name;
    }
    if (!(company.team_members === [])) {
      for (let team_member of company.team_members) {
        team_member.company_name = company_name;
      }
    }
  }

}

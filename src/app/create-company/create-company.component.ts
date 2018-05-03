import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from "../shared/company";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
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
          if(company.project_manager_username === user.username){
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

  formdata;
  project_managers;
  invalid = false;
  success = false;
  hide = true;
  user;

  ngOnInit() {
    /*if (this.service.user_type === undefined) {
       this.router.navigate([''])
     }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
       this.router.navigate(['restricted'])
     }

     else {*/
      this.possible_project_managers();
      this.form();
    //}
  }

  onClickSubmit(data) {
    if(this.new_name(data.name)){
      this.service.companies.push(new Company(data.name,data.project_manager,data.img))
      this.invalid = false;
      this.success = true;
      this.possible_project_managers();
      this.form();
    }
    else{
      this.invalid = true;
      this.success = false;
    }
  }

}

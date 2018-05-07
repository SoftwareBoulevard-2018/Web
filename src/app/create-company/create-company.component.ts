import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../shared/company';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  // Variables necessary for the fucntionality of the forms and the data input validations
  formdata;
  project_managers;
  invalid = false;
  invalid_url = false;
  success = false;
  user;

  constructor(public service: GeneralServiceService, public router: Router) { }

  form() {
    // Defines the default state of the form
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
  }

  possible_project_managers() {
    // Searches for the available project managers to be assigned to a company
    this.project_managers = [];
    for (const user of this.service.users) {
      if (user.role === 'Project Manager') {
        this.project_managers.push(user);
        for (const company of this.service.companies) {
          if (!(company.project_manager === undefined) && company.project_manager.username === user.username) {
            this.project_managers.pop();
            break;
          }
        }
      }
    }
  }

  new_name(name) {
    // Validates if the name input is an unique name
    for (const company of this.service.companies) {
      if (name === company.name) {
        return false;
      }
    }
    return true;
  }


  ngOnInit() {
    // Defines the available project managers and puts the form in default state
    if (this.service.user_type === undefined) {
       this.router.navigate(['']);
     } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
       this.router.navigate(['restricted']);
     } else {
      this.possible_project_managers();
      this.form();
    }
  }

  onClickSubmit(data) {
    // Makes distinct validations
    if ((!(data.img.substring(0, 4) === 'http') || (!(data.img.substring(data.img.length - 3) === 'jpg')
      && !(data.img.substring(data.img.length - 3) === 'png'))) && !(data.img === '')) {
      this.invalid_url = true;
      this.invalid = false;
      this.success = false;
    } else if (this.new_name(data.name)) {
      this.service.companies.push(new Company(data.name, this.search_modify_user(data.project_manager, data.name), data.img));
      this.invalid_url = false;
      this.invalid = false;
      this.success = true;
      this.possible_project_managers();
      this.form();
    } else {
      this.invalid_url = false;
      this.invalid = true;
      this.success = false;
    }
    console.log(this.service.companies);
  }

  search_modify_user(username, company_name) {
    // Searches for a user by its username and updates its data
    for (const user of this.service.users) {
      if (user.username === username) {
        user.company_name = company_name;
        console.log(user);
        return user;
      }
    }
  }

}

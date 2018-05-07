import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";

@Component({
  selector: 'app-chooseproject',
  templateUrl: './chooseproject.component.html',
  styleUrls: ['./chooseproject.component.css']
})
export class ChooseprojectComponent implements OnInit {
  formdata;
  project_managers;
  invalid = false;
  success = false;
  company_find;
  project;
  aux;

  constructor(public service: GeneralServiceService, public router: Router) { }

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

  possible_members() {
    this.company_find = this.search_company_pm(this.service.username);
    this.project_managers = []
    for (let project of this.service.projects) {
      if (this.company_find !== undefined) {
        if (this.company_find.capacity_k >= project.required_k) {
          this.project_managers.push(project);
        }
      }

  else {
        this.invalid = true;

      }
    }
  }

  search_company_pm (name_pm) {
    for (let company of this.service.companies) {
      if (company.project_manager !== undefined) {
        if (company.project_manager.username === name_pm ) {
          return company;
        }
      }
    }
  }

  onClickSubmit(data) {
    this.aux=[];
    if(data.project_manager != this.service.username) {
      this.aux.push(data.project_manager, this.service.username);
      this.success = true;
      this.invalid = false;
    }
    else{
      this.success = false;
      this.invalid = true;
    }
  }

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


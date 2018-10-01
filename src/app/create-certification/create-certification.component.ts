import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../shared/user";
import { InstantProject } from "../shared/instantProject";
import { BiddingProject } from "../shared/biddingProject";
import { MatSelect } from "@angular/material";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create-certification',
  templateUrl: './create-certification.component.html',
  styleUrls: ['./create-certification.component.css']
})
export class CreateCertificationComponent implements OnInit {

  form() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      category: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      level: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  formdata;
  categories = ["Analyst", "Developer", "Tester"];

  ngOnInit() {
    // Checks User permissions and establishes the form in the default state
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    }

    else {
      this.form();
    }
  }

  onClickSubmit(formdata) {
    this.service.certrole = formdata.category;
    this.service.certlevel = formdata.level;
    this.router.navigate(['home/set-up/create-certification/new-certification'])

  }


}

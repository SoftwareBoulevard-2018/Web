import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {



  constructor(public service: GeneralServiceService, public router: Router) { }

  redirect1(event) {
	// Redirects to New Bidding project
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate(['home/set-up/create-project/new-bidding-project']);
    }
  }

  redirect2(event) {
	// Redirects to New Instant project project
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate(['home/set-up/create-project/new-instant-project']);
    }
  }

  ngOnInit() {
	  // Checks user permissions
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }
    this.service.developerQ = [];
    this.service.analystQ = [];
    this.service.testerQ = [];
  }

}

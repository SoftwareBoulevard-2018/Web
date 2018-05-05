import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";

@Component({
  selector: 'app-pmfunctions',
  templateUrl: './pmfunctions.component.html',
  styleUrls: ['./pmfunctions.component.css']
})
export class PmfunctionsComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) {
  }

  redirect4(event) {
    if(this.service.user_type === "Project Manager"){
      this.router.navigate(['home/users/projectmanager/functions/recruit']);
    }
    else{
      this.router.navigate(['home/users/user-status']);
    }
  }

  redirect5(event) {
    if(this.service.user_type === "Project Manager"){
      this.router.navigate(['home/users/projectmanager/functions/chooseproject']);
    }
    else{
      this.router.navigate(['home/companies/company-status']);
    }
  }

  redirect6(event) {
    if(this.service.user_type === "Project Manager"){
      this.router.navigate(['home/users/projectmanager/functions/estimation']);
    }
    else{
      this.router.navigate(['home/recruit']);
    }
  }

  redirect7(event) {
    if(this.service.user_type === "Project Manager"){
      this.router.navigate(['restricted']);
    }
    else{
      this.router.navigate(['home/recruit']);
    }
  }

  home_user_type;

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }
  }
}

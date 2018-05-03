import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {

  }

  redirectHome(event) {

    if(this.service.user_type === "Game Administrator"){
      this.router.navigate(['home'])
    }
    else if(this.service.user_type === "Project Manager"){
      this.router.navigate(['home'])
    }
    else if(this.service.user_type === "Team Member"){
      this.router.navigate(['home'])
    }
    else{
      this.router.navigate(['home'])
    }
  }

  redirectMyCompany(event) {
    this.router.navigate(['home/companies/company-status'])
  }
  redirectMyStatus(event){
    this.router.navigate(['home/users/user-status'])
  }

  redirectCompanies(event){
    this.router.navigate(['home/companies'])
  }
  redirectCreateCompany(event){
    this.router.navigate(['home/companies/create'])
  }
  redirectUsers(event){
    this.router.navigate(['home/users'])
  }
  redirectCreateUser(event){
    this.router.navigate(['home/users/create'])
  }
  redirectReports(event){
    this.router.navigate(['home/reports'])
  }

  redirectLogout(event){
    this.service.username = undefined;
    this.service.user_type = undefined;
    this.router.navigate([''])
  }

}


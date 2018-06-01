import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-certification',
  templateUrl: './create-certification.component.html',
  styleUrls: ['./create-certification.component.css']
})
export class CreateCertificationComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  redirect1(event) {
	// Redirects to New Bidding project
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate([]);
    }
  }

  redirect2(event) {
	// Redirects to New Instant project project
    if(this.service.user_type === "Game Administrator"){
      this.router.navigate([]);
    }
  }

  redirect3(event) {
    // Redirects to New Instant project project
      if(this.service.user_type === "Game Administrator"){
        this.router.navigate([]);
      }
    }

  ngOnInit() {
	  // Checks user permissions
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }
  }
}

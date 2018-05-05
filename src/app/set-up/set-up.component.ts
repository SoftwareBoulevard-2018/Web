import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.css']
})
export class SetUpComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  redirect1(event) {
    this.router.navigate(['home/set-up/create-project']);
  }

  redirect2(event) {
    this.router.navigate(['home/set-up/update-question']);
  }

  redirect3(event) {
    this.router.navigate(['home/set-up/create-question']);
  }

  redirect4(event) {
    this.router.navigate(['home/set-up/update-question']);
  }

  redirect5(event) {
    this.router.navigate(['home/set-up/create-puzzle']);
  }

  redirect6(event) {
    this.router.navigate(['home/set-up/update-puzzle']);
  }

  redirect7(event) {
    this.router.navigate(['home/set-up/update-parameters']);
  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
  }

}
}

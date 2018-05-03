import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  redirect(event){
    this.router.navigate(['home/users/create']);
  }

  home_user_type;

  ngOnInit() {
    /*if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }*/
  }
}

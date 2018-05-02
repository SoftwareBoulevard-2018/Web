import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }
  }

}

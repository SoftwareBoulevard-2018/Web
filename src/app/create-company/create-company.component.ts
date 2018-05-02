import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }
  }

}

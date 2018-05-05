import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    if (this.service.user_type !== "Game Administrator") {
       this.router.navigate(['restricted'])
     }
  }

}

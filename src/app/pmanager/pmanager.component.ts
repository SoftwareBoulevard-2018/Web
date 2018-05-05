import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";

@Component({
  selector: 'app-pmanager',
  templateUrl: './pmanager.component.html',
  styleUrls: ['./pmanager.component.css']
})
export class PmanagerComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
  }

}

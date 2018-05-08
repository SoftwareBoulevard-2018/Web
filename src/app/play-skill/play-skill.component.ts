import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";

import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";

@Component({
  selector: 'app-play-skill',
  templateUrl: './play-skill.component.html',
  styleUrls: ['./play-skill.component.css']
})
export class PlaySkillComponent {
Qasnwer: String;

answers = [
  'Respuesta a',
  'Respuesta b',
  'Respuesta c',
  'Respuesta d',
];

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
  }

}

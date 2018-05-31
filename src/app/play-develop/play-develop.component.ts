import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {Answer} from '../shared/answer';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-play-develop',
  templateUrl: './play-develop.component.html',
  styleUrls: ['./play-develop.component.css']
})
export class PlayDevelopComponent implements OnInit {
  correct ;
  control: Answer;
  quest ;
  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    this.quest = this.service.questions[0];
    this.correct = obtain_correct(this.service.questions[0]);
  }

  redirect1(event){
    this.service.user.companyId = null;
    this.httpService.updateUser(this.service.user, this.service.user.id);
  }

}
function  obtain_correct(Quest_n) {
  for (const correct of Quest_n.questions){
    if ( correct.state === true ){
      return correct;
    }
  }

}

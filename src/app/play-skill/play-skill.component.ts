import {Component, OnInit, ɵdevModeEqual} from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {Answer} from '../shared/answer';
import {Question} from '../shared/question';
import {EmailComponent} from '../email/email.component';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-play-skill',
  templateUrl: './play-skill.component.html',
  styleUrls: ['./play-skill.component.css']
})
export class PlaySkillComponent implements OnInit{
correct ;
control: Answer;
quest ;


  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    this.quest = this.service.questions[0];
    this.correct = obtain_correct(this.service.questions[0]);
  }


}
function  obtain_correct(Quest_n) {
  for (const correct of Quest_n.questions){
    if ( correct.state === true ){
      return correct;
    }
  }
}

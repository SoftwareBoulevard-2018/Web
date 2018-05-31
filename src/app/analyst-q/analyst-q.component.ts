import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Question} from '../shared/question';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-analyst-q',
  templateUrl: './analyst-q.component.html',
  styleUrls: ['./analyst-q.component.css']
})
export class AnalystQComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  questions = [];
  questions2: MatTableDataSource<Question>;

  table_titles = ['_id', 'description'];

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.questions2 = new MatTableDataSource(this.questions);
      this.getAllAnalystQuestions();
      console.log(this.questions2);
    }
  }

  applyFilter(value){}

  redirect(event, element){}

  getAllAnalystQuestions(){
    this.httpService.getQuestions().subscribe(data => {
      const preguntas = JSON.parse(JSON.stringify(data));
      for (var question in preguntas){
        console.log(question);
      }
    });
  }
}

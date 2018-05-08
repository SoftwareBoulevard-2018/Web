import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
	

  constructor(public service: GeneralServiceService, public router: Router) { }
  
  questions = [];
  questions2;
  
  table_titles = ["id","decription","update"];

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    } else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    } else {
      this.questions = JSON.parse(JSON.stringify(this.service.questions));
      this.questions2 = new MatTableDataSource(this.questions);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions2.filter = filterValue;
  }

  search_question(description){
    for(let question of this.questions){
      if(description === question.description){
        return question;
      }
    }
  }

  redirect(event,element){
    this.service.question_to_be_updated = this.search_question(element.description);
    this.router.navigate(['home/set-up/edit-question']);
  }
  
}

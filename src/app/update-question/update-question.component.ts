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
	
	questions = [];
	question1;
	
	table_titles = ["id", "description", "update"];

  constructor(public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
	// Checks User permissions and transforms the data to the format read by material tables
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    }

    else {
      this.questions = JSON.parse(JSON.stringify(this.service.questions));
      this.question1 = new MatTableDataSource(this.questions);
    }
  }
  
  applyFilter(filterValue: string) {
	// Function necessary by the table filter
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.question1.filter = filterValue;
  }
  
  search_question(description) {
	// Searches question by its description
    for (let question of this.service.questions) {
      if (question.description === description) {
        return question;
      }
    }
  }
  
  redirect(event, element) {
	// Redirects to edit question and sends the necessary variables
    this.service.question_to_be_updated = this.search_question(element.description);
    this.router.navigate(['home/set-up/update-question/edit-question']);
  }

}

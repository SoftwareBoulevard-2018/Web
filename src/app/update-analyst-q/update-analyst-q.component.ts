import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Question } from '../shared/question';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-update-analyst-q',
  templateUrl: './update-analyst-q.component.html',
  styleUrls: ['./update-analyst-q.component.css']
})
export class UpdateAnalystQComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  questions = [];
  questionss = [];
  assignment = [];
  questions2: MatTableDataSource<Question>;
  questions3: MatTableDataSource<Question>;
  vacio;
  maximo;
  maximo1;
  question;

  table_titles = ['description', 'add'];
  table_titles2 = ['description', 'remove'];

  ngOnInit() {
    this.vacio = true;
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.questions2 = new MatTableDataSource(this.questions);
      this.questions3 = new MatTableDataSource(this.questionss);
      this.service.analystQ = [];
      this.service.developerQ = [];
      this.service.testerQ = [];
      this.getAllAnalystQuestions();
      this.getAllAnalystQuestions2();
    }
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions2.filter = filterValue;
  }

  applyFilter2(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions3.filter = filterValue;
  }

  redirect(event, element) {
    if (this.service.user_type === "Game Administrator") {
      if (this.encontrar(element, this.questions3)) {
        this.vacio = true;
        this.questions3.data.push(element);
        this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
        this.service.analystQ.push(element);
        var index = this.questions2.data.indexOf(element);
        this.questions2.data.splice(index, 1);
        this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
      }
      if (this.questions3.data.length >= this.service.numAna) {
        this.maximo = false;
        this.maximo1 = false;
      }
    }
  }

  redirect2(event) {
    // Redirects to New Instant project project
    if (this.service.user_type === "Game Administrator") {
      this.router.navigate(['home/set-up/update-project/update-analyst-questions']);
    }
  }

  encontrar(elemento, objeto){
    for (const question of Object.values(objeto.data)) {
      if (question._id === elemento._id) {
        return true;
      }
    }
    return false;
  }

  redirect3(event, element) {
    if (this.service.user_type === "Game Administrator") {
      console.log(this.questions2.data);
      if (!(this.encontrar(element, this.questions2))) {
        this.questions2.data.push(element);
        this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
        var index = this.questions3.data.indexOf(element);
        var index2 = this.service.analystQ.indexOf(element);
        this.service.analystQ.splice(index2, 1);
        this.questions3.data.splice(index, 1);
        this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      }
      else {
        var index = this.questions3.data.indexOf(element);
        var index2 = this.service.analystQ.indexOf(element);
        this.service.analystQ.splice(index2, 1);
        this.questions3.data.splice(index, 1);
        this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      }
      if (this.questions3.data.length === 0) {
        this.vacio = false;
        this.maximo1 = false;
      }
      else if(this.questions3.data.length > this.service.numAna){
        this.vacio = true;
        this.maximo1 = false;
        this.maximo = false;
      }
    }
  }

  getAllAnalystQuestions() {
    return this.httpService.getAssignment().subscribe(data => this.listQuestions(data));
  }

  getAllAnalystQuestions2() {
    return this.httpService.getQuestions().subscribe(data => this.listQuestions2(data));
  }

  getQuestionById(id) {
    return this.httpService.getQuestionsById(id);
  }

  listQuestions(data) {
    this.questions = [];
    for (const assignment of Object.values(data.data)) {
      this.assignment.push(assignment);
      this.getQuestionById(assignment.question).subscribe(data => {
        if (assignment.project === this.service.project_to_be_updated._id) {
          if (data.role === 'Analyst') {
            this.service.analystQ.push(data);
            this.questionss.push(data);
            console.log(data);
            this.questions3.data = this.questionss;
          }
        }
      });
    }
    if (this.questions3.data.length > this.service.numAna) {
      this.maximo = false;
      this.maximo1 = false;
    }
    else if (this.questions3.data.length === this.service.numAna) {
      this.maximo = false;
      this.maximo1 = true;
    }
    else {
      this.maximo1 = false;
      this.maximo = true;
    }
  }

  listQuestions2(data) {
    this.questions = [];
    for (const question of Object.values(data.data)) {
      if (question.role == 'Analyst') {
        this.questions.push(question);
        this.questions2.data = this.questions;
      }
    }
  }

}

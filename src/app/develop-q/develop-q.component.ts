import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Question} from '../shared/question';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-develop-q',
  templateUrl: './develop-q.component.html',
  styleUrls: ['./develop-q.component.css']
})
export class DevelopQComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  questions = [];
  questions2: MatTableDataSource<Question>;
  questions3: MatTableDataSource<Question>;
  vacio = false;
  maximo = true;

  table_titles = ['description', 'add'];
  table_titles2 = ['description', 'remove'];

  ngOnInit() {
    this.vacio = false;
    this.maximo = true;
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.questions2 = new MatTableDataSource(this.questions);
      this.questions3 = new MatTableDataSource(this.questions);
      this.getAllAnalystQuestions();
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
      this.vacio = true;
      this.questions3.data.push(element);
      this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      this.service.developerQ.push(element);
      var index = this.questions2.data.indexOf(element);
      this.questions2.data.splice(index, 1);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
      if (this.questions3.data.length === this.service.numDev){
        this.maximo = false;
      }
    }
  }
  
  redirect2(event) {
    if (this.service.user_type === "Game Administrator") {
      this.router.navigate(['home/set-up/create-project/tester-questions']);
    }
  }
  
  redirect3(event, element) {
    if (this.service.user_type === "Game Administrator") {
      this.questions2.data.push(element);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
      var index = this.questions3.data.indexOf(element);
      var index2 = this.service.developerQ.indexOf(element);
      this.service.developerQ.splice(index2, 1);
      this.questions3.data.splice(index, 1);
      this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      if(this.questions3.data.length === 0){
        this.vacio = false;
      }
      this.maximo = true;
    }
  }

  getAllAnalystQuestions(){
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data){
    console.log(data);
    this.questions = [];
    for (const question of Object.values(data.data)) {
	 if (question.role == 'Developer'){
      this.questions.push(question);
      this.questions2.data = this.questions;
      console.log(this.questions2);
     }
    }
  }
}

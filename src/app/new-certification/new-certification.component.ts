import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Question } from '../shared/question';
import { HttpService } from '../http.service';
import { creationCertification } from '../shared/creationCertification';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.css']
})
export class NewCertificationComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  questions = [];
  questions2: MatTableDataSource<Question>;
  questions3: MatTableDataSource<Question>;
  question4 = [];
  certification;
  vacio = false;
  boton = false;

  table_titles = ['description', 'add'];
  table_titles2 = ['description', 'remove'];

  ngOnInit() {
    console.log(this.service.user_type);
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
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.questions3.filter = filterValue;
  }

  redirect(event, element) {
    if (this.service.user_type === "Game Administrator") {
      this.vacio = true;
      this.boton = true;
      this.question4.push(element._id);
      this.questions3.data.push(element);
      this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      var index = this.questions2.data.indexOf(element);
      this.questions2.data.splice(index, 1);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
    }
  }

  redirect3(event, element) {
    if (this.service.user_type === "Game Administrator") {
      this.questions2.data.push(element);
      this.questions2 = new MatTableDataSource<Question>(this.questions2.data);
      var index2 = this.question4.indexOf(element._id);
      this.question4.splice(index2, 1);
      var index = this.questions3.data.indexOf(element);
      this.questions3.data.splice(index, 1);
      this.questions3 = new MatTableDataSource<Question>(this.questions3.data);
      if(this.questions3.data.length === 0){
        this.vacio = false;
        this.boton = false;
      }
    }
  }

  createCertification(certification) {
    return this.httpService.createCertification(certification).subscribe(data => console.log(data));
  }

  redirect2(event) {
    // Redirects to New Instant project project
    this.certification = new creationCertification(this.service.certlevel, this.service.certrole, this.question4);
    this.createCertification(this.certification);
    if (this.service.user_type === "Game Administrator") {
      this.router.navigate(['home/set-up']);

    }
  }

  getAllAnalystQuestions() {
    return this.httpService.getQuestions().subscribe(data => this.listQuestions(data));
  }

  listQuestions(data) {
    this.questions = [];
    for (const question of Object.values(data.data)) {
      if (question.role == this.service.certrole) {
        this.questions.push(question);
        this.questions2.data = this.questions;;
      }
    }
  }

}

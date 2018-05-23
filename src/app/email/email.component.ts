import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppComponent } from '../app.component';
import { Email } from '../shared/email';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit  {

  formdata;

  users = [];

  emailWindowOpen = false;
  inInbox = true;
  inSent = false;
  inAEmail = false;
  inNewEmail = false;

  selectedEmail : Email;
  numNoReadEmails : number = 7;
  selectedUsers = [];

  table_titles = ['username', 'subject-content', 'date'];
  dataSource = new MatTableDataSource(EMAILS);

  constructor(public service: GeneralServiceService) { 
  }

  newEmailForm() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      receivers: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      subject: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      content: new FormControl('',
        Validators.compose([
          Validators.minLength(2)
        ]))
    });
  }


  ngOnInit() {
    this.newEmailForm();

    this.users = JSON.parse(JSON.stringify(this.service.users));

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  searchUserFn(term: string, item){
    term = term.toLowerCase();
    let nameMatch = item.name.toLowerCase().indexOf(term) > -1;
    let roleMatch = item.role.toLowerCase().indexOf(term) > -1;
    let usernameMatch = item.username.toLowerCase().indexOf(term) > -1;
    let companyMatch: boolean;

    if ( item['company_name'] ) {
      companyMatch = item.company_name.toLowerCase().indexOf(term) > -1;
    } else {
      companyMatch = false;
    }

    return nameMatch || roleMatch || usernameMatch || companyMatch;  
  }

  openCloseEmail(){
    this.emailWindowOpen = !this.emailWindowOpen;
    this.users = JSON.parse(JSON.stringify(this.service.users));
  }

  readEmail(email) {
    this.selectedEmail = email;
    this.inInbox = false;
    this.inNewEmail = false;
    this.inSent = false;
    this.inAEmail = true;
  }

  toInbox(){
    this.inAEmail = false;
    this.inNewEmail = false;
    this.inSent = false;
    this.inInbox = true;
    setTimeout(() => this.ngAfterViewInit());
  }

  toSent(){
    this.inAEmail = false;
    this.inInbox = false;
    this.inNewEmail = false;
    this.inSent = true;
    setTimeout(() => this.ngAfterViewInit());
  }

  toNewEmail(){
    this.inAEmail = false;
    this.inInbox = false;
    this.inSent = false;
    this.inNewEmail = true;
  }


}

export interface Email {
  id: number;
  sender: string;
  // receiver: string;
  subject: string;
  content: string;
  date: string;
  state: string;
}

const EMAILS : Email[] = [
  {id: 0, subject:"Ready to play", sender:"juclondonome", date:"20/04/2018", state:"unread", content:"Hi Victor.\nI'm ready to play now, just send me an email to let me know."},
  {id: 1, subject:"I'm busy this weekend", sender:"vdjaramillog", date:"19/04/2018", state:"unread", content:"Hello every one,\nright this weekend is my sister's marrige so i wont be able to work. \n Happy weeekend"},
  {id:2,subject:"Hell this is hard",sender:"bmaring",date:"15/04/2017",state:"read",content:"Hi, my name is Bianca, i've been trying to solve a cuple puzzles this weekend, but they imposible. \nIf any body can help me, i will apreciated."},
  {id:3,subject:"New team member",sender:"cmzapata",date:"10/04/2017",state:"unread",content:"There is a new team member in your team, very good in solving Analyst questions. \n Good night."},
  {id: 0, subject:"Ready to play", sender:"juclondonome", date:"20/04/2018", state:"read", content:"Hi Victor.\nI'm ready to play now, just send me an email to let me know."},
  {id: 1, subject:"I'm busy this weekend", sender:"vdjaramillog", date:"19/04/2018", state:"unread", content:"Hello every one,\nright this weekend is my sister's marrige so i wont be able to work. \n Happy weeekend"},
  {id:2,subject:"Hell this is hard",sender:"bmaring",date:"15/04/2017",state:"read",content:"Hi, my name is Bianca, i've been trying to solve a cuple puzzles this weekend, but they imposible. \nIf any body can help me, i will apreciated."},
  {id:3,subject:"New team member",sender:"cmzapata",date:"10/04/2017",state:"read",content:"There is a new team member in your team, very good in solving Analyst questions. \n Good night."},
  {id: 0, subject:"Ready to play", sender:"juclondonome", date:"20/04/2018", state:"unread", content:"Hi Victor.\nI'm ready to play now, just send me an email to let me know."},
  {id: 1, subject:"I'm busy this weekend", sender:"vdjaramillog", date:"19/04/2018", state:"read", content:"Hello every one,\nright this weekend is my sister's marrige so i wont be able to work. \n Happy weeekend"},
  {id:2,subject:"Hell this is hard",sender:"bmaring",date:"15/04/2017",state:"read",content:"Hi, my name is Bianca, i've been trying to solve a cuple puzzles this weekend, but they imposible. \nIf any body can help me, i will apreciated."},
  {id:3,subject:"New team member",sender:"cmzapata",date:"10/04/2017",state:"read",content:"There is a new team member in your team, very good in solving Analyst questions. \n Good night."},
  {id: 0, subject:"Ready to play", sender:"juclondonome", date:"20/04/2018", state:"unread", content:"Hi Victor.\nI'm ready to play now, just send me an email to let me know."},
  {id: 1, subject:"I'm busy this weekend", sender:"vdjaramillog", date:"19/04/2018", state:"read", content:"Hello every one,\nright this weekend is my sister's marrige so i wont be able to work. \n Happy weeekend"},
  {id:2,subject:"Hell this is hard",sender:"bmaring",date:"15/04/2017",state:"read",content:"Hi, my name is Bianca, i've been trying to solve a cuple puzzles this weekend, but they imposible. \nIf any body can help me, i will apreciated."},
  {id:3,subject:"New team member",sender:"cmzapata",date:"10/04/2017",state:"unread",content:"There is a new team member in your team, very good in solving Analyst questions. \n Good night."},
]

import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpService } from '../http.service';
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
  numNoReadEmails : number = 0;
  selectedUsers = [];
  EReceived = [];
  table_titles = ['sender','subject', 'createdAt'];
  dataSource:MatTableDataSource<Email>;

  constructor(public httpService: HttpService, public service: GeneralServiceService) { 
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
  newNotification(){
  	this.numNoReadEmails = this.EReceived.length;
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
    this.dataSource = new MatTableDataSource(this.EReceived);
    this.read();

  }
  read(){
    this.EReceived = [];
  	return this.httpService.read(this.service.user._id).subscribe( data => {
        // Aquí va el código donde el argumento data es lo que vino en la consulta
    	const datos =JSON.parse(JSON.stringify(data));
      for(let i = 0; i<datos.data.length;i++){
          this.EReceived.push({id:datos.data[i].id,
            sender:datos.data[i].sender,
            subject:datos.data[i].subject,
            receivers:datos.data[i].receivers,
            content:datos.data[i].content,
            createdAt:datos.data[i].createdAt,
            acknowledgment: datos.data[i].acknowledgment});
      }
      console.log(this.EReceived);
      this.dataSource.data = this.EReceived;
       this.newNotification();
    }, error => {
        console.log(error);
    });


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

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
  users =[];
  emailWindowOpen = false;
  inInbox = true;
  inSent = false;
  inAEmail = false;
  inNewEmail = false;
  selectedEmail : Email;
  numNoReadEmails : number = 0;
  selectedUsers = [];
  EReceived = [];
  ESent = [];
  table_titles = ['sender','subject-content', 'createdAt'];
  table_titles_sent =['receivers','subject-content', 'createdAt'];
  TInbox:MatTableDataSource<Email>;
  TSent:MatTableDataSource<Email>;
  constructor(public httpService: HttpService, public service: GeneralServiceService) { 
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.TInbox.filter = filterValue;
    this.TSent.filter = filterValue;
  }

  getUsers(){
    return this.httpService.getAllUsers().subscribe(data => {
      this.users=JSON.parse(JSON.stringify(data)).data;
    });
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
  newNotification(){
    this.numNoReadEmails = this.EReceived.length;
  }
  ngAfterViewInit() {
    this.TInbox.paginator = this.paginator;
    this.TSent.paginator = this.paginator;
  }
  ngOnInit() {
    this.newEmailForm();
    this.getUsers();
}
  openCloseEmail(){
    this.emailWindowOpen = !this.emailWindowOpen;
    this.users = JSON.parse(JSON.stringify(this.service.users));
    this.TInbox = new MatTableDataSource(this.EReceived);
    this.TSent = new MatTableDataSource(this.ESent);
    this.starter();
  }
  read(){
    this.EReceived = [];
    return this.httpService.read(this.service.user._id).subscribe( data => {
        // Aquí va el código donde el argumento data es lo que vino en la consulta
      const datos =JSON.parse(JSON.stringify(data));
      for(let i = 0; i<datos.data.length;i++){
          this.EReceived.push({
            id:datos.data[i].id,
            sender:this.findUserById(datos.data[i].sender),
            subject:datos.data[i].subject,
            receivers:datos.data[i].receivers,
            content:datos.data[i].content,
            createdAt:datos.data[i].createdAt});
      }
      this.TInbox.data = this.EReceived;
      this.newNotification();
    }, error => {
        console.log(error);
    });
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
  sent(){
    this.ESent = [];
    return this.httpService.sended(this.service.user.id).subscribe(data =>{
      const datos =JSON.parse(JSON.stringify(data));
      for(let i = 0; i<datos.data.length;i++){
        for(let j= 0; j<datos.data[i].receivers.length;j++){
              datos.data[i].receivers[j]=this.findUserById(datos.data[i].receivers[j]);
        }
      }
      for(let i = 0; i<datos.data.length;i++){
        this.ESent.push({
          id:datos.data[i].id,
          subject:datos.data[i].subject,
          receivers:datos.data[i].receivers,
          content:datos.data[i].content,
          createdAt:datos.data[i].createdAt,
          acknowledgment: datos.data[i].acknowledgment
        });
      }
      this.TSent.data = this.ESent;
      /*data source*/
    });
  }
  findUserById(userId){
    for(let i = 0; i<this.users.length;i++){
      if(this.users[i]._id==userId){
        return this.users[i].name;
      }
    }
  }
  starter(){
       this.read();
       this.getUsers();
       this.sent();
       this.newNotification();
  }
 submitEmail(data){
   let rec :[string] = [""]; 
   for(let i = 0; i<data.receivers.length;i++){
     console.log(data.receivers[i].id.toString());
     rec[i]= data.receivers[i].id.toString();
   }
   console.log(rec);
    let email = new Email(
        this.service.user.id,
        data.subject,
        rec,
        data.content,
      )
    return this.httpService.send(email).subscribe(data => console.log(data));
  }
  readEmail(email) {
    this.selectedEmail = email;
    this.inInbox = false;
    this.inNewEmail = false;
    this.inSent = false;
    this.inAEmail = true;
    alert(email.id);
     if(email.acknowledgment == undefined){
       email.acknowledgment = [];
      email.acknowledgment[0]=this.service.user.id;
      console.log("agregar1");
      this.updateState(email,email.id);
     }else{
       var found = undefined;
      for(let i =0;i<email.acknowledge.length;i++){
        if(email.acknowledgment[i]==this.service.user.id){
          found=true;
        }
      }
      if(found == undefined){
        email.acknowledgment.push(this.service.user.id);
        console.log("agregar2");
        this.updateState(email,email.id);
      }
     }
     this.starter();
    
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
  updateState(email, emailId){
    return this.httpService.updateState(emailId,email).subscribe(data => {});
  }
  emailDate(isoDate){
    let date = new Date(isoDate);
    return (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
  }

  emailHour(isoDate){
    let date = new Date(isoDate);
    return (date.getHours() + ":" + date.getMinutes());
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
}

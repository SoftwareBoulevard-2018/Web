import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  showAllReceivers = false;
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

  ngOnInit() {
    this.newEmailForm();
    this.getUsers();
    this.TInbox = new MatTableDataSource(this.EReceived);
    this.TSent = new MatTableDataSource(this.ESent);
  }

  @ViewChild('paginatorInbox') paginatorInbox: MatPaginator;
  @ViewChild('paginatorSent') paginatorSent: MatPaginator;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.TInbox.filter = filterValue;
    this.TSent.filter = filterValue;
  }

  getUsers(){
    // return this.httpService.getAllUsers().subscribe(data => {
    //   this.users=JSON.parse(JSON.stringify(data)).data;
    // });
    return this.httpService.getAllUsers().subscribe(data => this.listUser(data));
    
  }

  getCompanyById(companyId, user) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      user.companyName = data.name;
      this.users.push({ id: user.id, createdAt: user.createdAt,
        name: user.name, username: user.username,
        password: user.password, role: user.role, companyName: user.companyName});
    }, error => {
        user.companyName = undefined;
        this.users.push({ id: user.id, createdAt: user.createdAt,
          name: user.name, username: user.username,
          password: user.password, role: user.role, companyName: user.company_name});
      });
  }

  listUser(data) {
    this.users = [];
    data = JSON.parse(JSON.stringify(data)).data
    for (let user of data) {
      if (user.companyId == null){
        this.users.push({ id: user.id, createdAt: user.createdAt,
          name: user.name, username: user.username,
          password: user.password, role: user.role});
      }
      else {
        this.getCompanyById(user.companyId, user);
      } 
    }
    
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
    this.TInbox.paginator = this.paginatorInbox;
    this.TSent.paginator = this.paginatorSent;
  }

  openCloseEmail(){
    this.emailWindowOpen = !this.emailWindowOpen;

    this.users = JSON.parse(JSON.stringify(this.service.users));
    this.TInbox = new MatTableDataSource(this.EReceived);
    this.TSent = new MatTableDataSource(this.ESent);
    this.starter();
    setTimeout(() => this.ngAfterViewInit());
  }
  read(){
    this.EReceived = [];
    return this.httpService.read(this.service.user._id).subscribe( data => {
        // Aquí va el código donde el argumento data es lo que vino en la consulta
      const datos =JSON.parse(JSON.stringify(data));
      for(let i = 0; i<datos.data.length;i++){
          this.EReceived.push({
            id:datos.data[i].id,
            sender:datos.data[i].sender,
            subject:datos.data[i].subject,
            receivers:datos.data[i].receivers,
            content:datos.data[i].content,
            acknowledgment: datos.data[i].acknowledgment,
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

    if ( item['companyName'] ) {
      companyMatch = item.companyName.toLowerCase().indexOf(term) > -1;
    } else {
      companyMatch = false;
    }

    return nameMatch || roleMatch || usernameMatch || companyMatch;  
  }
  sent(){
    this.ESent = [];
    return this.httpService.sent(this.service.user.id).subscribe(data =>{
      const datos =JSON.parse(JSON.stringify(data));
      for(let i = 0; i<datos.data.length;i++){
        this.ESent.push({
          id:datos.data[i].id,
          sender:datos.data[i].sender,
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
      if(this.users[i].id==userId){
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
    return this.httpService.send(email).subscribe(data => {this.starter()});
  }

  checkEmailState(email,userID){
    var unreaded = true;

    if(email.acknowledgment == undefined){
      return unreaded;
    }
    else {
      for(let i=0;i<email.acknowledgment.length;i++){
        if(email.acknowledgment[i]==userID){
          return !unreaded;
        }
      }
      return unreaded;
    }
  }

  readEmail(email,v) {
    this.selectedEmail = email;
    this.inInbox = false;
    this.inNewEmail = false;
    this.inSent = false;
    this.inAEmail = true;
    if(v==0){
      if(email.acknowledgment == undefined){
        email.acknowledgment = [];
        email.acknowledgment[0]=this.service.user.id;
        this.updateState(email,email.id);
      }
      else{
        var found = undefined;
        for(let i=0;i<email.acknowledgment.length;i++){
          if(email.acknowledgment[i]==this.service.user.id){
            found=true;
          }
        }
        if(found == undefined){
          email.acknowledgment.push(this.service.user.id);
          this.updateState(email,email.id);
        }
      }
    }  
    this.starter();
  }

  printReceivers(receivers){
    var receiversName = [];
    for( let i = 0; i < receivers.length; i++ ){
      receiversName.push(this.findUserById(receivers[i]));
    }
    if (receivers.length == 1){
      return receiversName[0];
    }
    else {
      var printable;
      for( let i = 0; i < receivers.length; i++ ){
        if (receiversName[i] != null){
          if (i == 0){
            printable = receiversName[i].split(" ")[0];
          }
          else{
            printable = printable +  ", " + receiversName[i].split(" ")[0];
          }
        }
      }
      return printable;
    }
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

  @ViewChild('inEmailReceivers') elementView: ElementRef;
  containerHeight = 40;
  displayAllReceivers() {

    if (this.showAllReceivers) {
      this.containerHeight = 40;
    }
    else {
      var viewHeight;
      viewHeight = this.elementView.nativeElement.offsetHeight;
      this.containerHeight = viewHeight + 20;

    }
    
    this.showAllReceivers = !this.showAllReceivers;
  }
 
}

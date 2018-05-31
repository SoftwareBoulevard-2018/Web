import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpService } from '../http.service';
import { Email } from '../shared/email';
import { localStorageFactory } from 'angular-webstorage-service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit  {
  formdata; //New email form
  users = []; // array of users, updated with getUsers() function

  // View controllers 
  emailWindowOpen = false; // If true open Email window
  inInbox = true; // If true displays inbox of Email window
  inSent = false; // If true displays sent mail of Email window
  inAEmail = false; // If true displays a single email
  inNewEmail = false; // If true displays the new email form. 

  showAllReceivers = false; // control the dropdown div whith receivers in the single email view, if true div expanded

  selectedEmail : Email; // When click on an email and it displays on a single email view, the email data stores here
  static numNoReadEmails; // Number of unread emails
  selectedUsers = []; // Stores the users selected on the Select Receivers input in New Email view
  EReceived = []; // Stores the emails received by the user in session
  ESent = []; // Stores the emails sent by the user in session

  table_titles = ['sender','subject-content', 'createdAt']; // set the titles of the inbox table (requirement of Angular Materia table)
  table_titles_sent =['receivers','subject-content', 'createdAt']; // set the titles of the sent mails table (requirement of Angular Materia table)

  TInbox:MatTableDataSource<Email>; // Angular Material object for display the Materia Table
  TSent:MatTableDataSource<Email>; //  Angular Material object for display the Materia Table

  constructor(public httpService: HttpService, public service: GeneralServiceService) { 
  }
  // This function executes when the app is load
  ngOnInit() {
    this.newEmailForm(); // Initializes the New Email form
    this.getUsers(); // Get all users from server
    this.TInbox = new MatTableDataSource(this.EReceived); 
    this.TSent = new MatTableDataSource(this.ESent); // assigns the arrys of emails to the type of data that the Material Table understands
    this.EReceived = this.ESent = [] // Clean the arrays of emails 
    EmailComponent.numNoReadEmails=0; 
    
    //Wait 500ms to execute refreshPageOnSession(), in order to give time to the other components to be initialized.
    setTimeout(() => this.refreshPageOnSession(),500);
  }

  get staticNumNoReadEmails(){
    return EmailComponent.numNoReadEmails;
  }

  @ViewChild('paginatorInbox') paginatorInbox: MatPaginator;
  @ViewChild('paginatorSent') paginatorSent: MatPaginator; //Material requieriment for the paginators functionality 

  // Filter the data in Inbox and Sent through the input in the header of Email window
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches

    this.TInbox.filter = filterValue;
    this.TSent.filter = filterValue;
  }

  // When the page is refresh and an user is log in, this function updates all the variables that depend on server information
  // in order to displays the number of unreaded emails on the OpenEmail button
  refreshPageOnSession(){
    if(this.service.user_type != undefined){
      this.starter();
    }
  }

  // Returns the users in "data", then "data" are passed as parameter to listUser() function that assigns the useres to the local users array
  getUsers(){
    return this.httpService.getAllUsers().subscribe(data => {
      this.listUser(data);
    });
  }

  // When an user has companyID attribute, this functions search the company name and aggregate it as an attribute of user. 
  // then push it to users local array.
  getCompanyById(companyId, user) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      user.companyName = data.name;
      this.users.push({ id: user.id, createdAt: user.createdAt,
        name: user.name, username: user.username, role: user.role, companyName: user.companyName});
    }, error => {console.log(error);}
    );
  }

  // For each user getted from server this function verifies if each belongs to a company, if yes calls getCompanyById(), if not push it to local users array.
  listUser(data) {
    this.users = [];
    data = JSON.parse(JSON.stringify(data)).data
    
    for (let user of data) {
      if (user.companyId == null){
        this.users.push({ id: user.id, createdAt: user.createdAt,
          name: user.name, username: user.username, role: user.role});
      }
      else {
        this.getCompanyById(user.companyId, user);
      } 
    }

  }
  // This functions initializes the New Email form
  newEmailForm() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      receivers: new FormControl('',
        Validators.compose([
          Validators.required //Set receivers field as required
        ])),
      subject: new FormControl('',
        Validators.compose([
          Validators.required //Set subject field as required
        ])),
      content: new FormControl('',
        Validators.compose([
          Validators.minLength(2) // Requires that the content have at least 2 characters
        ]))
    });
  }

  // Count the unread emails from current EReceived array
  newNotification(){
      var sum = 0;
      for(let i = 0; i<this.EReceived.length;i++){
          var acknow = this.EReceived[i].acknowledgment;
          var verif = false;
          for(let j=0;j<acknow.length;j++){
               if(this.service.user._id==acknow[j]){
                  verif=true;
               }
          }
          if(!verif){
            sum++
          }
      }
    EmailComponent.numNoReadEmails = sum;
  }

  // Reset the paginators when the EReceived and ESent arrays are updated
  ngAfterViewInit() {
    this.TInbox.paginator = this.paginatorInbox;
    this.TSent.paginator = this.paginatorSent;
  }

  // Open an close the main Email window
  openCloseEmail(){
    // Switch the state of email windows (open/close)
    this.emailWindowOpen = !this.emailWindowOpen;

    // If the email is closed when user is in New Email window, this section "refresh" the 
    // information in order that if the user re-enters to the email he can see the list of users of Select Receivers dropdown complete
    if(this.inNewEmail){
      this.inNewEmail = false;
      setTimeout(() => this.inNewEmail = true,500);
    }

    this.users = JSON.parse(JSON.stringify(this.service.users));
    this.TInbox = new MatTableDataSource(this.EReceived);
    this.TSent = new MatTableDataSource(this.ESent);

    // Reset the dropdowns of the receivers list of the single email view
    this.closeAllReceivers();

    // This function updates all the variables that depend on server information
    this.starter();
    
    setTimeout(() => this.ngAfterViewInit());
  }

  // This function bring the list of emails corresponding to the inbox from the server and push all the elements to the local EReceived array
  read(){
    this.EReceived = [];
    return this.httpService.read(this.service.user._id).subscribe( data => {
        
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
       /*data source*/
      this.newNotification();
    }, error => {
        console.log(error);
    });
   }

  // This function filter the users in the Select Receivers dropdown-input by name, role, username, or company name.
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

  // This function bring the list of emails corresponding to the sent mails from the server and push all the elements to the local ESent array
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

  // Returns the user name by passing the id
  findUserById(userId){
    for(let i = 0; i<this.users.length;i++){
      if(this.users[i].id==userId){
        return this.users[i].name;
      }
    }
  }

  // This function updates all the variables that depends on server information
  starter(){
       this.read();
       this.getUsers();
       this.sent();
       this.newNotification();
  }

// Sends the email calling the corresponding API function passing an email object as parameter. The information is taken out of the new email form
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
    this.formdata.reset();
    this.toInbox();
    return this.httpService.send(email).subscribe(data => {this.starter()});
  }

  // Check if a certain user has already read an email
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

  // Display a single email in the main email window
  readEmail(email,v) {
    // The click email es set to selectedEmail
    this.selectedEmail = email;
    this.inInbox = false; //Close other window
    this.inNewEmail = false; //Close other window
    this.inSent = false; //Close other window
    this.inAEmail = true; //Open single email view

    // If the email belongs to inbox then check the email state, if unread => update state
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
    // Update the EReceive and ESent arrays and then updates de notification badge (number of unread emails)
    setTimeout(() => this.updateEmails(),1000); 
  }

  // Update the EReceive and ESent arrays and then updates de notification badge (number of unread emails)
  updateEmails(){
    this.read();
    this.sent();
    //Waits when the server fills the arrays
    setTimeout(() => this.newNotification(),500);
  }

  // Sent view: if an email have more than one receiver the table displays only the first name of each receiver
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

  // Shows the inbox view
  toInbox(){
    this.inAEmail = false; //Close other window
    this.inNewEmail = false; //Close other window
    this.inSent = false; //Close other window
    this.inInbox = true; //Open inbox window

    // Reset the dropdowns of the receivers list of the single email view
    this.closeAllReceivers();

    //Update the EReceive and ESent arrays and then updates de notification badge (number of unread emails)
    this.updateEmails();
    setTimeout(() => this.ngAfterViewInit());
  }
  // Shows the sent mail view
  toSent(){
    this.inAEmail = false; //Close other window
    this.inInbox = false; //Close other window
    this.inNewEmail = false; //Close other window
    this.inSent = true; //Open sent mail window

    // Reset the dropdowns of the receivers list of the single email view
    this.closeAllReceivers();

    //Update the EReceive and ESent arrays and then updates de notification badge (number of unread emails)
    this.updateEmails();
    setTimeout(() => this.ngAfterViewInit());
  }

  toNewEmail(){
    this.inAEmail = false; //Close other window
    this.inInbox = false; //Close other window
    this.inSent = false; //Close other window

    // Reset the dropdowns of the receivers list of the single email view
    this.closeAllReceivers();

    this.inNewEmail = true; //Open new email mail window
  }

  // Calls the API function that update the state of an email
  updateState(email, emailId){
    return this.httpService.updateState(emailId,email).subscribe(data => {});
  }

  // stylist the date of an email
  emailDate(isoDate){
    let date = new Date(isoDate);
    return (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
  }
  // Stylist the hour of an email
  emailHour(isoDate){
    let date = new Date(isoDate);
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var amPM;
    var zero = ""
    var zeroH = ""

    if( hour >= 12 ){
      amPM = "pm";
      if ( hour != 12 ){
        hour = hour - 12;
      }
    }else {
      amPM = "am";
    }
    if( hour == 0){
      var zeroH = "0";
    }

    if(minutes < 10){
      zero = "0";
    }
    return (zeroH + hour + ":" + zero + minutes + " " + amPM);
  }

  // Section in charge of calculates the height of the div that contains of the receivers 
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
  closeAllReceivers(){
    this.containerHeight = 40;
    this.showAllReceivers = false;
  }
 
}

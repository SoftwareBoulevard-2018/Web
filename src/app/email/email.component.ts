import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit  {

  formdata;

  users = [];

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

  /*controla la apertura de la interfaz de email*/  abriremail = false;
  /*controla la apertura de la interfaz de recibidos, 
  abierta por defecto cuando se abre email*/recibidos = false;
  /*controla la apertura de la interfaz para leer un correo*/leyendo = false;
  /*controla la apertura de la interfaz para escribir nuevo correo*/enuevo = false;
  /*controla la apertura de la interfaz para ver lo enviados*/sent = false;
  /*se usa para mostrar la cantidad de correos nuevos recibidos*/nrecibidos = 0;
  /*para los ciclos for*/i=0;
  /*sender, subject y content se usan para mostrar la lectura de un mensaje*/sender;
  subject;
  contenido;
  /*crecibidos se usara para conservar localmente los mensajes que ha recibido el usuario actual*/
  crecibidos = [{id: 0, asunto:"Ready to play", remitente:"juclondonome", fecha:"20/04/2018", state:"sent", content:"Hi Victor.\nI'm ready to play now, just send me an email to let me know."},
                {id: 1, asunto:"I'm busy this weekend", remitente:"vdjaramillog", fecha:"19/04/2018", state:"sent", content:"Hello every one,\nright this weekend is my sister's marrige so i wont be able to work. \n Happy weeekend"},
                {id:2,asunto:"Hell this is hard",remitente:"bmaring",fecha:"15/04/2017",state:"sent",content:"Hi, my name is Bianca, i've been trying to solve a cuple puzzles this weekend, but they imposible. \nIf any body can help me, i will apreciated."},
                {id:3,asunto:"New team member",remitente:"cmzapata",fecha:"10/04/2017",state:"sent",content:"There is a new team member in your team, very good in solving Analyst questions. \n Good night."}];  
  
  
                /*crecibidos se usara para conservar localmente los mensajes que ha enviado el usuario actual*/
  cenviados =[];
  /* fromto se usa para decdir que textp se muestra en la interfaz de lectura*/ fromto = "From";
  /*recibido se usa para mostrar el texto To en la interfaz de lectura*/ recibido = true;
  ngOnInit() {
    this.Fnem();
    
    this.newEmailForm();

    this.users = JSON.parse(JSON.stringify(this.service.users));

  }

  
  /*Fnem calcula la cantidad de mensajes nuevos en el array que 
  los va a almacenar, crecibidos*/
  Fnem(){
  	this.nrecibidos=0;
  	for(this.i = 0 ; this.i<this.crecibidos.length;this.i++){
  		if(this.crecibidos[this.i].state=="sent"){
			this.nrecibidos=this.nrecibidos+1;
  		}
  	}
  }
  /*cuando se hace el click en el sobre, se ejecuta esta funcion que muestra la primera interfaz de email*/
  email(){
  	this.abriremail = true;
  	this.recibidos = true;
  	this.leyendo = false;
  	this.sent = false;
  }
  /*cuando se hace click en la X se ejecuta esta funcion que cierra la interfaz de email*/
  cerraremail(){
  	this.abriremail = false;
  	this.recibidos = false;
  	this.leyendo=false;
  }
  /*esta funcion permite leer un correo en especifico, sea enviado o recibido, el parametro v permite 
  reconocer si es enviado o resibido*/
  leer(correo,v){
  	this.recibidos = false;
  	this.leyendo = true;
    this.sent = false ;
  	this.contenido = correo.content;
  	this.subject = correo.asunto;
  	/*verifica si el correo que se lee es del inbox(0) o del sentbox(1)*/
  	if(v===0){
          this.sender = correo.remitente;
          this.fromto = "From: ";
          this.recibido = true;
  		for(this.i = 0; this.i<this.crecibidos.length;this.i++){
  			if(this.crecibidos[this.i].id === correo.id){
		  		this.crecibidos.splice(this.i,1);
  			}
  		}
  		this.Fnem();
  	}else{
      this.sender = correo.receiver;
      this.fromto = "To: ";
      this.recibido = false;
    }
  }
  /*al hacer click en el boton sent, se ejecuta esta funcion que muestra la interfaz de los correos enviados*/
  enviados(){
  	this.leyendo=false;
  	this.recibidos=false;
  	this.sent = true;
  }
  /*habilita la interfaz de escritura de nuevos mensajes*/
  newemail(){
  	this.enuevo = true;
  	this.leyendo=false;
  	this.sent=false;
  	this.recibidos=false;
  }
  /*esta funcion envia el mensaje que se esta escribiendo*/
  enviar(to,sub,cont){
    this.cenviados.push(
      {id: 1, asunto:sub,receiver: to, remitente:this.service.username, fecha:"08/05/2018", state:"sent", content:cont}
    );
  }

  emailWindowOpen = false;
  inInbox = true;
  inAEmail = false;
  inNewEmail = false;

  selectedEmail : Email;

  selectedUsers = [];

  table_titles = ['username', 'subject-content', 'date'];
  dataSource = new MatTableDataSource(EMAILS);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  openCloseEmail(){
    this.emailWindowOpen = !this.emailWindowOpen;
    this.users = JSON.parse(JSON.stringify(this.service.users));
  }

  readEmail(email) {
    this.selectedEmail = email;
    this.inInbox = false;
    this.inNewEmail = false;
    this.inAEmail = true;
  }

  toInbox(){
    this.inAEmail = false;
    this.inNewEmail = false;
    this.inInbox = true;
    setTimeout(() => this.ngAfterViewInit());
  }

  toNewEmail(){
    this.inAEmail = false;
    this.inInbox = false;
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

  
  
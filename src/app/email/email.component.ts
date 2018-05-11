
import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

    constructor(public service: GeneralServiceService) { }
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
}

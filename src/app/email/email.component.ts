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
  crecibidos = [{id: 0, asunto:"Prueba 1", remitente:"Fulanito 1", fecha:"20/04/2018", state:"sent", content:"1"},{id: 1, asunto:"Prueba 2", remitente:"Fulanito 2", fecha:"20/04/2018", state:"sent", content:"2"},{id: 2, asunto:"Prueba 3", remitente:"Fulanito 3", fecha:"20/04/2018", state:"sent", content:"3"},{id: 3, asunto:"Prueba 4", remitente:"Fulanito 4", fecha:"20/04/2018", state:"sent", content:"4"},{id: 4, asunto:"Prueba 5", remitente:"Fulanito 5", fecha:"20/04/2018", state:"sent", content:"5"},{id: 5, asunto:"Prueba 6", remitente:"Fulanito 6", fecha:"20/04/2018", state:"sent", content:"6"},{id: 6, asunto:"Prueba 7", remitente:"Fulanito 7", fecha:"20/04/2018", state:"sent", content:"7"},{id: 7, asunto:"Prueba 8", remitente:"Fulanito 8", fecha:"20/04/2018", state:"sent", content:"8"},{id: 8, asunto:"Prueba 9", remitente:"Fulanito 9", fecha:"20/04/2018", state:"sent", content:"9"},{id: 9, asunto:"Prueba 10", remitente:"Fulanito 10", fecha:"20/04/2018", state:"sent", content:"10"},{id: 10, asunto:"Prueba 11", remitente:"Fulanito 11", fecha:"20/04/2018", state:"sent", content:"11"},{id: 11, asunto:"Prueba 12", remitente:"Fulanito 12", fecha:"20/04/2018", state:"sent", content:"12"},{id: 12, asunto:"Prueba 13", remitente:"Fulanito 13", fecha:"20/04/2018", state:"sent", content:"13"},{id: 13, asunto:"Prueba 14", remitente:"Fulanito 14", fecha:"20/04/2018", state:"sent", content:"14"},{id: 14, asunto:"Prueba 15", remitente:"Fulanito 15", fecha:"20/04/2018", state:"sent", content:"15"},{id: 15, asunto:"Prueba 16", remitente:"Fulanito 16", fecha:"20/04/2018", state:"sent", content:"16"},{id: 16, asunto:"Prueba 17", remitente:"Fulanito 17", fecha:"20/04/2018", state:"sent", content:"17"},{id: 17, asunto:"Prueba 18", remitente:"Fulanito 18", fecha:"20/04/2018", state:"sent", content:"18"},{id: 18, asunto:"Prueba 19", remitente:"Fulanito 19", fecha:"20/04/2018", state:"sent", content:"19"},{id: 19, asunto:"Prueba 20", remitente:"Fulanito 20", fecha:"20/04/2018", state:"sent", content:"20"},{id: 20, asunto:"Prueba 21", remitente:"Fulanito 21", fecha:"20/04/2018", state:"sent", content:"21"},{id: 21, asunto:"Prueba 22", remitente:"Fulanito 22", fecha:"20/04/2018", state:"sent", content:"22"},{id: 22, asunto:"Prueba 23", remitente:"Fulanito 23", fecha:"20/04/2018", state:"sent", content:"23"},{id: 23, asunto:"Prueba 24", remitente:"Fulanito 24", fecha:"20/04/2018", state:"sent", content:"24"},{id: 24, asunto:"Prueba 25", remitente:"Fulanito 25", fecha:"20/04/2018", state:"read", content:"25"}];
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
      {id: 1, asunto:sub,receiver to, remitente:this.service.username, fecha:"08/05/2018", state:"sent", content:cont}
    );
  }
}

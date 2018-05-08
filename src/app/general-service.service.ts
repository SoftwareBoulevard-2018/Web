import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Company } from './shared/company';
import {BiddingProject} from './shared/biddingProject';
import { InstantProject } from './shared/instantProject';
import {Question} from './shared/question';
import { Parameter } from './shared/parameter'
import {Estimation} from './shared/estimation';

@Injectable()
export class GeneralServiceService {

  // Variables used for data session

  user_type;

  username;

  loggedusr;

  threshold;

  // Variables used as dummy database for the mocked frontend

  users = [new User("Andres Felipe Aguilar","afaguilarr",
    "ElMejor123","Developer","UNAL",3,12,5),
    new User("John Jairo Serna","jjsernaco","holaMUNDO456","Project Manager","UNAL"),
    new User("Carlos Mario Zapata","cmzapata","EnserioEsaEsTuPregunta?","Game Administrator"),
    new User("David","dddavid","david","Project Manager","Amazon"),
    new User("David Andres Calle","dacalles","gogo123",
      "Tester","Amazon", 3,13,14),
    new User("Juan David Fernandez Moreno","judfernandez","fatbastard","Project Manager"),
    new User("Juan Pablo Chaves Morales","jpchavesm","ouiaboo","Developer", "Amazon"),
    new User("Victor Daniel JAramillo Gomez", "vdjaramillog","0000","Developer","UNAL"),
    new User("Test", "test1","test1","Tester"),
    new User("1", "1","1","Game Administrator")];

  projects = [new BiddingProject(1,"FIFA",10,3, 10, 10, 10, 5000,0, 0, 0 ,0),
    new BiddingProject(2,"Bancolombia System",10,3, 10, 10, 10, 5000,0, 0, 0 ,0)];

  questions = [new Question(1,"loca","Analista",5),new Question(1,"locota","Developer",3)];

  parameter = [new Parameter(10)];

  user_to_be_updated;

  parameter_to_be_updated = this.parameter[0];

  companies = [new Company("UNAL",this.users[1],
    "http://unal.edu.co/typo3conf/ext/unal_skin_default/Resources/Public/images/escudoUnal_black.png",1,
    12, 5000, [this.users[0], this.users[7]],"FIFA"),
    new Company("Google",undefined,"http://educainternet.es/pictures/4074.png"),
    new Company("Amazon",this.users[3],"https://png.icons8.com/windows/1600/amazon.png",
    undefined, 6, 200,[this.users[4], this.users[6]])];

  estimations = [ new Estimation("jjsernaco","FIFA",6000,20),
                  new Estimation("jjsernaco","FIFA",4000,15),
                  new Estimation("jjsernaco","FIFA",6000,30),
                  new Estimation("jjsernaco","FIFA",6000,10),
                  new Estimation("jjsernaco","FIFA",5500,10)];

  company_to_be_updated;

  invitations=[];

  constructor() { }
}

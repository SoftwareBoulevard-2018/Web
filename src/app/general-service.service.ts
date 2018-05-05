import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Company } from './shared/company';
import {BiddingProject} from './shared/biddingProject';
// import { InstantProject } from './shared/project';
// import { Project } from './shared/project';

@Injectable()
export class GeneralServiceService {

  user_type;

  username;

  loggedusr;

  users = [new User("Andres Felipe Aguilar","afaguilarr","ElMejor123","Developer","UNAL"),
    new User("John Jairo Serna","jjsernaco","holaMUNDO456","Project Manager","UNAL"),
    new User("Carlos Mario Zapata","cmzapata","EnserioEsaEsTuPregunta?","Game Administrator"),
    new User("David","dddavid","david","Project Manager"),
    new User("David Andres Calle","dacalles","gogo123","Tester"),
    new User("Juan David Fernandez Moreno","judfernandez","fatbastard","Project Manager"),
    new User("Juan Pablo Chaves Morales","jpchavesm","ouiaboo","Developer"),
    new User("Victor Daniel JAramillo Gomez", "vdjaramillog","0000","Developer","UNAL"),
    new User("1", "1","1","Game Administrator")];

  projects = [new BiddingProject(1,"FIFA",10,3, 5000,0, 0, 0 ,0),
    new BiddingProject(2,"Bancolombia System",10,3, 5000,0, 0, 0 ,0)];

  user_to_be_updated;

  user_to_be_watched;

  companies = [new Company("UNAL",this.users[1],
    "http://unal.edu.co/typo3conf/ext/unal_skin_default/Resources/Public/images/escudoUnal_black.png",3,
    12, [this.users[0], this.users[7]]),

    new Company("Google",undefined,"http://educainternet.es/pictures/4074.png")];


  company_to_be_updated = this.companies[1];

  constructor() { }
}

import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Company } from './shared/company';
import {BiddingProject} from './shared/biddingProject';

@Injectable()
export class GeneralServiceService {
  user_type;
  user_name;
  username;
  users = [new User("Andres Felipe Aguilar","afaguilarr","ElMejor123","Developer"),
    new User("John Jairo Serna","jjsernaco","holaMUNDO456","Project Manager"),
    new User("Carlos Mario Zapata","cmzapata","EnserioEsaEsTuPregunta?","Game Administrator"),
    new User("David","dddavid","david","Project Manager"),
    new User("David Andres Calle","dacalles","gogo123","Tester"),
    new User("Juan David Fernandez Moreno","judfernandez","fatbastard","Project Manager"),
    new User("Juan Pablo Chaves Morales","jpchavesm","ouiaboo","Developer"),
	  new User("Victor Daniel JAramillo Gomez", "vdjaramillog","0000","Developer")];
  user_to_be_updated = this.users[1];
  companies = [new Company("UNAL","jjsernaco",
    "http://unal.edu.co/typo3conf/ext/unal_skin_default/Resources/Public/images/escudoUnal_black.png"),
  new Company("Google", "judfernandez","http://educainternet.es/pictures/4074.png",1)];
  company_to_be_updated = this.companies[1];

  projects = [new BiddingProject(1,"FIFA",10,3, 5000,0, 0, 0 ,0),
    new BiddingProject(2,"Bancolombia System",10,3, 5000,0, 0, 0 ,0)];
  constructor() { }
}

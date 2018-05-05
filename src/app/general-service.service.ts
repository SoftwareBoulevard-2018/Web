import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Company } from './shared/company';
import { InstantProject } from './shared/project';
import { BiddingProject } from './shared/project';
import { Project } from './shared/project';

@Injectable()
export class GeneralServiceService {
  user_type;
  username;
  loggedusr;
  users = [new User("Andres Felipe Aguilar","afaguilarr","ElMejor123","Developer"),
  new User("John Jairo Serna","jjsernaco","holaMUNDO456","Project Manager","UNAL"),
  new User("Carlos Mario Zapata","cmzapata","EnserioEsaEsTuPregunta?","Game Administrator"),
  new User("David","dddavid","david","Project Manager"),
	new User("Victor Daniel JAramillo Gomez", "vdjaramillog","0000","Developer"),
  new User("1", "1","1","Game Administrator")];
  user_to_be_updated;
  user_to_be_watched;
  companies = [new Company("UNAL",this.users[1],
  "http://unal.edu.co/typo3conf/ext/unal_skin_default/Resources/Public/images/escudoUnal_black.png"),
  new Company("Google",undefined,"http://educainternet.es/pictures/4074.png")];
  company_to_be_updated = this.companies[1];
  instant_projects = [new InstantProject(0001, "Inventario papeleria", false, number_of_questions_analysts=10, number_of_questions_developer=10, number_of_questions_tester=10, k_capacity=3, rewarded_k_units=2),
  new InstantProject(0002, "Pac Man", false, 8, 9, 7, 2, 1),
  new InstantProject(0003, "Fifa 18", true, 12, 14, 12, 5, 4)];
  constructor() { }
}

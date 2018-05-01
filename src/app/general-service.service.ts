import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Company } from './shared/company';

@Injectable()
export class GeneralServiceService {
  user_type;
  users = [new User("Andres Felipe Aguilar", "ElMejor123", "afaguilarr","Team Member"),
    new User("John Jairo Serna", "holaMUNDO456", "jjsernaco","Project Manager"),
    new User("Carlos Mario Zapata", "EnserioEsaEsTuPregunta?", "cmzapata","Game Administrator")];
  constructor() { }
}

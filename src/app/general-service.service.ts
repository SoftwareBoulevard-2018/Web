import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Company } from './shared/company';

@Injectable()
export class GeneralServiceService {
  user_type;
  users = [new User("Andres Felipe Aguilar","afaguilarr","ElMejor123","Team Member"),
    new User("John Jairo Serna","jjsernaco","holaMUNDO456","Project Manager"),
    new User("Carlos Mario Zapata","cmzapata","EnserioEsaEsTuPregunta?","Game Administrator")];
  constructor() { }
}

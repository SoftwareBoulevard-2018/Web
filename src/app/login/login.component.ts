import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import {HttpService} from '../http.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {EmailComponent} from'../email/email.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
              public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // Variables necessary to define the form and validate the input data
  invalid = false;
  formdata;

  ngOnInit() {
    // Defines the default form, if the user is already defined, redirects to home
    if (this.service.user_type === undefined) {
      this.formdata = new FormGroup({
        username: new FormControl('',
          Validators.compose([
            Validators.required
          ])),
        password: new FormControl('',
          Validators.compose([
            Validators.required
          ]))
      });
    } else {
      this.router.navigate(['home']);
    }
  }

  login(username, password) {
    return this.httpService.login(username, password).subscribe( data => {
      this.saveInLocal('userInSession', data);
        if (data.role === 'Analyst' || data.role === 'Developer' || data.role === 'Tester') {
          this.service.user_type = 'Team Member';
          this.service.user = data;
          this.router.navigate(['home']);
        } else if (data.role === 'Project Manager') {
          this.service.user_type = 'Project Manager';
          this.service.user = data;
          this.router.navigate(['home']);
        } else {
          this.service.user_type = 'Game Administrator';
          this.service.user = data;
          this.router.navigate(['home']);
        }
        this.service.loggedusr = true;
        this.firstEmail(this.service.user._id);
      },
      error => {
        this.invalid = true;
      });
  }

  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
  }
  firstEmail(userId){
    return this.httpService.read(userId).subscribe(data =>{
        const datos =JSON.parse(JSON.stringify(data)).data;
        var sum = 0;
      for(let i = 0; i<datos.length;i++){
          var acknow = datos[i].acknowledgment;
          var verif = false;
          for(let j=0;j<acknow.length;j++){
               if(userId==acknow[j]){
                  verif=true;
               }
          }
          if(!verif){
            sum++
          }
      }
      EmailComponent.numNoReadEmails=sum;
      });
    
  }
  onClickSubmit(data) {
    // This is the function that validates the form data and it's activated when the log in button is clicked
    this.login(data.username, data.password);
  }
}

import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(public service: GeneralServiceService) { }
  loggedusr = false;
  usr = this.service.user_type;
  ngOnInit() {
  	if(this.service.user_type != undefined){
  		this.loggedusr = true;
  	}
  }

}

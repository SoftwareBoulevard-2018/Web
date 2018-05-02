import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service: GeneralServiceService) { }

  ngOnInit() {
    if(this.service.user_type === "Game Administrator"){
    }
    else if(this.service.user_type === "Project Manager"){
    }
    else if(this.service.user_type === "Team Member"){
    }
    else{
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: GeneralServiceService) { }

  ngOnInit() {
    console.log(this.service.user_type);
  }

}

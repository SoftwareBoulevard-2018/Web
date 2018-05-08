import { Component, OnInit, Input } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import { User } from "../shared/user";
import { MatSelect } from "@angular/material";
import { Question } from "../shared/question";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  
  @Input('description') description: string;
  
  constructor(public service: GeneralServiceService, public router: Router) { }
  
  ngOnInit() {
  }

}

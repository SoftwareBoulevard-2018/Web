import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatSelect } from "@angular/material";
import {HttpService} from '../http.service';
import { Puzzle } from '../shared/puzzle';

@Component({
  selector: 'app-create-puzzle',
  templateUrl: './create-puzzle.component.html',
  styleUrls: ['./create-puzzle.component.css']
})
export class CreatePuzzleComponent implements OnInit {

  name = 'Angular 4';
  url = '';
  formdata;
  puzzle;
  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router){}

  
  onClickSubmit(formdata){
	  this.puzzle = new Puzzle(formdata.resources, this.url);
	  return this.httpService.createPuzzle(this.puzzle).subscribe(formdata => console.log(formdata));
  }
  

  // shows the image when the file is selected
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }
  ngOnInit(){
  }
}

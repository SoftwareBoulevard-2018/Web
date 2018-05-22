import { Component, OnInit } from '@angular/core';
import {BiddingProject} from '../shared/biddingProject';
import {GeneralServiceService} from '../general-service.service';
import {Router} from '@angular/router';
import {PuzzleTile} from '../shared/puzzleTile';

@Component({
  selector: 'app-generateresources',
  templateUrl: './generateresources.component.html',
  styleUrls: ['./generateresources.component.css']
})
export class GenerateresourcesComponent implements OnInit {

  solved_puzzle = false;
  correct_matrix: PuzzleTile[][];
  current_matrix: PuzzleTile[][];

  redirect1($event) {
    this.solved_puzzle = true;
  }
  constructor(public service: GeneralServiceService, public router: Router) {
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  initializePuzzle() {
    // poner en el onInit
    // llenar matrices
    // shuffle current_matrix
    // dibujar current_matrix
    // comparar current con correct y habilitar validate cuando sea necesario
  }

  isMovableTile(tile: PuzzleTile) {

  }

  // candidate is the name of the tile the user wants to move
  moveTile(candidate) {

  }

  getTile(number) {

  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    else if (this.service.user_type === "Team Member") {
      this.router.navigate(['restricted']);
    }
  }

}



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
  correct_matrix = [];
  current_matrix = [];
  solvable_puzzles = [[15, 2, 1, 12, 8, 5, 6, 11, 4, 9, 10, 7, 3, 14, 13, 16],
                      [6, 1, 10, 2, 7, 11, 4, 14, 5, 16, 9, 15, 8, 12, 13, 3]];

  redirect1(event) {
    this.solved_puzzle = true;
  }
  constructor(public service: GeneralServiceService, public router: Router) {
  }

  redirectToFunctions(event) {
    this.router.navigate(['home/users/projectmanager/functions']);
  }

  initializePuzzle() {
    let position = 0;
    for (let i = 0; i <= 3; i++) {
      this.correct_matrix.push([]);
      for (let j = 0; j <= 3; j++) {
        position += 1;
        if (i === 3 && j === 3) {     // empty piece
          this.correct_matrix[i].push(new PuzzleTile(position, position, true));
        }
        else {
          this.correct_matrix[i].push(new PuzzleTile(position, position, false));
        }
      }
    }
    this.shuffleMatrix();   // scrambles the matrix that represents the puzzle the user has to solve

    console.log(this.correct_matrix);
    console.log(this.current_matrix);
    // dibujar current_matrix
    // comparar current con correct y habilitar validate cuando sea necesario
  }

  mapArrayToMatrix(n: number) {
    if (n === 4) {
      return [0, 3];
    }
    else if (n === 8) {
      return [1, 3];
    }
    else if (n === 12) {
      return [2, 3];
    }
    else if (n === 16) {
      return [3, 3];
    }
    else if (n >= 1 && n <= 3) {
      return [0, (n % 4) - 1];
    }
    else if (n >= 5 && n <= 7) {
      return [1, (n % 4) - 1];
    }
    else if (n >= 9 && n <= 11) {
      return [2, (n % 4) - 1];
    }
    else if (n >= 13 && n <= 15) {
      return [3, (n % 4) - 1];
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  shuffleMatrix() {
    const configuration_number = this.randomIntFromInterval(0, this.solvable_puzzles.length - 1);
    const configuration = this.solvable_puzzles[configuration_number];
    let conf_position = 0;

    for (let i = 0; i <= 3; i++) {
      this.current_matrix.push([]);
      for (let j = 0; j <= 3; j++) {
        const tuple = this.mapArrayToMatrix(configuration[conf_position]);
        let nextTile = this.correct_matrix[tuple[0]][tuple[1]];
        nextTile.setCurrent_placement(conf_position + 1);
        this.current_matrix[i].push(nextTile);
        conf_position += 1;
      }
    }
  }

  isMovableTile(tile: PuzzleTile) {
    const tile_position = tile.getCurrent_placement();
    const tuple = this.mapArrayToMatrix(tile_position);
    const tile_i = tuple[0];
    const tile_j = tuple[1];

    const tile_up = this.current_matrix[tile_i - 1][tile_j];
    const tile_down = this.current_matrix[tile_i + 1][tile_j];
    const tile_left = this.current_matrix[tile_i][tile_j - 1];
    const tile_right = this.current_matrix[tile_i][tile_j + 1];

    if (tile_up !== undefined && tile_up.isEmpty === true) {
      return [tile_i - 1, tile_j];
    }
    if (tile_down !== undefined && tile_down.isEmpty === true) {
      return [tile_i + 1, tile_j];
    }
    if (tile_left !== undefined && tile_left.isEmpty === true) {
      return [tile_i, tile_j - 1];
    }
    if (tile_right !== undefined && tile_right.isEmpty === true) {
      return [tile_i, tile_j + 1];
    }
    else {
      return [-1, -1];  // cant move the piece
    }
  }

  // candidate is the name of the tile the user wants to move
  moveTile($event) {

  }

  getTile(number) {

  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
    else if (this.service.user_type === 'Team Member') {
      this.router.navigate(['restricted']);
    }
    else {
      this.initializePuzzle();
    }
  }

}



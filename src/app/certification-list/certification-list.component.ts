import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Certification } from '../shared/certification';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.css']
})
export class CertificationListComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }
  
 certifications = [];
 certifications2: MatTableDataSource<Certification>;

 table_titles = ['role', 'level', 'update'];
 
  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.certifications2 = new MatTableDataSource(this.certifications);
      this.getAllCertifications();
    }
  }
  
  getAllCertifications() {
    return this.httpService.getCertifications().subscribe(data => this.listCertifications(data));
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.certifications2.filter = filterValue;
  }
  
  redirect(event, element) {
    // Redirects to User status and defines the necessary variables
    this.service.certification_to_be_updated = element;
    this.router.navigate(['home/set-up/puzzle-list/update-certification']);
  }
  
  listCertifications(data) {
    this.certifications = [];
    for (const certification of Object.values(data.data)) {
        this.certifications.push(certification);
        this.certifications2.data = this.certifications;
    }
  }
  
}

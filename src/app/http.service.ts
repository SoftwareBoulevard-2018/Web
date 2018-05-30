import { Injectable } from '@angular/core';
import { User } from './shared/user';
import { Id } from './shared/id';
import { Company } from './shared/company';
import { Email } from './shared/email';
import { TrainingAttempt } from './shared/trainingAttempt';
import { DevelopingAttempt } from './shared/developingAttempt';
import { Puzzle } from './shared/puzzle';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {Record} from "./shared/record";
import {BiddingProject} from "./shared/biddingProject";
import {Estimation} from "./shared/estimation";
import {Certification} from "./shared/certification";
import {InstantProject} from "./shared/instantProject";
import { Question } from "./shared/question";
import {Assignment} from "./shared/assignment";
import { creationPuzzle } from './shared/creationPuzzle';

@Injectable()

export class HttpService {

  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  static apiURL = 'http://35.196.111.251:3000';
  // static apiURL = 'http://localhost:3000';
  static usersURL = '/users';
  static usersURL2 = '/username';
  static usersURL3 = '/usersByRole';
  static companiesURL = '/companies';
  static loginURL = '/login';
  static emailURL = '/emails';
  static trainingAttemptsURL = '/trainingAttempts';
  static developingAttemptsURL = '/developingttempts';
  static puzzlesURL = '/puzzles';
  static recordsURL = '/records';
  static puzzleURL = '/puzzles';
  static estimationURL = '/estimations';
  static getCurrentCompanyURL = '/getCurrentProject';
  static getBiddingProjectURL = '/biddingProjects';
  static getCurrentProjectManagerURL = '/getCurrentPm';
  static getCurrentProjectManager2URL = '/getCurrentProjectM';
  static getEstimationByPMAndProjectURL = '/getEstimationByPMAndProject';
  static getEstimationsByPMAndStateURL = '/getEstimationsByProjectManagerUsernameAndState';
  static certificationURL = '/certification';
  static instantProjecstURL = '/instantProjects';
  static assignmentsURL = '/assignments';
  static questionsURL = '/questions';
  // All services related to Users
  getAllUsers() {
    return this.http.get<User[]>(HttpService.apiURL + HttpService.usersURL);
  }
  getUserById(userId: string) {
    return this.http.get<User>(HttpService.apiURL + HttpService.usersURL + '/' + userId);
  }
  getUserByUsername(username: string) {
    return this.http.get<User>(HttpService.apiURL + HttpService.usersURL + HttpService.usersURL2 + '/' + username);
  }
  createUser(user: User) {
    return this.http.post<User>(HttpService.apiURL + HttpService.usersURL,
      JSON.stringify(user), HttpService.httpOptions);
  }
  updateUser(user, userId) {
    return this.http.put<Object>(HttpService.apiURL + HttpService.usersURL + '/' + userId,
      JSON.stringify(user), HttpService.httpOptions);
  }
  getUserByRoleCompany(role, companyId) {
    return this.http.post<User[]>(HttpService.apiURL + HttpService.usersURL + HttpService.usersURL2,
      JSON.stringify({ role: role, companyId: companyId }), HttpService.httpOptions);
  }
  getUsersByRole(role) {
    return this.http.post<User[]>(HttpService.apiURL + HttpService.usersURL + HttpService.usersURL3,
      JSON.stringify({ role1: role }), HttpService.httpOptions);
  }

  // All services related to companies
  getAllCompanies() {
    return this.http.get<Company[]>(HttpService.apiURL + HttpService.companiesURL);
  }
  getCompanyById(companyId: string) {
    return this.http.get<Company>(HttpService.apiURL + HttpService.companiesURL + '/' + companyId);
  }
  createCompany(company: Company) {
    return this.http.post<Id>(HttpService.apiURL + HttpService.companiesURL,
      JSON.stringify(company), HttpService.httpOptions);
  }
  updateCompany(company, companyId) {
    return this.http.put<Object>(HttpService.apiURL + HttpService.companiesURL + '/' + companyId,
      JSON.stringify(company), HttpService.httpOptions);
  }

  // All services related to session
  getSession() {
    return this.http.get<User>(HttpService.apiURL + HttpService.loginURL);
  }
  login(username, password) {
    return this.http.post<User>(HttpService.apiURL + HttpService.loginURL,
      JSON.stringify({ username: username, password: password }), HttpService.httpOptions);
  }

  // All services related to email
  read(idUsuario) {
     return this.http.get<Email[]>(HttpService.apiURL + HttpService.emailURL + '/read/' + idUsuario);
  }
  send(email: Email){
    return this.http.post<Email>(HttpService.apiURL + HttpService.emailURL + '/send/',
      JSON.stringify(email), HttpService.httpOptions);
  }
  sent(idUsuario) {
     return this.http.get<Email[]>(HttpService.apiURL + HttpService.emailURL + '/sent/' + idUsuario);
  }
  updateState(idEmail, email){
    return this.http.put<Email>(HttpService.apiURL + HttpService.emailURL + '/updateState/'+idEmail,
      JSON.stringify(email), HttpService.httpOptions);
  }
  getTrainingAttemptsByState(state) {
    return this.http.post<TrainingAttempt[]>(HttpService.apiURL + HttpService.trainingAttemptsURL,
      JSON.stringify({ state1: state }), HttpService.httpOptions);
  }

  getDevelopingAttemptsByState(state) {
    return this.http.post<DevelopingAttempt[]>(HttpService.apiURL + HttpService.developingAttemptsURL,
      JSON.stringify({ state1: state }), HttpService.httpOptions);
  }

  createTrainingAttempt(trainingAttempt: TrainingAttempt) {
    return this.http.post<TrainingAttempt[]>(HttpService.apiURL + HttpService.trainingAttemptsURL,
      JSON.stringify(trainingAttempt), HttpService.httpOptions);
  }

  createDevelopingAttempt(developingAttempt: DevelopingAttempt) {
    return this.http.post<DevelopingAttempt[]>(HttpService.apiURL + HttpService.developingAttemptsURL,
      JSON.stringify(developingAttempt), HttpService.httpOptions);
    }
  //All services related to records
  createRecord(record: Record) {
    return this.http.post<any>(HttpService.apiURL + HttpService.recordsURL,
      JSON.stringify(record), HttpService.httpOptions);
  }
  getAllRecords() {
    return this.http.get<Record[]>(HttpService.apiURL + HttpService.recordsURL);
  }
  getRecordsByCompany(company: string) {
    return this.http.get<Record[]>(HttpService.apiURL + HttpService.recordsURL + '/' + company);
  }
  getRecordsByProject(project: string) {
    return this.http.get<Record[]>(HttpService.apiURL + HttpService.recordsURL + '/' + project);
  }
  getRecordsByFinishDateAndCompany(finishDate, company) {
    return this.http.post<Record>(HttpService.apiURL + HttpService.recordsURL + HttpService.getCurrentCompanyURL,
      JSON.stringify({company: company , finishDate: finishDate}), HttpService.httpOptions);
  }

  //All services related to Puzzles
  getAllPuzzles() {
    return this.http.get<Puzzle[]>(HttpService.apiURL + HttpService.puzzleURL);
  }
  
  createPuzzle(puzzle : creationPuzzle){
	return this.http.post<creationPuzzle>(HttpService.apiURL + '/puzzles' + '/createPuzzle',
      JSON.stringify(puzzle), HttpService.httpOptions);
  }

  //All services related to Estimation
  createEstimation(estimation: Estimation) {
    return this.http.post<any>(HttpService.apiURL + HttpService.estimationURL,
      JSON.stringify(estimation), HttpService.httpOptions);
  }
  getEstimationByPMAndProject(projectManagerUsername, projectName) {
    return this.http.post<Estimation[]>(HttpService.apiURL + HttpService.estimationURL + HttpService.getEstimationByPMAndProjectURL,
      JSON.stringify({projectManagerUsername: projectManagerUsername , projectName: projectName}), HttpService.httpOptions);
  }
  getEstimationByProjectManagerUsernameAndState(projectManagerUsername, state) {
    return this.http.post<Estimation>(HttpService.apiURL + HttpService.estimationURL + HttpService.getEstimationsByPMAndStateURL,
      JSON.stringify({projectManagerUsername: projectManagerUsername , state: state}), HttpService.httpOptions);
  }

  //All services related to BiddingProjects
  getAllBiddingProjects() {
    return this.http.get<BiddingProject[]>(HttpService.apiURL + HttpService.getBiddingProjectURL);
  }
  getBiddingProjectById(id: String) {
    return this.http.get<BiddingProject>(HttpService.apiURL + HttpService.getBiddingProjectURL+ '/' + id);
  }
  createBiddingProject(biddingProject: BiddingProject) {
    return this.http.post<Id>(HttpService.apiURL + HttpService.getBiddingProjectURL + '/createBiddingProject/',
      JSON.stringify(biddingProject), HttpService.httpOptions);
  }
  updateBiddingProject(biddingProject, id) {
    return this.http.put<Object>(HttpService.apiURL + HttpService.getBiddingProjectURL + '/' + id,
      JSON.stringify(biddingProject), HttpService.httpOptions);
  }

  //All services related to InstantProjects
  getAllInstantProjects() {
    return this.http.get<InstantProject[]>(HttpService.apiURL + HttpService.instantProjecstURL);
  }
  getInstantprojectById(id: string) {
    return this.http.get<InstantProject>(HttpService.apiURL + HttpService.companiesURL + '/' + id);
  }
  createInstantProject(instantProject: InstantProject) {
    return this.http.post<Id>(HttpService.apiURL + HttpService.instantProjecstURL + '/createInstantProject/',
      JSON.stringify(instantProject), HttpService.httpOptions);
  }
  updateInstantProject(instantProject, id) {
    return this.http.put<Object>(HttpService.apiURL + HttpService.instantProjecstURL + '/' + id,
      JSON.stringify(instantProject), HttpService.httpOptions);
  }
  // All services related to Certification

  getCertification(){
    return this.http.get<Certification[]>(HttpService.apiURL + HttpService.certificationURL + '/getCertification/');
  }
  createCertification(cert: Certification){
    return this.http.post<Certification>(HttpService.apiURL + HttpService.certificationURL + '/createCertification/',
      JSON.stringify(cert), HttpService.httpOptions);
  }
  updateCertification(id, cert: Certification){
    return this.http.put<Certification>(HttpService.apiURL + HttpService.certificationURL + '/updateCertification/' +id,
      JSON.stringify(cert), HttpService.httpOptions);
  }
  
  // All services related to Questions
  
  getQuestions(){
    return this.http.get<Question[]>(HttpService.apiURL + HttpService.questionsURL);
  }
  createQuestion(question : Question){
	return this.http.post<Question>(HttpService.apiURL + '/questions' + '/createQuestion',
      JSON.stringify(question), HttpService.httpOptions);
  }



  // All services related to assignment
  getAssignment(){
    return this.http.get<Assignment[]>(HttpService.apiURL + HttpService.assignmentsURL + '/getAssignment/')
  }
  createAssignment(ass: Assignment){
    return this.http.post<Assignment>(HttpService.apiURL + HttpService.assignmentsURL + '/createAssignment/',
      JSON.stringify(ass), HttpService.httpOptions);
  }
  getAssignmentProjectById(id: string){
    return this.http.get<Assignment>(HttpService.apiURL + HttpService.assignmentsURL+ '/' + id);
  }
  updateAssignment(id, ass: Assignment){
    return this.http.put<Assignment>(HttpService.apiURL + HttpService.assignmentsURL + '/updateAssignment/' + id,
      JSON.stringify(ass), HttpService.httpOptions);
  }
}


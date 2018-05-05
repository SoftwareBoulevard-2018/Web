import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { GeneralServiceService } from './general-service.service';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { CompanyStatusComponent } from './company-status/company-status.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailComponent } from './email/email.component';
import { PmanagerComponent } from './pmanager/pmanager.component';
import { EstimationComponent } from './estimation/estimation.component';
import { RecruitMemberComponent } from './recruit-member/recruit-member.component';
import { ChooseprojectComponent } from './chooseproject/chooseproject.component';
import { PmfunctionsComponent } from './pmfunctions/pmfunctions.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SetUpComponent } from './set-up/set-up.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { UpdateQuestionComponent} from './update-question/update-question.component';
import { CreatePuzzleComponent} from './create-puzzle/create-puzzle.component';
import { UpdatePuzzleComponent} from './update-puzzle/update-puzzle.component';
import { UpdateParametersComponent} from './update-parameters/update-parameters.component';
import { ReportsComponent } from './reports/reports.component';
import { NewInstantProjectComponent } from './new-instant-project/new-instant-project.component';
import { NewBiddingProjectComponent } from './new-bidding-project/new-bidding-project.component';

const routes: Routes = [
  {'path': '', 'component': LoginComponent},
  {'path': 'home', 'component': HomeComponent},
  {'path': 'home/reports', 'component': ReportsComponent},
  {'path': 'home/users', 'component': UsersComponent},
  {'path': 'home/users/create', 'component': CreateUserComponent},
  {'path': 'home/users/user-status', 'component': UserStatusComponent},
  {'path': 'home/users/user-status/update', 'component': UpdateUserComponent},
  {'path': 'home/companies', 'component': CompaniesComponent},
  {'path': 'home/companies/create', 'component': CreateCompanyComponent},
  {'path': 'home/companies/company-status', 'component': CompanyStatusComponent},
  {'path': 'home/companies/company-status/update', 'component': UpdateCompanyComponent},
  {'path': 'home/set-up', 'component': SetUpComponent},
  {'path': 'home/set-up/create-project', 'component': CreateProjectComponent},
  {'path': 'home/set-up/update-project', 'component': UpdateProjectComponent},
  {'path': 'home/set-up/create-question', 'component': CreateQuestionComponent},
  {'path': 'home/set-up/update-question', 'component': UpdateQuestionComponent},
  {'path': 'home/set-up/create-puzzle', 'component': CreatePuzzleComponent},
  {'path': 'home/set-up/update-puzzle', 'component': UpdatePuzzleComponent},
  {'path': 'home/set-up/update-parameters', 'component': UpdateParametersComponent},
  {'path': 'home/set-up/create-project/new-bidding-project', 'component': NewBiddingProjectComponent},
  {'path': 'home/set-up/create-project/new-instant-project', 'component': NewInstantProjectComponent},
  {'path': 'restricted', 'component': RestrictedComponent},
  {'path': 'home/users/projectmanager', 'component': PmanagerComponent},
  {'path': 'home/users/projectmanager/functions', 'component': PmfunctionsComponent},
  {'path': 'home/users/projectmanager/functions/chooseproject', 'component': ChooseprojectComponent},
  {'path': 'home/users/projectmanager/functions/estimation', 'component': EstimationComponent},
  {'path': 'home/users/projectmanager/functions/recruit', 'component': RecruitMemberComponent},
  {'path': '**', 'component': NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CompaniesComponent,
    UsersComponent,
    UserStatusComponent,
    CompanyStatusComponent,
    CreateUserComponent,
    CreateCompanyComponent,
    UpdateUserComponent,
    UpdateCompanyComponent,
    RestrictedComponent,
    NotFoundComponent,
    EmailComponent,
    PmanagerComponent,
    EstimationComponent,
    RecruitMemberComponent,
    ChooseprojectComponent,
    PmfunctionsComponent,
    CreateProjectComponent,
    SetUpComponent,
    UpdateProjectComponent,
    CreateQuestionComponent,
    UpdateQuestionComponent,
    CreatePuzzleComponent,
    UpdatePuzzleComponent,
    UpdateParametersComponent,
    NewInstantProjectComponent,
    NewBiddingProjectComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

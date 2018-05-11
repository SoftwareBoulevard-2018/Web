// Fundamental imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

// Service imports
import { GeneralServiceService } from './general-service.service';

// Angular imports
import { MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { MatIconModule, MatButtonModule, MatSidenavModule, MatRadioModule } from '@angular/material';
import { MatSelectModule, MatListModule, MatExpansionModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';

// Components imports
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
import { CreatePuzzleComponent} from './create-puzzle/create-puzzle.component';
import { UpdatePuzzleComponent} from './update-puzzle/update-puzzle.component';
import { UpdateParametersComponent} from './update-parameters/update-parameters.component';
import { ReportsComponent } from './reports/reports.component';
import { NewInstantProjectComponent } from './new-instant-project/new-instant-project.component';
import { NewBiddingProjectComponent } from './new-bidding-project/new-bidding-project.component';
import { PlayComponent } from './play/play.component';
import { PlaySkillComponent } from './play-skill/play-skill.component';
import { PlayDevelopComponent } from './play-develop/play-develop.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { UpdateBiddingProjectComponent } from './update-bidding-project/update-bidding-project.component';
import { UpdateInstantProjectComponent } from './update-instant-project/update-instant-project.component';
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { GenerateresourcesComponent } from './generateresources/generateresources.component';

// App routes
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
  {'path': 'home/set-up/create-puzzle', 'component': CreatePuzzleComponent},
  {'path': 'home/set-up/update-puzzle', 'component': UpdatePuzzleComponent},
  {'path': 'home/set-up/update-parameters', 'component': UpdateParametersComponent},
  {'path': 'home/set-up/create-project/new-bidding-project', 'component': NewBiddingProjectComponent},
  {'path': 'home/set-up/create-project/new-instant-project', 'component': NewInstantProjectComponent},
  {'path': 'home/set-up/update-project/update-instant-project', 'component': UpdateInstantProjectComponent},
  {'path': 'home/set-up/update-project/update-bidding-project', 'component': UpdateBiddingProjectComponent},
  {'path': 'restricted', 'component': RestrictedComponent},
  {'path': 'home/users/projectmanager', 'component': PmanagerComponent},
  {'path': 'home/users/projectmanager/functions', 'component': PmfunctionsComponent},
  {'path': 'home/users/projectmanager/functions/chooseproject', 'component': ChooseprojectComponent},
  {'path': 'home/users/projectmanager/functions/estimation', 'component': EstimationComponent},
  {'path': 'home/users/projectmanager/functions/recruit', 'component': RecruitMemberComponent},
  {'path': 'home/users/projectmanager/functions/generate', 'component': GenerateresourcesComponent},
  {'path': 'home/play', 'component': PlayComponent},
  {'path': 'home/play/skill', 'component': PlaySkillComponent},
  {'path': 'home/play/develop', 'component': PlayDevelopComponent},
  {'path': 'home/join-team', 'component': JoinTeamComponent},
  {'path': 'home/set-up/update-question', 'component': UpdateQuestionComponent},
  {'path': 'home/set-up/update-question/edit-question', 'component': EditQuestionComponent}
];

// NgModule variables
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
    GenerateresourcesComponent,
    CreateProjectComponent,
    SetUpComponent,
    UpdateProjectComponent,
    CreateQuestionComponent,
    CreatePuzzleComponent,
    UpdatePuzzleComponent,
    UpdateParametersComponent,
    NewInstantProjectComponent,
    NewBiddingProjectComponent,
    ReportsComponent,
    UpdateBiddingProjectComponent,
    UpdateInstantProjectComponent,
    PlayComponent,
    PlaySkillComponent,
    PlayDevelopComponent,
    JoinTeamComponent,
    UpdateQuestionComponent,
    EditQuestionComponent,
    GenerateresourcesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    CdkTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatExpansionModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    CdkTableModule,
    MatButtonModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatRadioModule,
    BrowserAnimationsModule
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

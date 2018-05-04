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

const routes: Routes = [
  {'path':'', 'component':LoginComponent},
  {'path':'home', 'component':HomeComponent},
  {'path':'home/users', 'component':UsersComponent},
  {'path':'home/users/create', 'component':CreateUserComponent},
  {'path':'home/users/user-status', 'component':UserStatusComponent},
  {'path':'home/users/user-status/update', 'component':UpdateUserComponent},
  {'path':'home/companies', 'component':CompaniesComponent},
  {'path':'home/companies/create', 'component':CreateCompanyComponent},
  {'path':'home/companies/company-status', 'component':CompanyStatusComponent},
  {'path':'home/companies/company-status/update', 'component':UpdateCompanyComponent},
  {'path':'restricted', 'component':RestrictedComponent},
  {'path':'**', 'component':NotFoundComponent}
]

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
    EmailComponent
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { GeneralServiceService } from './general-service.service';

import { MatFormFieldModule } from '@angular/material';

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
  {'path':'home/companies/company-status/update', 'component':UpdateCompanyComponent}
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
    UpdateCompanyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { GeneralServiceService } from './general-service.service';


@Component({
  selector: 'app-root',
  // This defines the components that will appear on the whole app, the router-outlet is the one that changes
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
	   <app-email></app-email>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
}

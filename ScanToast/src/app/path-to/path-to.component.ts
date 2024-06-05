import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FooterComponent } from '../footer/footer.component';
import { SubheadComponent } from '../subhead/subhead.component';
@Component({
  selector: 'app-path-to',
  standalone: true,
  imports: [FooterComponent,SubheadComponent],
  templateUrl: './path-to.component.html',
  styleUrl: './path-to.component.css'
})
export class PathToComponent {
nevigateTOadmin() {
this.router.navigateByUrl('/login');
}
  constructor(private router: Router) { } 
nevigateTOmenu() {
  this.router.navigateByUrl('/menu');
}

}

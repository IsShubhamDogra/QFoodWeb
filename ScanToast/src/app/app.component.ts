import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminEndComponent } from "./admin-end/admin-end.component";
import { UserEndComponent } from "./user-end/user-end.component";
import { PathToComponent } from "./path-to/path-to.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AdminEndComponent, UserEndComponent, PathToComponent ,HttpClientModule]
})
export class AppComponent {
  title = 'ScanToast';
}

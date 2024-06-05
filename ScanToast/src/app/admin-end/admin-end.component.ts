import { Component, inject } from '@angular/core';
import { AddItemComponent } from '../admin-work/add-item/add-item.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-end',
  standalone: true,
  imports: [AddItemComponent,HttpClientModule],
  templateUrl: './admin-end.component.html',
  styleUrl: './admin-end.component.css'
})
export class AdminEndComponent {
  private router=inject(Router);

checklist() {
  this.router.navigateByUrl('/item-list')
}

additemform() {
this.router.navigateByUrl('/add-item')
}
BillInfo() {
  this.router.navigateByUrl('/bill-info')
  }

}

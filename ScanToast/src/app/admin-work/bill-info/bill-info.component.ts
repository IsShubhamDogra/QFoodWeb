import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Bill } from '../../interfaces/bill';
import { AdminService } from '../../services/admin.service';
import { response } from 'express';

@Component({
  selector: 'app-bill-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-info.component.html',
  styleUrl: './bill-info.component.css'
})
export class BillInfoComponent {
  bills:any[]=[];
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    this.loadData();
   }
  loadData() {
     this.adminService.getBills().subscribe((response)=>{
      this.bills=response;
     });
  }


}

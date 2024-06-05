import { CommonModule } from '@angular/common';
import { Component, OnInit ,inject} from '@angular/core';
import { ItemListService } from '../../services/item-list.service';
import { Router } from '@angular/router';
import { UpdateItemComponent } from '../update-item/update-item.component';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule,UpdateItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  rows: any[] = [];
data: any[]=[];
constructor(private itemListService: ItemListService,){}
  ngOnInit(): void {
   this.loadData();
  }

  private router=inject(Router);
  Edit(id:any) {
    this.router.navigate(['/update-item'], {queryParams: {id:id} });
  }

  delete(id: any) {
    this.itemListService.deleteItem(id).subscribe(() => {
      this.loadData();
    });
   }
  
loadData() {
  this.itemListService.getData().subscribe(
    {
      next: (response: any) => {
        this.data=response;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
}
getImageSrc(imageData:any): string {
  if (imageData && imageData.data && imageData.contentType) {
    const base64String = btoa(
      new Uint8Array(imageData.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    // tslint:disable-next-line:ban-source-unknown
    return `data:${imageData.contentType};base64,${base64String}`;
  }
  return ''; 
}

}

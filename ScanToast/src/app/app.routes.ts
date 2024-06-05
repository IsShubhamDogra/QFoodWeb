import { Routes } from '@angular/router';
import { PathToComponent } from './path-to/path-to.component';
import { UserEndComponent } from './user-end/user-end.component';
import { AdminEndComponent } from './admin-end/admin-end.component';
import { AddItemComponent } from './admin-work/add-item/add-item.component';
import { ItemListComponent } from './admin-work/item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { UpdateItemComponent } from './admin-work/update-item/update-item.component';
import { clear } from 'node:console';
import { BillInfoComponent } from './admin-work/bill-info/bill-info.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';





export const routes: Routes = [
    {path:'',component:PathToComponent},
    {path:'login',component:LoginComponent},
    {path: 'menu',loadComponent:()=>import("./user-end/user-end.component").then(c=>c.UserEndComponent)},
    {path:'admin-end',component:AdminEndComponent},
    {path:'add-item',component:AddItemComponent},
    {path:'item-list',component:ItemListComponent},
    {path:'update-item',loadComponent:()=>import('./admin-work/update-item/update-item.component').then(c=>c.UpdateItemComponent)},
    {path:'bill-info',component:BillInfoComponent}
];

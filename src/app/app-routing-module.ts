import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {ScanMenu } from '../app/component/scan-menu/scan-menu';
import { MenuComponent } from '../app/component/menu/menu';

const routes: Routes = [
  // {
  //   path:'',redirectTo:'app-scan-menu',pathMatch:'full'
  // },
  //{ path: '', component: ScanMenu },
 // app-routing.module.ts
{ path: 'menu/:hotelId', component: MenuComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

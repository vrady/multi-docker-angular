import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FibComponent } from './fib/fib.component';

const routes: Routes = [
  {
    path: '',
    component: FibComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

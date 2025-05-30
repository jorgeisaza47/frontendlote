import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoteListComponent } from './lotes/pages/lote-list/lote-list.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: 'list',
    component: LoteListComponent
  },
  {
    path: 'lotes',
    loadChildren: () => import('./lotes/lotes.module').then(m => m.LotesModule)
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

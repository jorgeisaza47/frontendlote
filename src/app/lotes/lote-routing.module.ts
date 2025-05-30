import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoteListComponent } from './pages/lote-list/lote-list.component';
import { CafeComponent } from './pages/cafe/cafe.component';
import { CreateLoteComponent } from './pages/create-lote/create-lote.component';
import { UpdateLoteComponent } from './pages/update-lote/update-lote.component';
import { CreateAguacateComponent } from './pages/aguacate/create-aguacate/create-aguacate.component';
import { AguacateListComponent } from './pages/aguacate/aguacate-list/aguacate-list.component';
import { UpdateAguacateComponent } from './pages/aguacate/update-aguacate/update-aguacate.component';
import { TransactionLoteComponent } from './pages/transaction/list-transaction/transaction-lote.component';
import { CreateTrasactionComponent } from './pages/transaction/create-trasaction/create-trasaction.component';

const routes: Routes = [
  {
    path: 'lote-list',
    component: LoteListComponent
  },
  {
    path: 'cafe',
    component: CafeComponent
  },
  {
    path: 'crear-lote',
    component: CreateLoteComponent
  },
  {
    path: 'actualizar-lote/:id',
    component: UpdateLoteComponent
  },
  {
    path: 'aguacate-list',
    component: AguacateListComponent
  },

  {
    path: 'aguacate',
    component: CreateAguacateComponent
  },
  {
    path: 'actualizar-aguacate/:id',
    component: UpdateAguacateComponent
  },
  {
    path: 'movimiento-list',
    component: TransactionLoteComponent
  },
  {
    path: 'crear-transaccion',
    component: CreateTrasactionComponent
  },
  {
    path: '**',
    redirectTo: 'lote-list'
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoteRoutingModule { }

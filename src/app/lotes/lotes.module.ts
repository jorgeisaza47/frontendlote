import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchComponent } from './components/search/search.component';
import { LoteListComponent } from './pages/lote-list/lote-list.component';
import { LoteRoutingModule } from './lote-routing.module';
import { DateFormatterPipe } from './pipes/dates.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { CafeComponent } from './pages/cafe/cafe.component';
import { CreateLoteComponent } from './pages/create-lote/create-lote.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import { UpdateLoteComponent } from './pages/update-lote/update-lote.component';
import { CreateAguacateComponent } from './pages/aguacate/create-aguacate/create-aguacate.component';
import { AguacateListComponent } from './pages/aguacate/aguacate-list/aguacate-list.component';
import { UpdateAguacateComponent } from './pages/aguacate/update-aguacate/update-aguacate.component';
import { TransactionLoteComponent } from './pages/transaction/list-transaction/transaction-lote.component';
import { CreateTrasactionComponent } from './pages/transaction/create-trasaction/create-trasaction.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchComponent,
    LoteListComponent,
    DateFormatterPipe,
    FormatDatePipe,
    CafeComponent,
    CreateLoteComponent,
    UpdateLoteComponent,
    CreateAguacateComponent,
    AguacateListComponent,
    UpdateAguacateComponent,
    TransactionLoteComponent,
    CreateTrasactionComponent
  ],
  imports: [
    CommonModule,
    LoteRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [HomePageComponent]
})
export class LotesModule { }

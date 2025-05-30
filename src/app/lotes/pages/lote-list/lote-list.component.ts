import { Component, Input, OnInit } from '@angular/core';
import { Lote } from '../../../../models/lote.model';
import { LotesService } from '../../services/lotes.service';
import { format } from 'date-fns';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrl: './lote-list.component.css'
})
export class LoteListComponent implements OnInit {
  @Input()
  public lotes: Lote[] = [];
  fechaMasReciente: string | null = null;
  totalArboles: number = 0;

  selectedLote: any = null;

  constructor(
    private loteService: LotesService,
    private datePipe: DatePipe,

  ) {}

  ngOnInit(): void {
    this.getLotes()
  }

  getLotes() {
    this.loteService.getLotes()
    .subscribe(lotes => {
      this.lotes = lotes;
      this.totalArboles = this.lotes.reduce((sum, lote) => sum + lote.totalTrees, 0);
      })
  }

  setSelectedLote(lote: any) {
    this.selectedLote = lote;
  }
}

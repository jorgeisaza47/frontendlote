import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-lote',
  templateUrl: './transaction-lote.component.html',
  styleUrl: './transaction-lote.component.css'
})
export class TransactionLoteComponent implements OnInit {

  public transactions: Transaction[] = [];
  totalCostByYear: number = 0;
  totalCostByEgreso: number = 0;
  utility: number = 0;
  selectedYear: number = new Date().getFullYear();
  yearOptions: number[] = [];
  estaResaltado: boolean = true;


  constructor(
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.generateYearOptions();
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactions()
    .subscribe(trasaction => {
      this.transactions = trasaction;


      // Filtrar y sumar los costos de las transacciones del año actual
      // this.totalCostByYear = this.calculateTotalCostByYear(this.selectedYear);

      this.calculateTotalCost();
    })
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0   }).format(value);
  }

  // Método para recalcular el total cuando se cambia el año
  calculateTotalCost() {
    this.selectedYear = Number(this.selectedYear);
    this.totalCostByYear = this.calculateTotalCostByYear(this.selectedYear);
    this.totalCostByEgreso = this.calculateTotalByEgresos(this.selectedYear);
    this.utility = this.totalCostByYear - this.totalCostByEgreso;
    }

  calculateTotalCostByYear(year: number): number {
    return this.transactions
      .filter(transaction => new Date(transaction.transactionDate).getFullYear() === year && transaction.type === 'Ingreso')
      .reduce((sum, transaction) => sum + (transaction?.cost  ?? 0 ), 0);
  }

  calculateTotalEgrosos() {
  this.selectedYear = Number(this.selectedYear);
  this.totalCostByEgreso = this.calculateTotalByEgresos(this.selectedYear);
  }


  calculateTotalByEgresos(year: number): number {
    return this.transactions
      .filter(transaction => new Date(transaction.transactionDate).getFullYear() === year && transaction.type === 'Egreso')
      .reduce((sum, transaction) => sum + (transaction?.cost   ?? 0) * (transaction?.amount), 0);
  }

  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    this.yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i); // Últimos 10 años
  }

}

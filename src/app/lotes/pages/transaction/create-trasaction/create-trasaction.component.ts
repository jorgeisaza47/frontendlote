import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-trasaction',
  templateUrl: './create-trasaction.component.html',
  styleUrl: './create-trasaction.component.css'
})
export class CreateTrasactionComponent implements OnInit {

  transactions: Transaction[] = [];

  // Definir el FormGroup
  transactionForm = new FormGroup({
    transactionDate: new FormControl('', Validators.required),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    cost: new FormControl(0, [Validators.required, Validators.min(0)]),
    type: new FormControl('', Validators.required),
    concept: new FormControl('', Validators.required)
  });
  transactionTypes: string[] = ['Ingreso', 'Egreso'];

  constructor(private transactionService: TransactionService) {
    type: ['']
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Cargar transacciones desde la API
  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }

  // Enviar nueva transacción a la API
  addTransaction(): void {
    if (this.transactionForm.valid) {
      const newTransaction = this.transactionForm.value as Transaction;
      this.transactionService.createTrasaction(newTransaction).subscribe((transaction) => {
        this.transactions.push(transaction); // Agregar al array local
        this.transactionForm.reset(); // Resetear el formulario
      });
    }
  }

  // Formatear la moneda en COP
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0   }).format(value);
  }

}

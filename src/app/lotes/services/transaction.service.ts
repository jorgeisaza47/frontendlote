import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../../models/transaction.model';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${ base_url }/transactions`);
  }

  createTrasaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${ base_url }/transactions`, transaction);
  }
}

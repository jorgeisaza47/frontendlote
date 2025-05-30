export class Transaction {
  constructor(
    public id: string,
    public transactionDate: string,
    public amount: number,
    public cost: number,
    public type: string,
    public concept: string,
  ) {}

}

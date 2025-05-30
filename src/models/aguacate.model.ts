export class FumigatedDate {
  constructor(
    public date: string,
    public veneno: string,
  ) {}
}

export class Aguacate {
  constructor(
    public id: string,
    public totalTrees: number,
    public fertilizerDate: string[],
    public fumigatedDate: FumigatedDate[],
    public plantingDate: string[],
    public venenoAplicado: string,
  ) {}

}




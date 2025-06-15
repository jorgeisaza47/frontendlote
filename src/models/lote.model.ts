export class FumigatedDate {
  constructor(
    public date: string,
    public veneno: string,
  ) {}
}


export class Lote {
  constructor(
    public id: string,
    public name: string,
    public totalTrees: number,
    public fertilizerDate: string[],
    public plantingDate: string[],
    public cleanedDate: string[],
    public numberReseeding: number,
    public reseedingDate: string[],
    public fumigatedDate: FumigatedDate[],
  ) {}

}




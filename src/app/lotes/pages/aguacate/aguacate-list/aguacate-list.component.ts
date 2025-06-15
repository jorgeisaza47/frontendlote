import { Component, OnInit } from '@angular/core';
import { Aguacate } from '../../../../../models/aguacate.model';
import { AguacateService } from '../../../services/aguacate.service';

@Component({
  selector: 'app-aguacate-list',
  templateUrl: './aguacate-list.component.html',
  styleUrl: './aguacate-list.component.css'
})
export class AguacateListComponent implements OnInit {
  public aguacates: Aguacate[] = [];
  fechaMasReciente: string | null = null;
  totalArboles: number = 0;
  selectedAguacate: any = null;

  constructor(
    private aguacateService: AguacateService,
  ) {}

  ngOnInit(): void {
    this.getAguacates()
  }

  getAguacates() {
    this.aguacateService.getAguacates()
    .subscribe(aguacate => {
      this.aguacates = aguacate;
      })
  }

  setSelectedAguacate(aguacate: any) {
    this.selectedAguacate = aguacate;
  }

}

import { Component } from '@angular/core';
import { Lote } from '../../../../models/lote.model';
import { LotesService } from '../../services/lotes.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lote',
  templateUrl: './create-lote.component.html',
  styleUrl: './create-lote.component.css'
})
export class CreateLoteComponent {
  // public lote: Lote;
  public loteForm: FormGroup;

  constructor(
    private loteService: LotesService,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.loteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      totalTrees: [0, [Validators.required, Validators.min(1)]],
      fertilizerDate: this.fb.array([]),
      plantingDate: this.fb.array([]),
      cleanedDate: this.fb.array([]),
      numberReseeding: [0],
      reseedingDate: this.fb.array([]),
      fumigatedDate: this.fb.array([])
    });
  }

  // Métodos para manejar los FormArrays
  get fertilizerDates(): FormArray {
    return this.loteForm.get('fertilizerDate') as FormArray;
  }

  get plantingDates(): FormArray {
    return this.loteForm.get('plantingDate') as FormArray;
  }

  get cleanedDates(): FormArray {
    return this.loteForm.get('cleanedDate') as FormArray;
  }

  get reseedingDates(): FormArray {
    return this.loteForm.get('reseedingDate') as FormArray;
  }

  get fumigatedDates(): FormArray {
    return this.loteForm.get('fumigatedDate') as FormArray;
  }

  // Métodos para añadir fechas a los FormArrays
  addFertilizerDate(): void {
    this.fertilizerDates.push(this.fb.control('', Validators.required));
  }

  addPlantingDate(): void {
    this.plantingDates.push(this.fb.control('', Validators.required));
  }

  addCleanedDate(): void {
    this.cleanedDates.push(this.fb.control('', Validators.required));
  }

  addReseedingDate(): void {
    this.reseedingDates.push(this.fb.control(''));
  }

  addFumigatedDate(): void {
    this.fumigatedDates.push(this.fb.control(''));
  }

  onSubmit() {
     const lote: Lote = this.loteForm.value;
     this.loteService.createLote(lote).subscribe( response => {
      this.router.navigate(['/lote-list']);
      // this.lote = response.name;
    });
  }

}

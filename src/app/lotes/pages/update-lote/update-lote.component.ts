import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LotesService } from '../../services/lotes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lote } from '../../../../models/lote.model';

@Component({
  selector: 'app-update-lote',
  templateUrl: './update-lote.component.html',
  styleUrl: './update-lote.component.css'
})
export class UpdateLoteComponent implements OnInit {
  public loteForm: FormGroup;
  private loteId!: string; // ID del lote a actualizar

  constructor(
    private loteService: LotesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loteForm = this.fb.group({
      name: ['', [ Validators.minLength(3)]],
      totalTrees: [0, [ Validators.min(1)]],
      fertilizerDate: this.fb.array([]),
      plantingDate: this.fb.array([]),
      cleanedDate: this.fb.array([]),
      numberReseeding: [0],
      reseedingDate: this.fb.array([]),
      fumigatedDate: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loteId = this.route.snapshot.paramMap.get('id')!;
    this.loadLote();
  }

  // Cargar los datos del lote desde el backend
  loadLote(): void {
    this.loteService.getLote(this.loteId).subscribe((lote: Lote) => {
      this.loteForm.patchValue({
        name: lote.name,
        totalTrees: lote.totalTrees,
        numberReseeding: lote.numberReseeding,
      });

      this.setFormArray(this.fertilizerDates, lote.fertilizerDate);
      this.setFormArray(this.plantingDates, lote.plantingDate);
      this.setFormArray(this.cleanedDates, lote.cleanedDate);
      this.setFormArray(this.reseedingDates, lote.reseedingDate);
      this.setFumigatedFormArray(lote.fumigatedDate);
    });
  }

  // Obtener referencias a los FormArrays
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

  // Llenar un FormArray con datos previos
  private setFormArray(formArray: FormArray, values: string[]): void {
    formArray.clear();
    values.forEach(value => {
      formArray.push(this.fb.control(value));
    });
  }

  private setFumigatedFormArray(values: { date: string; veneno: string }[]): void {
    this.fumigatedDates.clear();
    values.forEach(value => {
      this.fumigatedDates.push(this.fb.group({
        date: [this.formatDate(value.date)],
        veneno: [value.veneno]
      }));
    });
  }


  // Métodos para agregar fechas a los FormArrays
  addFertilizerDate(): void {
    this.fertilizerDates.push(this.fb.control(''));
  }

  addPlantingDate(): void {
    this.plantingDates.push(this.fb.control(''));
  }

  addCleanedDate(): void {
    this.cleanedDates.push(this.fb.control(''));
  }

  addReseedingDate(): void {
    this.reseedingDates.push(this.fb.control(''));
  }

  addFumigatedDate(): void {
    this.fumigatedDates.push(this.fb.group({
      date: [''],
      veneno: ['']
    }));
  }


  // Enviar datos actualizados al backend
  onSubmit(): void {
    if (this.loteForm.invalid) return;

    const updatedLote: Lote = this.loteForm.value;

    this.loteService.updateLote(this.loteId, updatedLote).subscribe(() => {
      this.router.navigate(['/lote-list']);
    });
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return ''; // Previene errores con valores vacíos o nulos
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AguacateService } from '../../../services/aguacate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aguacate, FumigatedDate } from '../../../../../models/aguacate.model';

@Component({
  selector: 'app-update-aguacate',
  templateUrl: './update-aguacate.component.html',
  styleUrl: './update-aguacate.component.css'
})
export class UpdateAguacateComponent implements OnInit {
  public aguacateForm: FormGroup;
  public aguacateId!: string;

  constructor(
    private fb: FormBuilder,
    private aguacateService: AguacateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.aguacateForm = this.fb.group({
      totalTrees: [0, []],
      fertilizerDate: this.fb.array([]),
      plantingDate: this.fb.array([]),
      fumigatedDate: this.fb.array([]),
      venenoAplicado: ['', []]
    });
  }

  ngOnInit(): void {
    this.aguacateId = this.route.snapshot.paramMap.get('id')!;
    this.loadAguacate();
  }

  loadAguacate(): void {
    this.aguacateService.getLote(this.aguacateId).subscribe((aguacate: Aguacate) => {
      this.aguacateForm.patchValue({
        totalTrees: aguacate.totalTrees,
        venenoAplicado: aguacate.venenoAplicado,
      });
      this.setStringArray(this.fertilizerDates, aguacate.fertilizerDate);
      this.setStringArray(this.plantingDates, aguacate.plantingDate);
      this.setFumigatedArray(aguacate.fumigatedDate);
    });
  }

  // Getters
  get fertilizerDates(): FormArray {
    return this.aguacateForm.get('fertilizerDate') as FormArray;
  }

  get plantingDates(): FormArray {
    return this.aguacateForm.get('plantingDate') as FormArray;
  }

  get fumigatedDates(): FormArray {
    return this.aguacateForm.get('fumigatedDate') as FormArray;
  }

  // Métodos para setear los arrays
  private setStringArray(formArray: FormArray, values: string[]): void {
    formArray.clear();
    values.forEach(value => {
      formArray.push(this.fb.control(this.formatDate(value), Validators.required));
    });
  }

  private setFumigatedArray(values: FumigatedDate[]): void {
    this.fumigatedDates.clear();
    values.forEach(item => {
      this.fumigatedDates.push(this.fb.group({
        date: [this.formatDate(item.date), Validators.required],
        veneno: [item.veneno, Validators.required]
      }));
    });
  }

  // Agregar elementos
  addFertilizerDate(): void {
    this.fertilizerDates.push(this.fb.control('', Validators.required));
  }

  addPlantingDate(): void {
    this.plantingDates.push(this.fb.control('', Validators.required));
  }

  addFumigatedDate(): void {
    this.fumigatedDates.push(this.fb.group({
      date: ['', Validators.required],
      veneno: ['', Validators.required]
    }));
  }

  // Eliminar elementos
  removeFertilizerDate(index: number): void {
    this.fertilizerDates.removeAt(index);
  }

  removePlantingDate(index: number): void {
    this.plantingDates.removeAt(index);
  }

  removeFumigatedDate(index: number): void {
    this.fumigatedDates.removeAt(index);
  }

  onSubmit(): void {
    if (this.aguacateForm.invalid) return;

    const formValue = this.aguacateForm.value;

    if (this.aguacateForm.invalid) {
      return;
    }

    const updatedAguacate: Aguacate = {
      id: this.aguacateId,
      totalTrees: formValue.totalTrees,
      fertilizerDate: formValue.fertilizerDate,
      plantingDate: formValue.plantingDate,
      venenoAplicado: formValue.venenoAplicado,
      fumigatedDate: formValue.fumigatedDate
    };

    this.aguacateService.updateAguacate(this.aguacateId, updatedAguacate).subscribe(() => {
      this.router.navigate(['/aguacate-list']);
    });
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return ''; // Previene errores con valores vacíos o nulos
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  }


}

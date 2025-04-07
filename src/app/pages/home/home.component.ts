import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { DataModelType } from '../../types/data-model.type';
import { InputOnlyNumbersComponent } from '../../components/input-only-numbers/input-only-numbers.component';
import { InputDataComponent } from '../../components/input-data/input-data.component';

@Component({
  selector: 'app-home',
  imports: [
    InputOnlyNumbersComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    TableComponent,
    InputDataComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  collectDataForm = new FormGroup({
    refMin: new FormControl('', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    refCur: new FormControl('', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    refMax: new FormControl('', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    envMin: new FormControl('', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    envCur: new FormControl('', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    envMax: new FormControl('', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
  });

  searchDataForm = new FormGroup({
    initData: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    endData: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  send() {
    console.log('Enviar dados!');
  }

  searchData() {
    console.log('Buscar filtro de data');
  }

  printSelection() {
    console.log('Imprimir seleção');
  }

  get refMinInvalid(): boolean {
    return (
      this.collectDataForm.controls.refMin.invalid &&
      this.collectDataForm.controls.refMin.touched
    );
  }

  get refCurInvalid(): boolean {
    return (
      this.collectDataForm.controls.refCur.invalid &&
      this.collectDataForm.controls.refCur.touched
    );
  }

  get refMaxInvalid(): boolean {
    return (
      this.collectDataForm.controls.refMax.invalid &&
      this.collectDataForm.controls.refMax.touched
    );
  }

  get envMinInvalid(): boolean {
    return (
      this.collectDataForm.controls.envMin.invalid &&
      this.collectDataForm.controls.envMin.touched
    );
  }

  get envCurInvalid(): boolean {
    return (
      this.collectDataForm.controls.envCur.invalid &&
      this.collectDataForm.controls.envCur.touched
    );
  }

  get envMaxInvalid(): boolean {
    return (
      this.collectDataForm.controls.envMax.invalid &&
      this.collectDataForm.controls.envMax.touched
    );
  }

  get dateInitInvalid(): boolean {
    return (
      this.searchDataForm.controls.initData.invalid &&
      this.searchDataForm.controls.endData.touched
    );
  }

  get dateEndInvalid(): boolean {
    return (
      this.searchDataForm.controls.endData.invalid &&
      this.searchDataForm.controls.endData.touched
    );
  }

  getFakeData(): DataModelType[] {
    return [
      {
        data: '19/03/2025-07:10',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '19/03/2025-11:55',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '19/03/2025-16:50',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '20/03/2025-07:10',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '20/03/2025-11:55',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '20/03/2025-16:50',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '21/03/2025-07:10',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '21/03/2025-11:55',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '21/03/2025-16:50',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '19/03/2025-07:10',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '22/03/2025-11:55',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
      {
        data: '22/03/2025-16:50',
        fridge: { min: '-3°C', cur: '-4°C', max: '-5°C' },
        env: { min: '27°C', cur: '28°C', max: '29°C' },
        user: 'JOÃO MOURATO',
      },
    ];
  }
}

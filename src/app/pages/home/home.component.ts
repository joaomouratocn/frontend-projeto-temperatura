import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { TableComponent } from '../../components/table/table.component';
import { DataModelType } from '../../types/data-model.type';

@Component({
  selector: 'app-home',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  data: DataModelType[] = [
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

  collectDataForm = new FormGroup({
    refMin: new FormControl('', [Validators.required, Validators.minLength(3)]),
    refCur: new FormControl('', [Validators.required]),
    refMax: new FormControl('', [Validators.required]),
    envMin: new FormControl('', [Validators.required]),
    envCur: new FormControl('', [Validators.required]),
    envMax: new FormControl('', [Validators.required]),
  });

  send() {
    console.log('Enviar dados!');
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
}

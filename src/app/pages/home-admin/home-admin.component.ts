import { Component } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UnitModelType } from '../../types/unit-model.type';
import { InputDataComponent } from '../../components/input-data/input-data.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { DataModelType } from '../../types/data-model.type';
import { RequestService } from '../../services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputDataComponent,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css',
})
export class HomeAdminComponent {
  unitArray: UnitModelType[] = [];

  formCollectData = new FormGroup({
    unit: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    allUnits: new FormControl(false),
    initData: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    endData: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUnits();
  }

  getReport() {
    if (this.invalidFields()) {
      return;
    }

    const { unit, allUnits, initData, endData } = this.formCollectData.controls;
  }

  toggleDisable() {
    const unitControl = this.formCollectData.controls.unit;
    unitControl?.disabled ? unitControl.enable() : unitControl?.disable();
  }

  get unitInvalid(): boolean {
    return (
      this.formCollectData.controls.unit.invalid &&
      this.formCollectData.controls.unit.touched
    );
  }

  get initDateInvalid(): boolean {
    return (
      this.formCollectData.controls.initData.invalid &&
      this.formCollectData.controls.initData.touched
    );
  }

  get endDateInvalid(): boolean {
    return (
      this.formCollectData.controls.endData.invalid &&
      this.formCollectData.controls.endData.touched
    );
  }

  invalidFields(): boolean {
    let fieldsError: string[] = [];

    const { unit, allUnits, initData, endData } = this.formCollectData.controls;

    if (unit.invalid && !allUnits.value) {
      fieldsError.push('Unidade');
    }
    if (initData.invalid) {
      fieldsError.push('Data inicial');
    }
    if (endData.invalid) {
      fieldsError.push('Data final');
    }

    if (fieldsError.length === 0) {
      return false;
    }

    this.toastr.error(`Campos invalídos: \n ${fieldsError.join(', ')}`);
    return true;
  }

  getUnits() {
    this.requestService.getUnits().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.unitArray = response;
        } else {
          const errorMessage = response.description || 'Erro desconhecido!';
          this.toastr.error(errorMessage);
          console.log(response);
        }
      },
      error: (erro) => {
        this.toastr.error('Erro de comunicação com o servidor.');
        console.error('Erro HTTP:', erro);
      },
    });
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

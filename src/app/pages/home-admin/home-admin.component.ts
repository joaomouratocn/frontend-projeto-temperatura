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
import { RequestService } from '../../services/requests/request.service';
import { ToastrService } from 'ngx-toastr';
import { DataModelGetType } from '../../types/data-model-get.type';
import { SessionService } from '../../services/session/session-service.service';

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
  data: DataModelGetType[] = [];
  unitArray: UnitModelType[] = [];
  isLoadingFilter = false;
  isLoadingPrint = false;
  disableFilterButton = false;
  disablePrintButton = false;

  formFilterData = new FormGroup({
    unit: new FormControl<UnitModelType | null>(null, [Validators.required]),
    allUnits: new FormControl(false),
    startDate: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    endDate: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getUnits();
  }

  getFilter() {
    if (this.invalidFields()) {
      return;
    }

    const { startDate: startDate, endDate: endDate } =
      this.formFilterData.controls;

    if (
      typeof startDate.value === 'string' &&
      typeof endDate.value === 'string'
    ) {
      this.isLoadingFilter = true;

      this.sessionService.set(
        'unitId',
        this.formFilterData.controls.unit.value?.uuid
      );
      this.sessionService.set(
        'unitName',
        this.formFilterData.controls.unit.value?.name
      );
      this.requestService
        .getDataInterval(startDate.value, endDate.value)
        .subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.toastr.warning('Sem dados para carregar neste intervalo');
            }
            this.data = response;
          },
          error: (error) => {
            console.error('Erro detalhado:', error);
            const msg =
              error?.error?.message || 'Erro ao buscar dados selecionados';
            this.toastr.error(msg);
          },
          complete: () => {
            this.isLoadingFilter = false;
          },
        });
    }
  }

  selectReport() {
    if (this.formFilterData.controls.allUnits.value) {
      this.getRegportAllUnits();
    } else {
      this.getReport();
    }
  }

  getReport() {
    if (
      this.formFilterData.controls.startDate.invalid ||
      this.formFilterData.controls.endDate.invalid
    ) {
      this.toastr.error('Campos de data inválidos!');
      return;
    }

    const { startDate: startDate, endDate: endDate } =
      this.formFilterData.controls;

    if (
      typeof startDate.value === 'string' &&
      typeof endDate.value === 'string'
    ) {
      this.isLoadingPrint = true;
      this.sessionService.set(
        'unitId',
        this.formFilterData.controls.unit.value?.uuid
      );
      this.sessionService.set(
        'unitName',
        this.formFilterData.controls.unit.value?.name
      );
      this.requestService
        .printInterval(startDate.value, endDate.value)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio-unidade.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
            console.error('Erro ao gerar PDF de unidade', error);
          },
          complete: () => {
            this.isLoadingPrint = false;
          },
        });
    }
  }

  getRegportAllUnits() {
    if (
      this.formFilterData.controls.startDate.invalid ||
      this.formFilterData.controls.endDate.invalid
    ) {
      this.toastr.error('Campos de data inválidos!');
      return;
    }

    const { startDate: startDate, endDate: endDate } =
      this.formFilterData.controls;

    if (
      typeof startDate.value === 'string' &&
      typeof endDate.value === 'string'
    ) {
      this.isLoadingPrint = true;
      this.requestService
        .printAllUnits(startDate.value, endDate.value)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio-unidade.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
            this.toastr.error('Erro ao gerar Relatório');
            console.error('Erro ao gerar PDF das unidades: ', error);
          },
          complete: () => {
            this.isLoadingPrint = false;
          },
        });
    }
  }

  toggleDisable() {
    const unitControl = this.formFilterData.controls.unit;
    unitControl?.disabled ? unitControl.enable() : unitControl?.disable();

    this.disableFilterButton
      ? (this.disableFilterButton = false)
      : (this.disableFilterButton = true);
  }

  get disablePrint(): boolean {
    return (
      this.formFilterData.controls.startDate.invalid ||
      this.formFilterData.controls.endDate.invalid
    );
  }

  invalidFields(): boolean {
    let fieldsError: string[] = [];

    const {
      unit,
      allUnits,
      startDate,
      endDate: endData,
    } = this.formFilterData.controls;

    if (unit.invalid && !allUnits.value) {
      fieldsError.push('Unidade');
    }
    if (startDate.invalid) {
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
        this.unitArray = response;
      },
      error: (erro) => {
        this.toastr.error('Erro ao carregar as unidades');
        console.error(erro);
      },
    });
  }

  get unitInvalid(): boolean {
    return (
      this.formFilterData.controls.unit.invalid &&
      this.formFilterData.controls.unit.touched
    );
  }

  get initDateInvalid(): boolean {
    return (
      this.formFilterData.controls.startDate.invalid &&
      this.formFilterData.controls.startDate.touched
    );
  }

  get endDateInvalid(): boolean {
    return (
      this.formFilterData.controls.endDate.invalid &&
      this.formFilterData.controls.endDate.touched
    );
  }
}

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
import { RequestService } from '../../services/request.service';
import { ToastrService } from 'ngx-toastr';
import { decode } from '../../utils/Decode';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { getDateHour } from '../../utils/GetDateHour';

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
  unitName: string = '';
  data: DataModelType[] = [];

  collectDataForm = new FormGroup({
    refMin: new FormControl('-7.50', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    refCur: new FormControl('-7.70', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    refMax: new FormControl('-8.00', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    envMin: new FormControl('27.45', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    envCur: new FormControl('28.00', [
      Validators.required,
      Validators.min(-30),
      Validators.max(100),
    ]),
    envMax: new FormControl('29.00', [
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

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (decode()?.role === '1') {
      this.requestService.getUnitByUser().subscribe({
        next: (response) => {
          if ('name' in response) {
            this.loadTable(response.id);
            this.unitName = response.name;
          } else {
            console.error(`Erro ao carregar dados: ${response.message}`);
          }
        },
        error: (error) => {
          console.error(`Erro de comnunicação com servidor: ${error}`);
          this.toastr.error('Não foi possivel carregar nome da unidade');
        },
      });
    } else {
      this.requestService.getUnitById().subscribe({
        next: (response) => {
          if ('name' in response) {
            this.loadTable(response.id);
            this.unitName = response.name;
          } else {
            console.error(`Erro ao carregar dados: ${response.message}`);
            this.toastr.error('Não foi possivel carregar nome da unidade');
          }
        },
        error: (error) => {
          console.error(`Erro de comnunicação com servidor: ${error}`);
          this.toastr.error('Não foi possivel carregar nome da unidade');
        },
      });
    }
  }

  sendData() {
    if (this.isInvalidField()) {
      return;
    }

    const { refMin, refCur, refMax, envMin, envCur, envMax } =
      this.collectDataForm.controls;

    if (
      typeof refMin.value === 'string' &&
      typeof refCur.value === 'string' &&
      typeof refMax.value === 'string' &&
      typeof envMin.value === 'string' &&
      typeof envCur.value === 'string' &&
      typeof envMax.value === 'string'
    ) {
      const data: DataModelType = {
        date: getDateHour(),
        fridge: { min: refMin.value, cur: refCur.value, max: refMax.value },
        env: { min: envMin.value, cur: envCur.value, max: envMax.value },
        unit: sessionStorage.getItem('unitId') || '',
        user: decode()?.userId || '',
      };

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Confirme',
          message: `Confimar a inserção deste dados?\nApós o envio não será possivel altera-los.\n
          Geladeira:\nMin: ${data.fridge.min}\nAtual: ${data.fridge.cur}\nMax: ${data.fridge.max}
          \nAmbiente:\nMin: ${data.env.min}\nAtual: ${data.env.cur}\nMax: ${data.env.max}`,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.requestService.sendData(data).subscribe({
            next: (response) => {
              if ('id' in response) {
                this.toastr.success('Dados enviados com sucesso!');
                if (data.unit !== '') {
                  this.loadTable(data.unit);
                }
              } else {
                this.toastr.error(response.message);
              }
            },
            error: (erro) => {
              this.toastr.error('Erro na comunicação com servidor');
              console.error(erro);
            },
          });
        }
      });
    }
  }

  loadTable(unitId: string) {
    this.requestService.getData(unitId).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.data = response;
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (erro) => {
        this.toastr.error('Erro na comunicação com servidor');
        console.log(erro);
      },
    });
  }

  isInvalidField(): boolean {
    let isInvalidField: String[] = [];

    if (this.collectDataForm.controls.refMin.invalid) {
      isInvalidField.push('Geladeira Miníma');
    }
    if (this.collectDataForm.controls.refCur.invalid) {
      isInvalidField.push('Geladeira Atual');
    }
    if (this.collectDataForm.controls.refMax.invalid) {
      isInvalidField.push('Geladeira Maxíma');
    }
    if (this.collectDataForm.controls.envMin.invalid) {
      isInvalidField.push('Ambiente Minímo');
    }
    if (this.collectDataForm.controls.refCur.invalid) {
      isInvalidField.push('Ambiente Atual');
    }
    if (this.collectDataForm.controls.envMax.invalid) {
      isInvalidField.push('Ambiente Maxímo');
    }

    if (isInvalidField.length === 0) {
      return false;
    }

    this.toastr.error(`Campos inválidos: ${isInvalidField.join(', ')}`);
    return true;
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

  get dataInitInvalid(): boolean {
    return (
      this.searchDataForm.controls.initData.invalid &&
      this.searchDataForm.controls.initData.touched
    );
  }

  get dataEndInvalid(): boolean {
    return (
      this.searchDataForm.controls.endData.invalid &&
      this.searchDataForm.controls.endData.touched
    );
  }
}

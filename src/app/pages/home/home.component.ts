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
import { InputOnlyNumbersComponent } from '../../components/input-only-numbers/input-only-numbers.component';
import { InputDataComponent } from '../../components/input-data/input-data.component';
import { RequestService } from '../../services/requests/request.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { DataModelSendType } from '../../types/data-model-send.type';
import { DataModelGetType } from '../../types/data-model-get.type';
import { AuthService } from '../../services/auth/auth.service';

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
  isLoading = false;
  isLoadingFilter = false;
  isdisablePrint = false;
  data: DataModelGetType[] = [];

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
    private authService: AuthService,
    private requestService: RequestService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Erro a pegar o token');
    }

    const userRole = this.authService.decodeToken()?.role;
    if (userRole === 'USER') {
      this.requestService.getUnitByUser().subscribe({
        next: (response) => {
          this.unitName = response.name;
          this.loadInit();
        },
        error: (error) => {
          console.error('Erro detalhado:', error);
          const msg =
            error?.error?.message || 'Erro ao carregar dados de sua unidade';
          this.toastr.error(msg);
        },
      });
    } else {
      const unit = sessionStorage.getItem('unit');
      if (!unit) {
        this.toastr.error('Erro ao carregar dados da unidade');
        return;
      }

      const name = JSON.parse(unit).name;
      this.unitName = name;
      this.loadInit();
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
      const data: DataModelSendType = {
        dateTime: Date.now().toString(),
        refMin: refMin.value,
        refCur: refCur.value,
        refMax: refMax.value,
        envMin: envMin.value,
        envCur: envCur.value,
        envMax: envMax.value,
      };

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Confirme',
          message: `Confima a inserção deste dados?\nApós o envio não será possivel altera-los.\n
          Geladeira:\nMin: ${data.refMin}\nAtual: ${data.refCur}\nMax: ${data.refMax}
          \nAmbiente:\nMin: ${data.envMin}\nAtual: ${data.envCur}\nMax: ${data.envMax}`,
        },
      });

      dialogRef.afterClosed().subscribe((response) => {
        if (response) {
          this.requestService.sendData(data).subscribe({
            next: (response) => {
              this.toastr.success(response.status);
              this.loadInit();
            },
            error: (error) => {
              console.error('Erro detalhado:', error);
              const msg = error?.error?.message || 'Erro ao enviar os dados';
              this.toastr.error(msg);
            },
          });
        }
      });
    }
  }

  searchInterval() {
    if (
      this.searchDataForm.controls.startDate.invalid ||
      this.searchDataForm.controls.endDate.invalid
    ) {
      this.toastr.error('Campos de data inválidos!');
      return;
    }

    const { startDate: startDate, endDate: endDate } =
      this.searchDataForm.controls;

    if (
      typeof startDate.value === 'string' &&
      typeof endDate.value === 'string'
    ) {
      this.isLoadingFilter = true;
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

  loadInit() {
    this.requestService.getData().subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.toastr.warning('Sem dados para carregar neste intervalo');
        }
        this.data = response;
      },
      error: (error) => {
        console.error('Erro detalhado:', error);
        const msg = error?.error?.message || 'Erro ao buscar dados da unidade';
        this.toastr.error(msg);
      },
    });
  }

  printInterval() {
    if (
      this.searchDataForm.controls.startDate.invalid ||
      this.searchDataForm.controls.endDate.invalid
    ) {
      this.toastr.error('Campos de data inválidos!');
      return;
    }

    const { startDate: startDate, endDate: endDate } =
      this.searchDataForm.controls;

    if (
      typeof startDate.value === 'string' &&
      typeof endDate.value === 'string'
    ) {
      this.isLoading = true;
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
            this.isLoading = false;
          },
        });
    }
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

  get disablePrint(): boolean {
    return (
      this.searchDataForm.controls.startDate.invalid ||
      this.searchDataForm.controls.endDate.invalid
    );
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
      this.searchDataForm.controls.startDate.invalid &&
      this.searchDataForm.controls.startDate.touched
    );
  }

  get dataEndInvalid(): boolean {
    return (
      this.searchDataForm.controls.endDate.invalid &&
      this.searchDataForm.controls.endDate.touched
    );
  }
}

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
import { decode } from '../../utils/decode';

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

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (decode()?.role === '1') {
      this.requestService.getUnit().subscribe({
        next: (response) => {
          if ('name' in response) {
            this.unitName = response.name;
          } else {
            console.error(`Erro ao carregar dados ${response.description}`);
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
            this.unitName = response.name;
          } else {
            console.error(`Erro ao carregar dados ${response.description}`);
          }
        },
        error: (error) => {
          console.error(`Erro de comnunicação com servidor: ${error}`);
          this.toastr.error('Não foi possivel carregar nome da unidade');
        },
      });
    }
  }

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

  getunitName() {
    this.requestService.getUnit().subscribe({
      next: (response) => {
        if ('name' in response) {
          this.unitName = response.name;
        } else {
          this.toastr.error(response.description);
          console.error(response.description);
        }
      },
      error: (error) => {
        this.toastr.error(`Erro na comunicação com servidor: ${error}`);
      },
    });
  }
}

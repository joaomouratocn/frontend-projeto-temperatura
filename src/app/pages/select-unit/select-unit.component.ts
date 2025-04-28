import { Component } from '@angular/core';
import { UnitModelType } from '../../types/unit-model.type';
import { RequestService } from '../../services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectComponent } from '../../components/select/select.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-select-unit',
  imports: [SelectComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './select-unit.component.html',
  styleUrl: './select-unit.component.css',
})
export class SelectUnitComponent {
  unitArray: UnitModelType[] = [];

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUnits();
  }

  selectForm = new FormGroup({
    unit: new FormControl<UnitModelType | null>(null, [Validators.required]),
  });

  get unitInvalid(): boolean {
    return (
      this.selectForm.controls.unit.invalid &&
      this.selectForm.controls.unit.touched
    );
  }

  selectUnit() {
    const unit = this.selectForm.controls.unit.value;

    if (!unit) {
      this.toastr.error('Selecione uma unidade!');
      return;
    }

    sessionStorage.setItem('unit', JSON.stringify(unit));

    this.router.navigate(['']);
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
}

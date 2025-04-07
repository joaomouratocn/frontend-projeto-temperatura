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
  unitArray: UnitModelType[] = [
    { id: '1', name: 'Água vermelha' },
    { id: '2', name: 'Vila Isabel' },
    { id: '3', name: 'Santa Felicia' },
    { id: '4', name: 'São José' },
  ];

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  selectForm = new FormGroup({
    unit: new FormControl('', [Validators.required]),
  });

  get unitInvalid(): boolean {
    return (
      this.selectForm.controls.unit.invalid &&
      this.selectForm.controls.unit.touched
    );
  }
}

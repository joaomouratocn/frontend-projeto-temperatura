import { Component, Input } from '@angular/core';
import { DataModelType } from '../../types/data-model.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data: DataModelType[] = [];
}

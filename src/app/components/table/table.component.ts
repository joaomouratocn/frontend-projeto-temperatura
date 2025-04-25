import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModelGetType } from '../../types/data-model-get.type';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data: DataModelGetType[] = [];
}

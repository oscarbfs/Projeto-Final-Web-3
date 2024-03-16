import { Component, Input } from '@angular/core';
import { SetClassMapper } from '../../../../../domain/models/mappers/set_class_mapper';

@Component({
  selector: 'gc-data-class-component',
  templateUrl: './data-class-component.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./data-class-component.component.css']
})
export class DataClassComponentComponent {
  @Input() classData: SetClassMapper | null = null ;
}

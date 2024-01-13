import { Component } from '@angular/core';

@Component({
  selector: 'gc-overview-class-tab',
  templateUrl: './overview-class-tab.component.html',
  styleUrls: ['./overview-class-tab.component.css']
})
export class OverviewClassTabComponent {
  turmas!: any[];
  
  ngOnInit(): void {
    this.turmas = [
      { id: 1, nome: 'Turma de Matemática', professor: 'Prof. Silva' },
      { id: 2, nome: 'Turma de História', professor: 'Prof. Santos' },
      { id: 3, nome: 'Turma de Ciências', professor: 'Prof. Oliveira' }
    ];
  }
}
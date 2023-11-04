import { Component, Input } from '@angular/core';

@Component({
  selector: 'gc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  nomePagina!: string;
  @Input()
  botoesDireita!: string[];

  onBotaoClicado(botao: string) {
    console.log(`Botão ${botao} clicado.`);
  }
}
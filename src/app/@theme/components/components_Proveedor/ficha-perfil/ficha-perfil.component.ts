import { Component, Input, OnInit } from '@angular/core';
import { IuserProveedor } from '../../../../@core/data/usersModel';

@Component({
  selector: 'ngx-ficha-perfil',
  templateUrl: './ficha-perfil.component.html',
  styleUrls: ['./ficha-perfil.component.scss'],
})
export class FichaPerfilComponent implements OnInit {

  @Input() user: IuserProveedor;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IuserProveedor } from '../../../../@core/data/usersModel';
import { UserProviderService } from '../../../../@core/mock/UserProvider.service';

@Component({
  selector: 'ngx-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss'],
})
export class PerfilUserComponent implements OnInit, OnDestroy {

  subscripciones: Array<Subscription> = [];
  user: IuserProveedor;

  constructor(
    private userService: UserProviderService,
  ) { }

  ngOnDestroy(): void {
    this.subscripciones.forEach(suscripcion => suscripcion.unsubscribe());
  }

  ngOnInit(): void {
    const sub1$ = this.userService.getUser$()
      .subscribe((user: IuserProveedor) => this.user = user);

    this.subscripciones.push(sub1$);
  }
}

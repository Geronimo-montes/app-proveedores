import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-general',
  templateUrl: './general.component.html',
})
export class GeneralComponent implements OnInit {

  perfilUser: string = '/pages/perfil/general/user-perfil';
  credencialesUser: string = '/pages/perfil/general/user-credenciales';
  historialVentas: string = '/pages/perfil/general/historial-ventas';
  productos: string = '/pages/perfil/general/productos';

  constructor(public accessChecker: NbAccessChecker) { }

  ngOnInit(): void {
  }

}

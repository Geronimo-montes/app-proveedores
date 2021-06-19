import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoService } from '../../../@core/mock/producto.service';
import { ProfileComponent } from '../profile.component';
import { GeneralComponent } from './general.component';
import { HistorialComponent } from './historial/historial.component';
import { PerfilCredencialesComponent } from './perfil-credenciales/perfil-credenciales.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: 'user-perfil',
        component: PerfilUserComponent,
      }, {
        path: 'user-credenciales',
        component: PerfilCredencialesComponent,
      }, {
        path: 'historial-ventas',
        component: HistorialComponent,
      }, {
        path: 'productos',
        component: ProductoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {
}

import { NgModule } from '@angular/core';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbButtonGroupModule,
    HomeRoutingModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent,
    ProductosComponent,
    ProductoDetalleComponent,
  ],
})
export class HomeModule { }

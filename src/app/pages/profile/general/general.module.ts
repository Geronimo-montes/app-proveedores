import { NgModule } from '@angular/core';
import { GeneralRoutingModule } from './general-routing.module';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { PerfilCredencialesComponent } from './perfil-credenciales/perfil-credenciales.component';
import { HistorialComponent } from './historial/historial.component';
import { ProductoComponent } from './producto/producto.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    ThemeModule,
    NbButtonGroupModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbPopoverModule,
    NbSelectModule,
    Ng2SmartTableModule,
    GeneralRoutingModule,
    NgxEchartsModule,
    NbTabsetModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
  declarations: [
    PerfilUserComponent,
    PerfilCredencialesComponent,
    HistorialComponent,
    ProductoComponent,
    EchartsLineComponent,
    EchartsPieComponent,
    EchartsBarComponent,
    EchartsMultipleXaxisComponent,
    EchartsAreaStackComponent,
    EchartsBarAnimationComponent,
    EchartsRadarComponent,
  ],
})
export class GeneralModule { }

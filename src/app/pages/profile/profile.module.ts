import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { GeneralComponent } from './general/general.component';



@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    CommonModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    GeneralComponent,
  ],
})
export class ProfileModule { }

import { CommonModule } from '@angular/common';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ProductoData } from './data/productoModel';
import { ProductoService } from './mock/producto.service';
import { MockDataModule } from './mock/mock-data.module';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';
import { environment } from '../../environments/environment';
import { PublicData } from './data/publicModel';
import { PublicProviderService } from './mock/PublicProvider.service';
import { RolProviderService } from './mock/rolProvider.service';
import { AuthGuard } from './guards/authGuard.guard';

const GUARDS = [
  AuthGuard,
];

const DATA_SERVICES = [
  { provide: ProductoData, useClass: ProductoService },
  { provide: PublicData, useClass: PublicProviderService },
];

const formSetting: any = {
  redirectDelay: 500,
  strategy: 'email',
  remember: true,
  showMessages: {
    success: true,
    error: true,
  },
};

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...GUARDS,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiURL,
        login: {
          endpoint: 'auth/sign-in',
          alwaysFail: false,
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: '/pages/home/productos',
            failure: null,
          },
          defaultErrors: ['La combinación correo electrónico y constraseña no es correcta, inténtelo de nuevo.'],
          defaultMessages: ['Has validado tus credenciasles exitosamente.'],
        },
        register: {
          endpoint: 'auth/sign-up',
          alwaysFail: false,
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: '/pages/home/productos',
            failure: null,
          },
          defaultErrors: ['Algo salió mal. Por favor, vuelva a intentarlo.'],
          defaultMessages: ['Te has registrado exitosamente.'],
        },
        logout: false,
        requestPass: {
          endpoint: 'auth/request-pass',
          alwaysFail: false,
          method: 'post',
        },
        resetPass: {
          endpoint: 'auth/reset-pass',
          alwaysFail: false,
          method: 'post',
        },
        token: {
          class: NbAuthJWTToken,
          key: 'data.token',
        },
      }),
    ],
    forms: {
      login: formSetting,
      register: formSetting,
      requesPassword: formSetting,
      resetPassword: formSetting,
      logout: { redirecDelay: 0 },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      invitado: {
        view: [
          'producto',
          'perfil_proveedor',
        ],
      },
      tienda: {
        parent: 'invitado',
        view: [
          'menu_usuario',
          'perfil_tienda',
        ],
        create: 'pedido',
        edit: [
          'perfil_tienda',
          'pedido',
        ],
        remove: 'pedido',
      },
      proveedor: {
        parent: 'invitado',
        view: [
          'menu_usuario',
          'perfil_proveedor',
        ],
        create: 'producto',
        edit: [
          'perfil_proveedor',
          'producto',
        ],
        remove: 'producto',
      },
      admin: {
        view: '*',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  { provide: NbRoleProvider, useClass: RolProviderService },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}

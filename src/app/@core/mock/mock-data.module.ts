import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from './producto.service';
import { UserProviderService } from './UserProvider.service';
import { HttpClientModule } from '@angular/common/http';
import { PublicProviderService } from './PublicProvider.service';

const SERVICES = [
  ProductoService,
  UserProviderService,
  PublicProviderService,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}

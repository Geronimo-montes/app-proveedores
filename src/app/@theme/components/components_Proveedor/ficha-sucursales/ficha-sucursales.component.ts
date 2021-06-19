import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Isucursal, PublicData } from '../../../../@core/data/publicModel';

@Component({
  selector: 'ngx-ficha-sucursales',
  templateUrl: './ficha-sucursales.component.html',
  styleUrls: ['./ficha-sucursales.component.scss'],
})
export class FichaSucursalesComponent implements OnInit, OnDestroy {

  // controla la suscripciones para cerrarlas cunado el compoenete se destruye
  suscripcion$: Subscription;
  // Parametro de entrada, obligatorio
  @Input() idproveedor: number = null;

  // array para las sucursales
  public sucursales: Array<Isucursal> = [];
  sucursalSelected: number = 0;

  constructor(private publicService: PublicData) { }

  ngOnDestroy(): void {
    this.suscripcion$.unsubscribe();
  }

  ngOnInit(): void {
    // sucursales del proveedor proporcionado
    this.suscripcion$ = this.publicService.getSucursales$(this.idproveedor)
      .subscribe((sucursales) => this.sucursales = sucursales);
  }

  /**
   * Modifica el indice de la sucursal seleccionada un valor atras
   */
  prev() {
    this.sucursalSelected =
      (this.sucursalSelected === 0) ?
        this.sucursales.length - 1 :
        this.sucursalSelected - 1;
  }

  /**
   * Modifica el indice de la sucursal seleccionada un valor adelante
   */
  next() {
    this.sucursalSelected =
      (this.sucursalSelected === this.sucursales.length - 1) ?
        0 :
        this.sucursalSelected + 1;
  }
}

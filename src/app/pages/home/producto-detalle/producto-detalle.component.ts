import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproducto } from '../../../@core/data/productoModel';
import { ProductoService } from '../../../@core/mock/producto.service';

@Component({
  selector: 'ngx-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss'],
})
export class ProductoDetalleComponent implements OnInit, DoCheck {

  producto: Iproducto;
  productosSimilares: Iproducto[] = [];

  constructor(
    private productosService: ProductoService,
    private rutaActiva: ActivatedRoute,
    private productoService: ProductoService,
  ) {
    const id: number = rutaActiva.snapshot.params['id'];
    this.productosService.getProductos().subscribe((productos: Iproducto[]) => {
      this.productosSimilares = productos;
      this.producto = productos.filter(producto => producto.id === id)[0];
    });
  }

  ngOnInit(): void { }

  ngDoCheck(): void {
    const id: number = this.rutaActiva.snapshot.params['id'];
    if (id !== this.producto.id) {
      this.productoService.getProductos().subscribe((productos: Iproducto[]) => {
        this.productosSimilares = productos;
        this.producto = productos.filter(producto => producto.id === id)[0];
        this.setTotal(this.cantidad);
      });
    }
  }

  prev() {
    this.activo = (this.activo === 1) ? 3 : this.activo - 1;
  }

  next() {
    this.activo = (this.activo === 3) ? 1 : this.activo + 1;
  }

  setActivo(id: number) {
    this.activo = id;
  }

  setTotal(cantidad: number) {
    this.cantidad = cantidad;
    const total = this.cantidad * this.producto.precio;
    this.total = formatCurrency(total, 'en-US', getCurrencySymbol('USD', 'wide'));
  }

  activo = 1;
  total = '0';
  cantidad = 0;
}

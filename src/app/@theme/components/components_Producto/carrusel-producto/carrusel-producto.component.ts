import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproducto } from '../../../../@core/data/productoModel';

@Component({
  selector: 'ngx-carrusel-producto',
  templateUrl: './carrusel-producto.component.html',
  styleUrls: ['./carrusel-producto.component.scss'],
})
export class CarruselProductoComponent implements OnInit {

  @Input() productos: Iproducto[] = [];
  @Input() title: string;
  inicio: number = 0;
  cantidadProd = 5;

  load: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.load = false;
    }, 3000);
  }

  verProducto(idProducto: number) {
    // console.log(idProducto);
    this.router.navigate(['/pages/home/producto', idProducto]);
  }

  get _productos(): Iproducto[] {
    return this.productos.slice(this.inicio, this.inicio + this.cantidadProd);
  }

  productoSiguiente() {
    if (this.inicio + this.cantidadProd === this.productos.length) {
      this.inicio = 0;
    } else {
      this.inicio++;
    }
  }

  productoAnterior() {
    if (this.inicio === 0) {
      this.inicio = this.productos.length - this.cantidadProd;
    } else {
      this.inicio--;
    }
  }
}

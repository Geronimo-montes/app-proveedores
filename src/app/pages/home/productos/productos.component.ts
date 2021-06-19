import { Component, OnInit } from '@angular/core';
import { Iproducto } from '../../../@core/data/productoModel';
import { ProductoService } from '../../../@core/mock/producto.service';

@Component({
  selector: 'ngx-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  active = 1;
  productos: Iproducto[] = [];

  constructor(
    private productosService: ProductoService,
  ) {
    this.productosService.getProductos().subscribe((productos: Iproducto[]) => {
      this.productos = productos;
    });
  }

  ngOnInit(): void {
  }

  previus() {
    if (this.active > 1)
      this.active--;
    else if (this.active === 1)
      this.active = 3;
  }

  next() {
    if (this.active < 3)
      this.active++;
    else if (this.active === 3)
      this.active = 1;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-carrusel-imagen',
  templateUrl: './carrusel-imagen.component.html',
  styleUrls: ['./carrusel-imagen.component.scss'],
})
export class CarruselImagenComponent implements OnInit {

  @Input() imagenes: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  prev() {
    this.activo = (this.activo === 0) ? this.imagenes.length - 1 : this.activo - 1;
  }

  next() {
    this.activo = (this.activo === this.imagenes.length - 1) ? 0 : this.activo + 1;
  }

  setActivo(id: number) {
    this.activo = id;
  }

  activo = 0;

}

import { Observable } from 'rxjs';
import { Ecalificacion } from './publicModel';

export interface Iproducto {
  proveedor: string; // objeto
  id: number;
  nombre: string;
  descripcionCorta: string;
  descripcionExtensa: string;
  precio: number;
  descuento: number;
  stock: number;
  urlImagenes: string[];
  formatoVenta: EformatoVenta;
  unidadesPorPaquete: number;
  calificacion: number;
  subCategoria: string;
  numeroCompras: number;
}

export enum EformatoVenta {
  kg = 'kg',
  Caja = 'Caja',
  docepack = 'docepack',
  docena = 'docena',
}

export abstract class ProductoData {
  abstract getProductos(): Observable<Iproducto[]>;
}

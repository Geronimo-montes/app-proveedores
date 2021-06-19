import { Observable } from 'rxjs';
import { HeaderOption } from './headerOptions';

export enum Ecalificacion {
  CERO,
  UNO,
  DOS,
  TRES,
  CUATRO,
  CINCO,
}

export enum Erol {
  invitado = 'invitado',
  tienda = 'tienda',
  proveedor = 'proveedor',
  admin = 'admin',
}

export interface Iresponse {
  data: any;
  response: boolean;
  message: string;
}

export interface Isucursal {
  nombre: string;
  ruta_imagen: string;
  direccion: string;
  ubicacion: string;
  telefono: string;
}

export abstract class PublicData extends HeaderOption {
  abstract getSucursales$(idproveedor: number): Observable<Isucursal[]>;
}

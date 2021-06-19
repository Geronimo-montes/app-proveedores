import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs';
import { Ecalificacion, Erol } from './publicModel';
import { HeaderOption } from './headerOptions';

export interface IuserTienda {
  idtienda: number;
  idusuario: number;
  nombre: string;
  ruta_imagen: string;
  descripcion_tienda: string;
  nombre_encargado: string;
  direccion: string;
  ubicacion: string;
  telefono: string;
  whatsapp: string;
  facebook: string;
  email: string;
  rol: Erol;
}

export interface IuserProveedor {
  idproveedor: number;
  idusuario: number;
  nombre: string;
  ruta_imagen: string;
  descripcion_extensa: string;
  idcategoria: number;
  calificacion: Ecalificacion;
  paginaweb: string;
  telefono: string;
  whatsapp: string;
  facebook: string;
  email: string;
  rol: Erol;
}

export abstract class UserData extends HeaderOption {
  abstract getUser$(): Observable<IuserProveedor | IuserTienda>;
  abstract logOut$(): void;
}

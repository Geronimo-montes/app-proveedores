import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Isucursal, PublicData } from '../data/publicModel';

@Injectable()
export class PublicProviderService extends PublicData {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * @description Lista las sucursales dado un id de un proveedor
   * @param idproveedor
   * @returns
   */
  getSucursales$(idproveedor: number): Observable<Isucursal[]> {
    return this.httpClient.get<Isucursal[]>(
      `${this.baseURL}proveedor/sucursales/${idproveedor}`,
      this.getOptions())
      .pipe(
        map((response) => response['result']),
      );
  }
}

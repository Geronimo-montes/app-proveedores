import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable({
  providedIn: 'root',
})
export class RolProviderService implements NbRoleProvider {

  constructor(private authService: NbAuthService) { }

  /**
   * @name getRole
   * @description Implementacion NbRoleProvide, complemento para gestion de permisos
   * @returns Observable<string> Rol del usuario actual, por defecto invitado
   */
  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload().usuario.rol : 'invitado';
        }),
      );
  }
}

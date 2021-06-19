import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { NbAuthService, NbAuthJWTToken, NbAuthResult } from '@nebular/auth';
import { IuserProveedor, IuserTienda, UserData } from '../data/usersModel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Iresponse } from '../data/publicModel';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProviderService extends UserData {

  constructor(
    private authService: NbAuthService,
    private router: Router,
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  /**
   * @name getUsuer
   * @description Recupera la informacion del usuario logueado
   * @returns IuserProveedor | IuserTienda
   */
  getUser$(): Observable<IuserProveedor | IuserTienda> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload().usuario : null;
        }),
      );
  }

  /**
   * @name logOut$
   * @description Destruye el token de session y elimina la sesion. Redirige al login
   * @return void
   */
  logOut$(): void {
    this.httpClient.delete<Iresponse>(`${this.baseURL}auth/sign-out`, this.getOptions())
      .subscribe((response) => {
        if (response.response)
          this.authService.logout('email').subscribe((res: NbAuthResult) => {
            if (res.isSuccess()) {
              this.router.navigateByUrl('/auth/login');
            }
          });
      });
  }
}

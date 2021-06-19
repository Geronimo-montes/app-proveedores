import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  NbMenuItem,
  NbMenuService,
  NbSearchService,
  NbSidebarService,
} from '@nebular/theme';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';

import { ProductoService } from '../../../@core/mock/producto.service';

import { IuserProveedor, IuserTienda } from '../../../@core/data/usersModel';
import { Iproducto } from '../../../@core/data/productoModel';
import { UserProviderService } from '../../../@core/mock/UserProvider.service';

const userMenuConst: NbMenuItem[] = [
  {
    title: 'Perfil de usuario',
    link: '/pages/perfil/general/user-perfil',
    icon: 'person',

  }, {
    title: 'Cerrar Sesion',
    icon: 'log-out',
  },
];

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private suscripciones$: Array<Subscription> = [];

  linkLogin: string = '/auth/login';

  userMenu: NbMenuItem[] = userMenuConst;
  userPictureOnly: boolean = true;
  user: IuserProveedor | IuserTienda = null;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private searchService: NbSearchService,
    private router: Router,
    private productoService: ProductoService,
    private userProvideService: UserProviderService,
  ) {
  }

  ngOnInit() {
    // datos del usuario logueado
    const sub1$ = this.userProvideService.getUser$()
      .subscribe((user) => this.user = user);
    // Suscripcion al obserble de busqueda
    const sub2$ = this.searchService.onSearchSubmit()
      .subscribe(serach => this.search(serach.term));
    // evento clic para el menu contextual
    const sub3$ = this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'userMenu'),
      map(({ item: { title } }) => title),
    ).subscribe((title) => (title === 'Cerrar Sesion') ? this.logOut() : null);

    this.suscripciones$.push(sub1$, sub2$, sub3$);
  }

  ngOnDestroy() {
    this.suscripciones$.forEach(suscripcion => suscripcion.unsubscribe());
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logOut() {
    this.userProvideService.logOut$();
  }

  /**
   * @description Reimplementar para mostarr la lista de ocurrencias. Actualmente redirije a la primera ocurrencia.
   * @param termino
   */
  search(termino: string) {
    // console.log('desde func search:', termino);
    this.productoService.getProductos().subscribe((productos: Iproducto[]) => {
      let id = 0;
      productos.every((prod: Iproducto) => {
        if (prod.nombre.toLocaleLowerCase().indexOf(termino.toLocaleLowerCase()) > -1) {
          id = prod.id;
          return false;
        } else {
          return true;
        }
      });

      if (id !== 0) this.router.navigate(['/pages/home/producto/', id]);
      else this.router.navigate(['/pages/home/productos']);
    });
  }
}

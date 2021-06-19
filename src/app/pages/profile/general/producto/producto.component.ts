import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AltaProductoComponent } from '../../../../@theme/components/components_Producto/alta-producto/alta-producto.component';
import { settings } from './producto.settings';

@Component({
  selector: 'ngx-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  private suscripciones: Array<Subscription> = [];
  configuraciones = settings;

  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void { }

  public registrarProducto() {
    this.dialogService.open(AltaProductoComponent, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    }).onClose.subscribe(() => { });
  }
}

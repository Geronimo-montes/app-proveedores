import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Control } from 'leaflet';
import { Subscription } from 'rxjs';
import { UserProviderService } from '../../../../@core/mock/UserProvider.service';

@Component({
  selector: 'ngx-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss'],
})
export class AltaProductoComponent implements OnInit, OnDestroy {

  @Input() idproveedor: number;
  private suscripciones: Array<Subscription> = [];

  // Ajustes para el dropzone
  public files: File[] = [];
  public maxFileSize: number = 3000000;
  public extensiones: string = 'image/png';
  public maxImagenes: number = 4;

  // Formulario reactivo
  public formProducto: FormGroup;
  public error: string = '';
  public countDesCorta: number = 0;
  public countDesExtensa: number = 0;
  public minLength: number = 5;
  public valid: string = 'primary';
  public invalid: string = 'danger';

  // porcentajes
  public porcentajes: Array<string> =
    ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

  constructor(
    protected ref: NbDialogRef<AltaProductoComponent>,
    private userService: UserProviderService,
    private fb: FormBuilder,
  ) { }

  ngOnDestroy(): void {
    this.suscripciones.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.initFormProducto();
  }

  close() {
    alert();
    this.ref.close(false);
  }

  initFormProducto() {
    this.formProducto = this.fb.group({
      nombre_producto: new FormControl('',
        [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.maxLength(300),

        ]),
      descripcion_corta: new FormControl('',
        [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.maxLength(100),

        ]),
      descripcion_extensa: new FormControl('',
        [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.maxLength(600),

        ]),
      idsubcategoria: new FormControl('', [Validators.required]),
      stock: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+([\,\.][0-9]+)?$/),
        ]),
      idformatoventa: new FormControl('', [Validators.required]),
      unidad_por_paquete: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]),
      precio: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+([\,\.][0-9]+)?$/),
        ]),
      descuento_porcentaje: new FormControl(0, [Validators.required]),
    });
  }

  /**
 * @description Obtiene el mensaje de error con respecto a la validacion violada
 * @param controlName
 * @returns
 */
  public getError(controlName: string): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    this.formProducto.get(controlName).markAsDirty();
    this.formProducto.get(controlName).markAsTouched();

    const control = this.formProducto.get(controlName);

    if (control.touched && control.errors != null)
      return (control.errors.required)
        ? `Campo obligatorio.` :
        (control.errors.pattern)
          ? `Solo se pueden introducir numeros.` :
          (control.errors.minlength)
            ? `La lonjitud mínima para el campo es ${control.errors.minlength.requiredLength}.` :
            (control.errors.maxlength)
              ? `La lonjitud máxima para el campo es ${control.errors.maxlength.requiredLength}.` : '';
    return '';
  }

  /**
   * @description Evento que se genera al dar click en el dropzone. Se selecciona y agrega un elemnto al array
   * @param event
   */
  onSelect(event) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }

  /**
   * Elimina el archivo seleccionado, del dropzone
   * @param event
   */
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  guardarImagene() {
    const data = new FormData();
    this.files.forEach((img, index) =>
      data.append('Archivo#' + index.toString(), img, img.name));
  }

  public registarProducto() {
    const form = this.formProducto;
    const data = new FormData();
    data.append('idproveedor', this.idproveedor.toString());
    data.append('nombre_producto', form.get('nombre_producto').value);
    data.append('descripcion_corta', form.get('descripcion_corta').value);
    data.append('descripcion_extensa', form.get('descripcion_extensa').value);
    data.append('idsubcategoria', form.get('idsubcategoria').value);
    data.append('stock', form.get('stock').value);
    data.append('idformatoventa', form.get('idformatoventa').value);
    data.append('unidad_por_paquete', form.get('unidad_por_paquete').value);
    data.append('precio', form.get('precio').value);
    data.append('descuento_porcentaje', form.get('descuento_porcentaje').value);
  }
}

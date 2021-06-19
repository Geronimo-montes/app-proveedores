import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NbPopoverDirective } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { IuserProveedor } from '../../../../@core/data/usersModel';
import { UserProviderService } from '../../../../@core/mock/UserProvider.service';

@Component({
  selector: 'ngx-perfil-credenciales',
  templateUrl: './perfil-credenciales.component.html',
  styleUrls: ['./perfil-credenciales.component.scss'],
})
export class PerfilCredencialesComponent implements OnInit, OnDestroy {

  private subscripciones: Array<Subscription> = [];
  public user: IuserProveedor;

  //  formulario para los daots gneerales
  public formGeneral: FormGroup;
  public formCredenciales: FormGroup;
  public error: string = '';
  public valid: string = 'primary';
  public invalid: string = 'danger';

  countLetras: number = 0;
  minlegth: number = 5;

  constructor(
    private userService: UserProviderService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnDestroy(): void {
    this.subscripciones.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    // datos del usuario logueado
    const sub1$ = this.userService.getUser$()
      .subscribe((user: IuserProveedor) => this.user = user);
    // se construyen los formularios
    this.initFormCredenciales();
    this.initFormDatosGenerales();
    this.countLetras = this.user.descripcion_extensa.length;
    this.subscripciones.push(sub1$);
  }

  /**
   * @description Construye el formulario de los datos generales
   */
  public initFormDatosGenerales() {
    this.formGeneral = this.formBuilder.group({
      nombre_comercial: new FormControl(this.user.nombre,
        [
          Validators.required,
          Validators.minLength(this.minlegth),
          Validators.maxLength(100),
        ]),
      descripcion_extensa: new FormControl(this.user.descripcion_extensa,
        [
          Validators.required,
          Validators.minLength(this.minlegth),
          Validators.maxLength(600),
        ]),
      paginaweb: new FormControl(this.user.paginaweb,
        [
          Validators.required,
          Validators.minLength(this.minlegth),
          Validators.maxLength(500),
        ]),
      telefono: new FormControl(this.user.telefono,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^(?=.*\d).{10,10}$/),
        ]),
      whatsapp: new FormControl(this.user.whatsapp,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^(?=.*\d).{10,10}$/),
        ]),
      facebook: new FormControl(this.user.facebook,
        [
          Validators.required,
          Validators.minLength(this.minlegth),
          Validators.maxLength(50),
        ]),
    });
  }

  /**
   * @description Construye el formulario de credenciales de usuario
   */
  public initFormCredenciales() {
    this.formCredenciales = this.formBuilder.group({
      email: new FormControl(this.user.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(this.minlegth),
          Validators.maxLength(60),
        ]),
      password: new FormControl('',
        [
          Validators.required,
          //  8 letras, con al menos un símbolo, letras mayúsculas y minúsculas y un número
          Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
        ]),
      password_confirmacion: new FormControl(''),
    }, { validators: this.passwordConfirmacion });
  }

  /**
   * @description Muestra la longitud del texto de la descripcion
   */
  public calcularLetrasFalntates() {
    const valor: string = this.formGeneral.get('descripcion_extensa').value;
    this.countLetras = valor.length;
  }

  public passwordConfirmacion(control: FormGroup): ValidationErrors | null {
    return (control.get('password').value === control.get('password_confirmacion').value) ?
      null :
      { noSonIguales: true };
  }

  /**
   * @description Obtiene el mensaje de error con respecto a la validacion violada
   * @param controlName
   * @returns
   */
  public getError(controlName: string, form: FormGroup): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    form.get(controlName).markAsDirty();
    form.get(controlName).markAsTouched();

    const control = form.get(controlName);
    if (control.touched && control.errors != null)
      return (control.errors.required)
        ? `Campo obligatorio.` :
        (control.errors.pattern && controlName === 'password')
          ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.` :
          (control.errors.pattern &&
            (controlName === 'telefono' || controlName === 'whatsapp'))
            ? `Solo se permite introducir numeros.` :
            (control.errors.email)
              ? `EL formato no corresponde a un correo válido.` :
              (control.errors.minlength)
                ? `La lonjitud mínima para el campo es ${control.errors.minlength.requiredLength}.` :
                (control.errors.maxlength)
                  ? `La lonjitud máxima para el campo es ${control.errors.maxlength.requiredLength}.` : '';
    return '';
  }

  /**
   * @description El validador personalizado esta a nivel formulario por lo tanto tenemos que consultarlo por separado
   * @returns string
   */
  public validarConfirmacionPass(): string {
    if (this.formCredenciales.hasError('noSonIguales') &&
      this.formCredenciales.get('password').dirty
      && this.formCredenciales.get('password_confirmacion').dirty)
      return `Las contraseñas no cohinciden.`;
    else
      return '';
  }

  /**
   * @description Envio del formulario
   */
  public updateCredenciales() {
    const form = this.formCredenciales;
    // FormData es la manera mas facil de generar lo datos para las peticiones para la api
    const data = new FormData();
    data.append('email', form.get('email').value);
    data.append('password', form.get('password').value);
    data.append('password_confirmacion', form.get('password_confirmacion').value);
  }

  /**
   * @description Prepara los datos y realiza la solicitud
   */
  public updateDatosGenerales() {
    const form = this.formGeneral;

    const data = new FormData();

    data.append('nombre_comercial', form.get('nombre_comercial').value);
    data.append('ruta_imagen', this.user.ruta_imagen);
    data.append('descripcion_extensa', form.get('descripcion_extensa').value);
    data.append('idcategoria', this.user.idcategoria.toString());
    data.append('calificacion', this.user.calificacion.toString());
    data.append('paginaweb', form.get('paginaweb').value);
    data.append('telefono', form.get('telefono').value);
    data.append('whatsapp', form.get('whatsapp').value);
    data.append('facebook', form.get('facebook').value);
    data.append('idproveedor', this.user.idproveedor.toString());
  }

  /**
   * @description Despues de seleccionar la imagen se realiza inmediatamento la peticion de actualizacion de la imagen
   * @param fileInput
   * @returns
   */
  public fileEvnet(fileInput: Event) {
    // recatamos el archivo
    const file = (<HTMLInputElement>fileInput.target).files[0];
    // validamos que se trate de una imagen
    if (!(file.type === 'image/png' || file.type === 'image/jpeg')) return;
    // creamos el fomrdata
    const data = new FormData();
    data.append('imagen', file, file.name);
  }
}

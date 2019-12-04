import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
})
export class LoginPage implements OnInit {

  ingresar = true;
  returnUrl: string;
  login: any = {};
  new: any = {};
  validEmail = false;
  validPass = false;
  validNombre = false;
  validApellido = false;

  constructor(
    private authService: AuthenticationService,
    public alertController: AlertController,
    public router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  toggle() {
    this.new = {};
    this.login = {};
    this.ingresar = !this.ingresar;
  }

  iniciarSesion(f: NgForm) {
    this.authService.iniciarSesion({ username: this.login.usuario, password: this.login.pass })
      .subscribe(usuario => {
        this.login = {};
        f.resetForm();

        if (usuario.token) {
          this.router.navigate([this.returnUrl]);
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          localStorage.setItem('jwt', usuario.token);
          this.router.navigate(['/cuenta']);
        }
      });
  }

  registrar(f: NgForm) {
    this.authService.registrar({
      nombre: this.new.nombre.trim(),
      apellido: this.new.apellido.trim(),
      email: this.new.email.toLowerCase(),
      password: this.new.pass
    })
      .subscribe(response => {
        if (response !== undefined && response.success) {
          this.alertaUsuarioCreado();
          this.toggle();
          this.new = {};
          f.resetForm();
        }
      });
  }

  async alertaUsuarioCreado() {
    const alert = await this.alertController.create({
      header: 'Usuario creado!',
      message: 'Revise su email para obtener el nombre de usuario.',
      buttons: ['OK'],
      cssClass: 'alertSuccess'
    });

    await alert.present();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
  }

  validatePass(pass) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.validPass = re.test(String(pass));
  }

  validateOnlyLetters(modo) {
    const re = /^[a-zA-Z \u00C0-\u00FF]*$/;
    if (modo === 'nombre') {
      if (this.new.nombre === '') {
        this.validNombre = false;
      } else {
        this.validNombre = re.test(this.new.nombre);
      }
    } else if (this.new.apellido === '') {
      this.validApellido = false;
    } else {
      this.validApellido = re.test(this.new.apellido);
    }
  }
}

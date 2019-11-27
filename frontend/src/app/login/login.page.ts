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
          this.router.navigate(['/cuenta']);
        }
      });
  }

  registrar(f: NgForm) {
    this.authService.registrar({ nombre: this.new.nombre, apellido: this.new.apellido, email: this.new.email, password: this.new.pass })
      .subscribe(response => {
        this.toggle();
        this.new = {};
        f.resetForm();
        if (response !== undefined && response.success) {
          this.alertaUsuarioCreado();
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
}

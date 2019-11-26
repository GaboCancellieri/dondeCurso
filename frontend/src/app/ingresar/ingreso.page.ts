import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngresoService } from './ingreso.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: 'ingreso.page.html',
})
export class IngresoPage {

  ingresar = true;
  login: any = {};
  new: any = {};
  validEmail = false;
  validPass = false;

  constructor(
    private ingresoService: IngresoService
  ) {}

  toggle() {
    this.ingresar = !this.ingresar;
  }

  iniciarSesion(f: NgForm) {
    this.ingresoService.iniciarSesion(this.login.usuario, this.login.pass)
  /*  .then(inicio => {

    });
    */
  }

  validateEmail(email) {
    console.log(email)
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
  }

  validatePass(pass) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.validPass = re.test(String(pass));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { UnidadAcademica } from 'src/app/types/unidadAcademica';
import { DataService } from 'src/app/shared/data.service';
import { Carrera } from 'src/app/types/carrera';
import { Materia } from 'src/app/types/materias';
import { Modulo } from 'src/app/types/modulo';
import { UsuarioService } from 'src/app/usuarios/usuario.service';

@Component({
    selector: 'modal-agregar-clase',
    templateUrl: 'agregar-clase.page.html',
})
export class ModalAgregarClasePage implements OnInit {

    unidadesAcademicas: UnidadAcademica[];
    carreras: Carrera[];
    selectedCarrera: Carrera;
    materias: Materia[];
    modulos: Modulo[];
    selectedModulo: Modulo;
    mostrarAnio = false;
    constructor(
        private modalController: ModalController,
        private dataService: DataService,
        private usuarioService: UsuarioService,
        public alertController: AlertController,
    ) {

    }

    ngOnInit() {
        this.getUnidadesAcademicas();
    }

    getUnidadesAcademicas() {
        this.dataService.getUnidadesAcademicas()
            .subscribe(unidadesAcademicas => {
                this.unidadesAcademicas = unidadesAcademicas;
            });
    }

    getCarreras(unidadAcademica) {
        this.dataService.getCarreras({ params: unidadAcademica })
            .subscribe(carreras => {
                this.carreras = carreras;
            });
    }

    setCarrera(carrera) {
        this.selectedCarrera = carrera;
        this.mostrarAnio = true;
    }

    getMaterias(anio) {
        this.dataService.getMaterias({ params: { carrera: this.selectedCarrera._id, anio } })
            .subscribe(materias => {
                this.materias = materias;
            });
    }

    getModulos(materia) {
        const usuario = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.dataService.getModulos({ params: { materia: materia._id, usuario } })
            .subscribe(modulos => {
                this.modulos = modulos;
            });
    }

    setModulo(modulo) {
        this.selectedModulo = modulo;
    }

    guardarModulo() {
        const usuario = JSON.parse(localStorage.getItem('currentUser'))._id;
        this.usuarioService.saveModulo({ usuario, modulo: this.selectedModulo._id })
            .subscribe(res => {
                if (res.exito) {
                    this.alertaUsuarioCreado();
                    this.dismissModal();
                }
            });
    }

    async alertaUsuarioCreado() {
        const alert = await this.alertController.create({
            header: 'Clases agregadas!',
            message: 'Todas las clases del módulo están en tu calendario.',
            buttons: ['OK'],
            cssClass: 'alertSuccess'
        });

        await alert.present();
    }

    dismissModal() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            dismissed: true
        });
    }

}

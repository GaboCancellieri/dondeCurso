import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/shared/data.service';
import { SitioService } from 'src/app/sitios/sitios.service';
import { UnidadAcademica } from 'src/app/types/unidadAcademica';
import { Sitio } from 'src/app/sitios/sitio';

@Component({
    selector: 'app-buscar-mapa',
    templateUrl: 'buscar-mapa.page.html',
})
export class BuscarMapaPage implements OnInit {
    unidadesAcademicas: UnidadAcademica[];
    selectedUnidadAcademica: UnidadAcademica;
    sitios: Sitio[] = [];
    nombreSitio: string;
    constructor(
        private modalController: ModalController,
        private dataService: DataService,
        private sitioService: SitioService,
    ) { }

    ngOnInit() {
        this.getUnidadesAcademicas();
    }

    getUnidadesAcademicas() {
        this.dataService.getUnidadesAcademicas()
            .subscribe(unidadesAcademicas => {
                this.unidadesAcademicas = unidadesAcademicas;
            });
    }

    getSitiosUnidadAcademica(unidadAcademica) {
        this.nombreSitio = null;
        this.sitios = [];
        this.selectedUnidadAcademica = unidadAcademica;
        if (this.selectedUnidadAcademica) {
            this.sitioService.getSitiosUnidadAcademica({ unidadAcademica: unidadAcademica._id })
                .subscribe(sitios => {
                    this.sitios = sitios.obj;
                });
        }
    }

    getSitio() {
        if (this.nombreSitio) {
            if (!this.selectedUnidadAcademica) {
                this.sitioService.getSitios({ nombre: this.nombreSitio })
                    .subscribe(sitios => {
                        if (sitios.obj.length > 0) {
                            this.sitios = sitios.obj;
                        }
                    });
            } else {
                this.sitios = this.sitios.filter(sit => sit.nombre.toLowerCase().includes(this.nombreSitio.toLowerCase()));
            }
        }
    }

    cancel() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            dismissed: true,
        });
    }

    confirm() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            dismissed: true,
            result: this.sitios
        });
    }
}

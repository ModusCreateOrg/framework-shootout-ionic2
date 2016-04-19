import { Page, Modal, NavController, NavParams, Loading } from 'ionic-angular';
import { NHTSAService } from '../../services/nhtsa.service';
import { TrimView } from '../trim/trim.view';
import { TitleCasePipe } from '../../pipes/titleCase.ts';
import * as template from './model.view.html';

@Page({
    template,
    pipes: [ TitleCasePipe ]
})
export class ModelView {
    private manufacturer;
    private availableVehicles = [];

    constructor(
        private nav: NavController,
        private params: NavParams,
        private nhtsa: NHTSAService
    ) {
        this.manufacturer = this.params.get('manufacturer');
    }

    /**
     * When page loads, get the available Makes for the model
     * year that we passed in the params.
     */
    onPageLoaded(): void {
        const manufacturer = this.params.get('manufacturer');
        this.nhtsa.getMakeDetails(this.manufacturer.ModelYear, this.manufacturer.Make).subscribe(
            (res) => {
                this.availableVehicles = res.Results;
            },
            (error) => {
                console.log(error);
            });
    }

    getVehicleDetails(vehicle) {
        console.log(vehicle);
        this.nav.push(TrimView, { vehicle });
    }


};



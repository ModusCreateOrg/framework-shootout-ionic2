import { Page, Modal, NavController, NavParams, Loading } from 'ionic-angular';
import { NHTSAService } from '../../services/nhtsa.service';
import { ModelView } from '../model/model.view';
import * as template from './make.view.html';

@Page({
    template
})
export class MakeView {
    private availableManufacturers = [];

    constructor(
        private nav: NavController,
        private params: NavParams,
        private nhtsa: NHTSAService
    ) {}

    /**
     * When page loads, get the available Makes for the model
     * year that we passed in the params.
     */
    onPageLoaded(): void {
        const year = this.params.get('year').ModelYear;
        this.nhtsa.getModelYearDetails(year).subscribe(
            (res) => {
                this.availableManufacturers = res.Results;
            },
            (error) => {
                console.log(error);
            });
    }

    goToManufacturer(manufacturer) {
        console.log(manufacturer);
        this.nav.push(ModelView, { manufacturer });
    }

};



import { Page, Modal, NavController, NavParams, Loading } from 'ionic-angular';
import { NHTSAService } from '../../services/nhtsa.service';
import { VehicleDetail } from '../vehicle/vehicle.view';
import * as template from './trim.view.html';

@Page({
    template
})
export class TrimView {
    private vehicle;
    private availableVehicles = [];

    constructor(
        private nav: NavController,
        private params: NavParams,
        private nhtsa: NHTSAService
    ) {
        this.vehicle = this.params.get('vehicle');
    }

    /**
     * When page loads, get the available Makes for the model
     * year that we passed in the params.
     */
    onPageLoaded(): void {
        const { ModelYear, Make, Model } = this.params.get('vehicle');
        console.log(ModelYear, Make, Model);
        this.nhtsa.getModelDetails(ModelYear, Make, Model).subscribe(
            (res) => {
                this.availableVehicles = res.Results;
            },
            (error) => {
                console.log(error);
            });
    }

    getVehicleDetails(vehicle) {
        this.nav.push(VehicleDetail, { vehicleId: vehicle.VehicleId });
        console.log(vehicle);
    }


};



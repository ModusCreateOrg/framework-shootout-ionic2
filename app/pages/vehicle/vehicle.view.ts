import { Page, Modal, NavController, NavParams, Loading } from 'ionic-angular';
import { NHTSAService } from '../../services/nhtsa.service';
import { StarsDisplay } from '../../components/stars/stars';
import * as template from './vehicle.view.html';

@Page({
    directives: [ StarsDisplay ],
    template
})
export class VehicleDetail {
    private vehicleId;
    private selectedVehicle;
    private loadingVehicle = true;

    constructor(
        private nav: NavController,
        private params: NavParams,
        private nhtsa: NHTSAService
    ) {
        this.vehicleId = this.params.get('vehicleId');
    }

    /**
     * When page loads, get the available Makes for the model
     * year that we passed in the params.
     */
    onPageLoaded(): void {
        this.nhtsa.getVehicleDetails(this.vehicleId).subscribe(
            (res) => {
                this.selectedVehicle = res.Results[0];
                console.log(this.selectedVehicle);
            },
            (error) => {
                console.log(error);
            });
    }


};



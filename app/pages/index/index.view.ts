import { Page, Modal, NavController, Loading } from 'ionic-angular';
import { NHTSAService } from '../../services/nhtsa.service';
import { MakeView } from '../make/make.view';
import * as template from './index.view.html';

@Page({
    template
})
export class IndexView {
    private modelYears = [];

    constructor(
        private nav: NavController,
        private nhtsa: NHTSAService
    ) { }

    /**
     * When page loads, get the Model Year information
     */
    onPageLoaded() {
        this.nhtsa.getSafetyRatings().subscribe(
            (results) => {
                this.modelYears = results.Results;
            },
            (error) => {
                console.log(error);
            });
    }

    goToModelYear(year) {
        this.nav.push(MakeView, { year });
    }

};



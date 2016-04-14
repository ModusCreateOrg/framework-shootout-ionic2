import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

const API_URL = (path = '') => `http://www.nhtsa.gov/webapi/api/SafetyRatings/${path}?format=json`;

@Injectable()
export class NHTSAService {

    constructor(private http: Http) { }

    getSafetyRatings() {
        let url = API_URL();
        return this.http
            .get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getModelYearDetails(modelYear) {
        let url = API_URL(`modelyear/${modelYear}`);
        return this.http
            .get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getMakeDetails(modelYear, make) {
        let url = API_URL(`modelyear/${modelYear}/make/${make}`);
        return this.http
            .get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getModelDetails(modelYear, make, model) {
        let url = API_URL(`modelyear/${modelYear}/make/${make}/model/${model}`);
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getVehicleDetails(vehicleId) {
        let url = API_URL(`VehicleId/${vehicleId}`);
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        console.error('private handleError', error);
        if (error.json()) {
            return Observable.throw(error.json().error || 'Server error');
        }

    }
}

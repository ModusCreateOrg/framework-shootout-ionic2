import { Component, Input } from 'angular2/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';

@Component({
    selector: 'stars',
    directives: [IONIC_DIRECTIVES],
    template: `
        <ion-icon tertiary name="star" *ngFor="#times of repeatTimes"></ion-icon>
        <small *ngIf="repeatTimes.length === 0">Not Rated</small>
    `
})
export class StarsDisplay {
    @Input() numberOfStars;
    private repeatTimes;

    ngOnInit() {
        const parsedNumber = parseInt(this.numberOfStars, 10) || 0;
        if (parsedNumber > 0) {
            this.repeatTimes = Array(parseInt(this.numberOfStars, 10)).fill().map((x, i) => i);
        }
        else {
            this.repeatTimes = [];
        }

    }
}

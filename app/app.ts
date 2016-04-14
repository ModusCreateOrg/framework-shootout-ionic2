import { App, Platform, Modal, NavController, Loading } from 'ionic-angular';
import { IndexView } from './pages/index/index.view';
import { NHTSAService } from './services/nhtsa.service';

@App({
    template: `<ion-nav id="nav" [root]="indexView"></ion-nav>`,
    providers: [
        NHTSAService
    ]
})

export class NCAP {
    private indexView = IndexView;

    constructor(
        private platform: Platform,
    ) {
        this.platform = platform;
        this.platform.ready().then(() => {
            console.info('platform ready');
        });
    }
}

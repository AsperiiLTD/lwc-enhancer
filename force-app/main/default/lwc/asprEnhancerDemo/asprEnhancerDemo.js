import { LightningElement } from 'lwc';
import momentScript from '@salesforce/resourceUrl/moment';

import { enhance, enhancers } from 'c/asprEnhancer';
const { withDependencies } = enhancers;

class AsprEnhancerDemo extends LightningElement {
    timeFormats = [
        'DD/M/YY H:mm:ss',
        'dddd, MMMM Do YYYY, h:mmA',
        'ddd, hA'
    ]

    selectedFormat = 'DD/M/YY H:mm:ss';
    currentTime = null;

    getCurrentTime() {
        this.currentTime = window.moment();
    }

    get currentTimeDisplay() {
        return this.currentTime ? "Currnet time is: " + this.currentTime.format(this.selectedFormat) : "";
    }

    get timeFormatsButtons() {
        return this.timeFormats.map(format => ({
            format,
            onClick: () => this.selectedFormat = format,
            variant: format === this.selectedFormat ? "brand" : "brand-outline"
        }))
    }

    connectedCallback() {
        this.isLoadingPromise.then(() => {
            this.interval = setInterval(this.getCurrentTime.bind(this), 1000);
        })
    }

    disconnectedCallback() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

export default enhance(AsprEnhancerDemo, [ withDependencies([ momentScript ]) ]);
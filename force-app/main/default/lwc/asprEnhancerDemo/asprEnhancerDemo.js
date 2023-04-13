import { LightningElement } from 'lwc';
import { enhance, withDependencies } from 'c/asprEnhancer';
import momentScript from '@salesforce/resourceUrl/moment';

const peopleData = {
    1: {
        id: 1,
        name: "Francois",
        birthDate: "1980-04-05"
    },
    2: {
        id: 2,
        name: "Jean Claude",
        birthDate: "1995-02-18"
    },
    3: {
        id: 3,
        name: "Marie",
        birthDate: "1991-10-23"
    },
    4: {
        id: 4,
        name: "Cecile",
        birthDate: "1991-01-04"
    },
    5: {
        id: 5,
        name: "Barbara",
        birthDate: "1998-08-30"
    },
}

class AsprEnhancerDemo extends LightningElement {
    data = peopleData;

    get options() {
        return Object.keys(this.data).map(personId => ({ 
            value: personId, 
            label: this.data[personId].name 
        }))
    }

    get peopleToShow() {
        // The boolean property is from the withDependencies enhancer
        if (this.isLoading) {
            return [];
        }

        const { moment } = window;
        return Object.values(this.data)
            .map(person => ({
                ...person,
                birthDate: moment(person.birthDate).format("ddd, MMM DD yyyy")
            }))
    }

    connectedCallback() {
        // The promise property is from the withDependencies enhancer
        this.isLoadingPromise.then(() => {
            console.log("LOADED MOMENT INSTANCE SUCCESSFULLY: ", window.moment);
        })
    }
}

// Enhancing our component with the withDependencies enhancer, supplying the moment static resource
export default enhance(AsprEnhancerDemo, [
    withDependencies([ momentScript ])
]);







import { LightningElement } from 'lwc';
import { enhance, withOnSetValue, withDependencies } from 'c/asprEnhancer';
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
    
    // This property is controlled with the withOnSetValue enhancer
    nameSearch;
    dateSearch;

    get options() {
        return Object.keys(this.data).map(personId => ({ 
            value: personId, 
            label: this.data[personId].name 
        }))
    }

    filterByDate(person) {
        return this.dateSearch ? window.moment(person.birthDate).isBefore(this.dateSearch) : true
    }

    filterByName(person) {
        return this.nameSearch ? person.name.toLowerCase().includes(this.nameSearch.toLowerCase()) : true;
    }

    get peopleToShow() {
        // This property is from the withDependencies enhancer
        if (this.isLoading) {
            return [];
        }

        const { moment } = window;
        return Object.values(this.data)
            .filter(person => {
                return this.filterByDate(person) && this.filterByName(person);
            })
            .map(person => ({
                ...person,
                birthDate: moment(person.birthDate).format("ddd, MMM DD yyyy")
            }))
    }

    connectedCallback() {
        console.log("MOMENT INSTANCE: ", window.moment);
    }

}

export default enhance(AsprEnhancerDemo, [ 
    withOnSetValue(),
    withDependencies([ momentScript ])
]);
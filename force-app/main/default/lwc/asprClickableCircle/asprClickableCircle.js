import { LightningElement } from 'lwc';

// We import both the enhance utility function and the specific enhancer we want to use
import { enhance, withLogOnClick } from 'c/asprEnhancer';

class AsprClickableCircle extends LightningElement {
    get circleStyle() {
        // We have access to "this.clicked" from the enhancer
        return `
            background-color: ${this.clicked ? "grey" : "red"};
            cursor: ${this.clicked ? "auto" : "pointer"};
            width: 200px;
            height: 200px;
            border: 1px solid black;
            border-radius: 100px;
        `
    }
}

// We apply the enhancer to our component, then export the result
export default enhance(AsprClickableCircle, [ withLogOnClick() ]);






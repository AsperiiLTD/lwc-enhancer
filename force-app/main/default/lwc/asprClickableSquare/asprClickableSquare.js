import { LightningElement } from 'lwc';
import { enhance, withLogOnClick } from '../asprEnhancer/asprEnhancer';

class AsprClickableSquare extends LightningElement {
    get squareStyle() {
        return `
            background-color: ${this.clicked ? "grey" : "blue"};
            cursor: ${this.clicked ? "auto" : "pointer"};
            width: 200px;
            height: 200px;
            border: 1px solid black;
        `
    }
}

export default enhance(AsprClickableSquare, [ withLogOnClick() ]);
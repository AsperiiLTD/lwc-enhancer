export const withOnSetValue = (dataSetAttribute = "property") => {
    return WrappedComponent => {
        return class extends WrappedComponent {
            constructor() {
                super(...arguments);
            }

            onSetValue(e) {
                const property = e.target.dataset[dataSetAttribute];
                this[property] = e.target.value;
            }
        }
    }
}
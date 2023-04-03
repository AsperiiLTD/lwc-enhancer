export const withLogOnClick = () => {
    return WrappedComponent => {
        return class extends WrappedComponent {
            // Calling super() to initialize extended component
            constructor() {
                super(...arguments);
            }

            // Adding the "clicked" property to keep track of whether the component was clicked
            clicked = false;

            // Creating connectedCallback() to add the click event listener to the root element
            connectedCallback() {
                this.template.host.addEventListener("click", () => {
                    if (!this.clicked) {
                        console.log("HELLO WORLD!");
                        this.clicked = true;
                    }
                })
            }
        }
    }
}



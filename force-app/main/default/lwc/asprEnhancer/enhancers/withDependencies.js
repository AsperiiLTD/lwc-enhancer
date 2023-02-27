import { loadScriptWithCache } from "../lib/loadScriptWithCache";
import { loadStyleWithCache } from "../lib/loadStyleWithCache";

export const withDependencies = (dependencies = [], stylesheets = []) => {
    return WrappedComponent => {
        const originalConnectedCallback =  WrappedComponent.prototype.connectedCallback;
        return class extends WrappedComponent {
            isLoading = true;
            isLoadingPromise;

            connectedCallback() {
                this.isLoadingPromise = Promise.all([
                        ...dependencies.map(script => loadScriptWithCache(this, script)), 
                        ...stylesheets.map(stylesheet => loadStyleWithCache(this, stylesheet))
                    ]).then(() => {
                    typeof originalConnectedCallback === "function" && originalConnectedCallback.call(this);
                    this.isLoading = false;
                })
            }
        }
    }
}
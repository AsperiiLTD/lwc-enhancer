export const enhance = (component, enhancers = []) => {
    return enhancers.reduce((enhancedComponent, enhancer) => enhancer(enhancedComponent), component);
}


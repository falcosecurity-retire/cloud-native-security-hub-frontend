import components from './responses/components'

const modifiedComponents = components.map(component => ({ ...component, vendor: { id: component.vendor.toLowerCase(), name: component.vendor } }))

export default modifiedComponents
export const component = modifiedComponents[0]

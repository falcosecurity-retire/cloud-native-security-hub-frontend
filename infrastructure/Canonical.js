export function getCanonicalForVendor (vendor) {
  return `${process.env.BASE_URL}/vendors/${vendor.id}`
}

export function getCanonicalForComponent (component) {
  return `${process.env.BASE_URL}/components/${component.id}`
}

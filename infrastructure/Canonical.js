export function getCanonicalForVendor (vendor) {
  return `${process.env.BASE_URL}/vendors/${vendor.id}`
}

export function getCanonicalForComponent (component) {
  switch (component.kind) {
    case 'OpenPolicyAgentPolicies':
      return `${process.env.BASE_URL}/open-policy-agent-policies/${component.id}`
    default: // FalcoRules
      return `${process.env.BASE_URL}/falco-rules/${component.id}`
  }
}

export function getCanonicalForComponentAndVersion (component) {
  switch (component.kind) {
    case 'OpenPolicyAgentPolicies':
      return `${process.env.BASE_URL}/open-policy-agent-policies/${component.id}/version/${component.version}`
    default: // FalcoRules
      return `${process.env.BASE_URL}/falco-rules/${component.id}/version/${component.version}`
  }
}

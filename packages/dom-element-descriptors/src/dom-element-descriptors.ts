export { IS_DESCRIPTOR } from './types.js';

// types
export type { IDOMElementDescriptor, DescriptorData } from './types.js';

// helper for determining if something is a descriptor
export { isDescriptor } from './is-descriptor.js';

// core registration/lookup methods
export { registerDescriptorData, lookupDescriptorData } from './registry.js';

// helpers for resolving element(s) from descriptor data
export {
  resolveDOMElement,
  resolveDOMElements,
  resolveDescription,
} from './descriptor-access.js';

// helper for creating ad-hod descriptors
export { createDescriptor } from './descriptor-creation.js';

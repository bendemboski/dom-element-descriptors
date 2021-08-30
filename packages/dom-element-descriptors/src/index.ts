// types
export type { IDOMElementDescriptor, DescriptorData } from './types';

// core registration/lookup methods
export {
  registerDescriptorData,
  lookupDescriptorData,
  isDescriptor,
} from './registry';

// helpers for resolving element(s) from descriptor data
export {
  resolveDOMElement,
  resolveDOMElements,
  resolveDescription,
} from './descriptor-access';

// helper for creating ad-hod descriptors
export { createDescriptor } from './descriptor-creation';

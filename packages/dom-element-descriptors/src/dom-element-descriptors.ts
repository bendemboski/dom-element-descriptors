export { IS_DESCRIPTOR } from './types';

// types
export type { IDOMElementDescriptor, DescriptorData } from './types';

// helper for determining if something is a descriptor
export { isDescriptor } from './is-descriptor';

// core registration/lookup methods
export { registerDescriptorData, lookupDescriptorData } from './registry';

// helpers for resolving element(s) from descriptor data
export {
  resolveDOMElement,
  resolveDOMElements,
  resolveDescription,
} from './descriptor-access';

// helper for creating ad-hod descriptors
export { createDescriptor } from './descriptor-creation';

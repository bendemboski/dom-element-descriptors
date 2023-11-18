import type { IDOMElementDescriptor, DescriptorData } from './types';

type Registry = WeakMap<IDOMElementDescriptor, DescriptorData>;

/**
 * Get the registry instance.
 *
 * We store it on the window to ensure that if some dependency/hoisting horkage
 * results in the presence of multiple copies of this library, they are all
 * using the same registry.
 *
 * @returns the registry
 */
function getRegistry(): Registry {
  const win = window as { domElementDescriptorsRegistry?: Registry };

  win.domElementDescriptorsRegistry =
    win.domElementDescriptorsRegistry || new WeakMap();
  return win.domElementDescriptorsRegistry;
}

/**
 * Register or explicitly unregister descriptor data.
 *
 * Note that descriptor data does not need to be unregistered, the
 * un-registration functionality exists for cases when the descriptor is known
 * to no longer be valid.
 *
 * @param descriptor the DOM element descriptor
 * @param data the descriptor's data, or null to un-register
 */
export function registerDescriptorData(
  descriptor: IDOMElementDescriptor,
  data: DescriptorData | null,
): void {
  if (data) {
    getRegistry().set(descriptor, data);
  } else {
    getRegistry().delete(descriptor);
  }
}

/**
 * Look up registered descriptor data
 *
 * @param descriptor the descriptor
 * @returns the descriptor's data, or null if none is set
 */
export function lookupDescriptorData(
  descriptor: IDOMElementDescriptor,
): DescriptorData | null {
  return getRegistry().get(descriptor) || null;
}

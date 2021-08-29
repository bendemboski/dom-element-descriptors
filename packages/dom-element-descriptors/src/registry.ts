import type { IDOMElementDescriptor, DescriptorData } from './types';

const registry: WeakMap<IDOMElementDescriptor, DescriptorData> = new WeakMap();

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
  data: DescriptorData | null
): void {
  if (data) {
    registry.set(descriptor, data);
  } else {
    registry.delete(descriptor);
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
type MaybeDescriptor = object;

export function isDescriptor(
  descriptor: MaybeDescriptor
): descriptor is IDOMElementDescriptor;

/**
 * Look up registered descriptor data
 *
 * @param descriptor the descriptor
 * @returns the descriptor's data, or null if none is set
 */
export function isDescriptor(descriptor: MaybeDescriptor): boolean {
  return registry.has(descriptor);
}

/**
 * Look up registered descriptor data
 *
 * @param descriptor the descriptor
 * @returns the descriptor's data, or null if none is set
 */
export function lookupDescriptorData(
  descriptor: IDOMElementDescriptor
): DescriptorData | null {
  return registry.get(descriptor) || null;
}

import { IS_DESCRIPTOR, type IDOMElementDescriptor } from './types';

/**
 * Determine if the argument is an {@link IDOMElementDescriptor}.
 *
 * This does not check if the argument is registered, just that it's type is
 * {@link IDOMElementDescriptor}.
 */
export function isDescriptor(target: unknown): target is IDOMElementDescriptor {
  return typeof target === 'object' && target && IS_DESCRIPTOR in target;
}

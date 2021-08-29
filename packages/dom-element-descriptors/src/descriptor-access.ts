import { isDescriptor, lookupDescriptorData } from './registry';
import type { DescriptorData, IDOMElementDescriptor } from './types';

/**
 * Given a descriptor or descriptor data, get the single/first element it would
 * match.
 *
 * This is analogous to `querySelector()`, and is meant to be used by DOM helper
 * libraries to resolve the targets of single-element operations.
 *
 * @param target the descriptor or descriptor data
 * @returns the resolved DOM element, or null if no element matched
 */
export function resolveDOMElement(
  target: IDOMElementDescriptor | DescriptorData
): Element | null {
  let data = isDescriptor(target) ? lookupDescriptorData(target) : target;
  if (!data) {
    return null;
  }

  if (data.element !== undefined) {
    return data.element;
  } else {
    for (let element of data.elements || []) {
      return element;
    }
    return null;
  }
}

/**
 * Given a descriptor or descriptor data, get the list of elements it would
 * match.
 *
 * This is analogous to `querySelectorAll()`, and is meant to be used by DOM
 * helper libraries to resolve the targets of multi-element operations.
 *
 * @param target the descriptor or descriptor data
 * @returns the list of resolved DOM elements (possibly empty)
 */
export function resolveDOMElements(
  target: IDOMElementDescriptor | DescriptorData
): Element[] {
  let data = isDescriptor(target) ? lookupDescriptorData(target) : target;
  if (!data) {
    return [];
  }

  if (data.elements) {
    return Array.from(data.elements);
  } else {
    let element = data.element;
    return element ? [element] : [];
  }
}

/**
 * Get the description of the given descriptor or descriptor data, if it has one
 *
 * @param target the descriptor or descriptor data
 * @returns the description or `undefined` if it doesn't have a description
 */
export function resolveDescription(
  target: IDOMElementDescriptor | DescriptorData
): string | undefined {
  let data = isDescriptor(target) ? lookupDescriptorData(target) : target;
  return data?.description;
}

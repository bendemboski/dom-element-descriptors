import { lookupDescriptorData } from './registry';
import { DescriptorData, IDOMElementDescriptor, IS_DESCRIPTOR } from './types';

function isDescriptor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maybeDescriptor: any
): maybeDescriptor is IDOMElementDescriptor {
  try {
    return IS_DESCRIPTOR in maybeDescriptor;
  } catch (e) {
    return false;
  }
}

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
 * Given a descriptor or descriptor data, get the elements it would match.
 *
 * This is analogous to `querySelectorAll()`, and is meant to be used by DOM
 * helper libraries to resolve the targets of multi-element operations.
 *
 * @param target the descriptor or descriptor data
 * @returns the resolved DOM elements (possibly none)
 */
export function resolveDOMElements(
  target: IDOMElementDescriptor | DescriptorData
): Iterable<Element> {
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

/**
 * @jest-environment jsdom
 */

import {
  registerDescriptorData,
  lookupDescriptorData,
  IDOMElementDescriptor,
  resolveDOMElement,
  resolveDOMElements,
} from '..';

class QueryData {
  constructor(private selector: string) {}

  get element(): Element | null {
    return document.querySelector(this.selector);
  }

  get elements(): Element[] {
    return Array.from(document.querySelectorAll(this.selector));
  }
}

class SimplePageObject implements IDOMElementDescriptor {
  constructor(selector: string) {
    registerDescriptorData(this, new QueryData(selector));
  }
}

function exists(descriptor: IDOMElementDescriptor, count?: number): boolean {
  let data = lookupDescriptorData(descriptor);
  if (!data) {
    return false;
  }

  if (count === undefined) {
    return Boolean(resolveDOMElement(data));
  } else {
    return resolveDOMElements(data).length === count;
  }
}

describe('end to end', () => {
  test('it works', () => {
    expect(exists(new SimplePageObject('.foo'))).toEqual(false);
    expect(exists(new SimplePageObject('.foo'), 1)).toEqual(false);

    document.body.innerHTML = '<div class="foo"></div>';
    expect(exists(new SimplePageObject('.foo'))).toEqual(true);
    expect(exists(new SimplePageObject('.foo'), 1)).toEqual(true);

    document.body.innerHTML = '<div class="foo"></div><div class="foo"></div>';
    expect(exists(new SimplePageObject('.foo'))).toEqual(true);
    expect(exists(new SimplePageObject('.foo'), 2)).toEqual(true);

    document.body.innerHTML = '';
    expect(exists(new SimplePageObject('.foo'))).toEqual(false);
    expect(exists(new SimplePageObject('.foo'), 1)).toEqual(false);
  });

  test('it evaluates lazily', () => {
    let pageObject = new SimplePageObject('.foo');

    expect(exists(pageObject)).toEqual(false);
    expect(exists(pageObject, 1)).toEqual(false);

    document.body.innerHTML = '<div class="foo"></div>';
    expect(exists(pageObject)).toEqual(true);
    expect(exists(pageObject, 1)).toEqual(true);

    document.body.innerHTML = '<div class="foo"></div><div class="foo"></div>';
    expect(exists(pageObject)).toEqual(true);
    expect(exists(pageObject, 2)).toEqual(true);
  });
});

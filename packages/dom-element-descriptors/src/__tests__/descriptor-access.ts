import { describe, test, expect } from '@jest/globals';
import { resolveDOMElement, resolveDOMElements } from '..';
import type { DescriptorData } from '..';
import { registerDescriptorData } from '../registry';
import { IDOMElementDescriptor } from '../types';
import { resolveDescription } from '../descriptor-access';

describe('descriptor access', () => {
  function createElement(index: number): Element {
    return { index } as unknown as Element;
  }

  test('null element, no elements', () => {
    let data = { element: null };
    expect(resolveDOMElement(data)).toEqual(null);
    expect(resolveDOMElements(data)).toEqual([]);
  });

  test('null element, empty elements', () => {
    let data = { element: null, elements: [] };
    expect(resolveDOMElement(data)).toEqual(null);
    expect(resolveDOMElements(data)).toEqual([]);
  });

  test('element, no elements', () => {
    let element = createElement(1);
    let data = { element };
    expect(resolveDOMElement(data)).toEqual(element);
    expect(resolveDOMElements(data)).toEqual([element]);
  });

  test('element, singleton elements', () => {
    let element = createElement(1);
    let data = { element, elements: [element] };
    expect(resolveDOMElement(data)).toEqual(element);
    expect(resolveDOMElements(data)).toEqual([element]);
  });

  test('element, multiple elements', () => {
    let element1 = createElement(1);
    let element2 = createElement(2);
    let data = { element1, elements: [element1, element2] };
    expect(resolveDOMElement(data)).toEqual(element1);
    expect(resolveDOMElements(data)).toEqual([element1, element2]);
  });

  test('no element, empty elements', () => {
    let data = { elements: [] };
    expect(resolveDOMElement(data)).toEqual(null);
    expect(resolveDOMElements(data)).toEqual([]);
  });

  test('no element, singleton elements', () => {
    let element = createElement(1);
    let data = { elements: [element] };
    expect(resolveDOMElement(data)).toEqual(element);
    expect(resolveDOMElements(data)).toEqual([element]);
  });

  test('no element, multiple elements', () => {
    let element1 = createElement(1);
    let element2 = createElement(2);
    let data = { elements: [element1, element2] };
    expect(resolveDOMElement(data)).toEqual(element1);
    expect(resolveDOMElements(data)).toEqual([element1, element2]);
  });

  test('no element, no elements (unexpected case)', () => {
    let data = {} as DescriptorData;
    expect(resolveDOMElement(data)).toEqual(null);
    expect(resolveDOMElements(data)).toEqual([]);
  });

  test('it works with getters', () => {
    let elements: Element[] = [];
    class Data {
      get element() {
        return elements[0];
      }
      get elements() {
        return elements;
      }
    }

    let data = new Data();

    expect(resolveDOMElement(data)).toEqual(null);
    expect(resolveDOMElements(data)).toEqual([]);

    let element1 = createElement(1);
    let element2 = createElement(2);
    elements.push(element1, element2);

    expect(resolveDOMElement(data)).toEqual(element1);
    expect(resolveDOMElements(data)).toEqual([element1, element2]);
  });

  test('it resolves descriptions', () => {
    let descriptor = {};
    registerDescriptorData(descriptor, {
      elements: [],
      description: 'empty list',
    });

    expect(resolveDescription(descriptor)).toEqual('empty list');
  });

  test('it resolves missing descriptions', () => {
    let descriptor = {};
    registerDescriptorData(descriptor, { elements: [] });

    expect(resolveDescription(descriptor)).toEqual(undefined);
  });

  test('it resolves descriptors', () => {
    let element1 = createElement(1);
    let element2 = createElement(2);
    let data = {
      element1,
      elements: [element1, element2],
      description: 'some elements',
    };
    let descriptor = {};
    registerDescriptorData(descriptor, data);

    expect(resolveDOMElement(descriptor)).toEqual(element1);
    expect(resolveDOMElement(data)).toEqual(element1);
    expect(resolveDOMElements(descriptor)).toEqual([element1, element2]);
    expect(resolveDOMElements(data)).toEqual([element1, element2]);
    expect(resolveDescription(descriptor)).toEqual('some elements');
    expect(resolveDescription(data)).toEqual('some elements');
  });

  test('it handles being passed null', () => {
    expect(resolveDOMElement(null as unknown as IDOMElementDescriptor)).toEqual(
      null
    );
    expect(
      resolveDOMElements(null as unknown as IDOMElementDescriptor)
    ).toEqual([]);
    expect(
      resolveDescription(null as unknown as IDOMElementDescriptor)
    ).toEqual(undefined);
  });
});

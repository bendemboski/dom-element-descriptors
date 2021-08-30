import { describe, test, expect } from '@jest/globals';
import { registerDescriptorData, lookupDescriptorData } from '..';
import { IDOMElementDescriptor, isDescriptor } from '..';

describe('registry', () => {
  test('register/lookup works', () => {
    let descriptor: IDOMElementDescriptor = {};
    let data = { elements: [] };

    registerDescriptorData(descriptor, data);
    expect(lookupDescriptorData(descriptor)).toStrictEqual(data);
  });

  test('look up non-existent descriptor', () => {
    let descriptor: IDOMElementDescriptor = {};
    expect(lookupDescriptorData(descriptor)).toEqual(null);
  });

  test('update data', () => {
    let descriptor: IDOMElementDescriptor = {};
    let data1 = { elements: [] };
    let data2 = { elements: [] };

    registerDescriptorData(descriptor, data1);
    registerDescriptorData(descriptor, data2);
    expect(lookupDescriptorData(descriptor)).toStrictEqual(data2);
  });

  test('unregister data', () => {
    let descriptor: IDOMElementDescriptor = {};
    let data = { elements: [] };

    registerDescriptorData(descriptor, data);
    registerDescriptorData(descriptor, null);
    expect(lookupDescriptorData(descriptor)).toEqual(null);
  });

  test('isDescriptor works', () => {
    let descriptor: IDOMElementDescriptor = {};
    let data = { elements: [] };

    expect(isDescriptor({})).toEqual(false);
    expect(isDescriptor(descriptor)).toEqual(false);

    registerDescriptorData(descriptor, data);
    expect(isDescriptor(descriptor)).toEqual(true);

    registerDescriptorData(descriptor, null);
    expect(isDescriptor(descriptor)).toEqual(false);
  });
});

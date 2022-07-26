import { describe, test, expect } from '@jest/globals';
import { registerDescriptorData, lookupDescriptorData } from '..';
import { IDOMElementDescriptor, IS_DESCRIPTOR } from '..';

describe('registry', () => {
  test('register/lookup works', () => {
    let descriptor: IDOMElementDescriptor = {
      [IS_DESCRIPTOR]: true,
    };
    let data = { elements: [] };

    registerDescriptorData(descriptor, data);
    expect(lookupDescriptorData(descriptor)).toStrictEqual(data);
  });

  test('look up non-existent descriptor', () => {
    let descriptor: IDOMElementDescriptor = {
      [IS_DESCRIPTOR]: true,
    };
    expect(lookupDescriptorData(descriptor)).toEqual(null);
  });

  test('update data', () => {
    let descriptor: IDOMElementDescriptor = {
      [IS_DESCRIPTOR]: true,
    };
    let data1 = { elements: [] };
    let data2 = { elements: [] };

    registerDescriptorData(descriptor, data1);
    registerDescriptorData(descriptor, data2);
    expect(lookupDescriptorData(descriptor)).toStrictEqual(data2);
  });

  test('unregister data', () => {
    let descriptor: IDOMElementDescriptor = {
      [IS_DESCRIPTOR]: true,
    };
    let data = { elements: [] };

    registerDescriptorData(descriptor, data);
    registerDescriptorData(descriptor, null);
    expect(lookupDescriptorData(descriptor)).toEqual(null);
  });
});

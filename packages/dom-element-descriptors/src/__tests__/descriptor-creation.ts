import { describe, test, expect } from '@jest/globals';
import {
  createDescriptor,
  lookupDescriptorData,
} from '../dom-element-descriptors';

describe('descriptor creation', () => {
  test('it works', () => {
    let data = { elements: [] };
    let descriptor = createDescriptor(data);

    expect(lookupDescriptorData(descriptor)).toStrictEqual(data);
  });
});

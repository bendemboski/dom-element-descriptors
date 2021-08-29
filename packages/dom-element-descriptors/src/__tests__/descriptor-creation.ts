import { describe, test, expect } from '@jest/globals';
import { createDescriptor } from '..';
import { lookupDescriptorData } from '..';

describe('descriptor creation', () => {
  test('it works', () => {
    let data = { elements: [] };
    let descriptor = createDescriptor(data);

    expect(lookupDescriptorData(descriptor)).toStrictEqual(data);
  });
});

import {
  createDescriptor,
  lookupDescriptorData,
  type DescriptorData,
} from '../dom-element-descriptors';

describe('descriptor creation', () => {
  test('it works', () => {
    let data: DescriptorData = { elements: [] };
    let descriptor = createDescriptor(data);

    expect(lookupDescriptorData(descriptor)).toStrictEqual(data);
  });
});

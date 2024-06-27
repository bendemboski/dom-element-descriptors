import { registerDescriptorData, lookupDescriptorData, type IDOMElementDescriptor, type DescriptorData } from 'dom-element-descriptors';
import { expectTypeOf } from 'expect-type';

expectTypeOf(registerDescriptorData).parameter(0).toEqualTypeOf<IDOMElementDescriptor>();
expectTypeOf(registerDescriptorData).parameter(1).toEqualTypeOf<DescriptorData>();

expectTypeOf(lookupDescriptorData).parameter(0).toEqualTypeOf<IDOMElementDescriptor>();
expectTypeOf(lookupDescriptorData).returns.toEqualTypeOf<DescriptorData | null>();
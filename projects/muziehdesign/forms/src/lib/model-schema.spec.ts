import { ModelSchema } from "./model-schema";
import * as Yup from 'yup';

describe('ModelSchema', () => {
  it('should create an instance', () => {
    expect(new ModelSchema([], Yup.object())).toBeTruthy();
  });
});

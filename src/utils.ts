export interface IValidationSchema<T> {
  [key: string]: {
    rules: { action: (value: T) => boolean; message: string }[];
  };
}

export type IValidate<T> = (
  values: { [key: string]: T },
  schema: IValidationSchema<T>
) => Map<string, T>;

export const validate: IValidate<string> = (values, validationSchema) => {
  const error = new Map();
  Object.entries(values).forEach(([key, value]) => {
    const hasError = validationSchema[key].rules.find(({ action }) =>
      action(value)
    );
    hasError && error.set(key, hasError.message);
  });
  return error;
};

import { useState } from 'react';

export const useInput = (initialValue: string, validator?: (value: string) => boolean) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;

    // if it gets a validator function as a second argument, validate the value onChange
    if (validator) {
      setIsValid(validator(value));
    }
    setValue(value);
  };

  const initValue = () => {
    setValue(initialValue);
    setIsValid(false);
  };

  return { value, onChange, isValid, setIsValid, initValue };
};

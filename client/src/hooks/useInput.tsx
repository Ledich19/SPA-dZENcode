import { useState } from 'react';
import useValidation from './useValidation';

export interface IUseInput {
   isValid: boolean;
   error: string;
   value: string;
   onChange: (e: string) => void;
   onBlur: () => void;
   isDirty: boolean;
}

export type ValidationType = {
   isEmpty: boolean;
   minLength: number;
   maxLength?: number;
   
   reGex?: {
      value: RegExp;
      text: string;
   };
};

const useInput = (initialValue: string | undefined, validations: ValidationType) => {
   const [value, setValue] = useState<string | undefined>(initialValue);
   const [isDirty, setIsDirty] = useState<boolean>();
   const valid = useValidation(value, validations);

   const onChange = (e: string) => {
      setValue(e);
   };
   const onBlur = () => {
      setIsDirty(true);
   };
   const clear = () => {
      setValue('');
      setIsDirty(false);
   };

   return {
      value,
      onChange,
      onBlur,
      isDirty,
      clear,
      ...valid,
   };
};
export default useInput;

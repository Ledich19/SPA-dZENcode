import { useState, useEffect } from 'react';

export type ValidationType = {
   isEmpty: boolean;
   minLength: number;
   maxLength?: number;
   reGex?: {
      value: RegExp;
      text: string;
   };
};

const useValidation = (value: string | undefined, validations: ValidationType) => {
   const [error, setError] = useState('');
   const [isValid, setIsValid] = useState(false);

   useEffect(() => {
      setIsValid(true);
      setError('');
      const validationKeys = Object.keys(validations);
      validationKeys.forEach((key) => {
         switch (key) {
            case 'reGex':
               if (value && validations[key]) {
                  const isValidValue = validations[key]?.value?.test(value);
                  if (!isValidValue) {
                     setError(validations[key]?.text || '');
                     setIsValid(false);
                  }
               }
               break;
            case 'minLength':
               if (value && value.length < validations[key]) {
                  setIsValid(false);
                  setError(`Повинно бути довше ніж ${validations[key]}`);
               }
               break;
            case 'isEmpty':
               if (!value && !validations.isEmpty) {
                  setIsValid(false);
                  setError(`Е обов'язковим`);
               }
               break;
            default:
               break;
         }
      });
   }, [value, validations]);

   return {
      isValid,
      error,
   };
};
export default useValidation;

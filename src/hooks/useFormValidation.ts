import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  phone?: boolean;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

export interface FormErrors {
  [key: string]: string;
}

export interface UseFormValidationReturn {
  errors: FormErrors;
  validate: (fieldName: string, value: any, rules: ValidationRule) => string | undefined;
  validateAll: (data: Record<string, any>, rules: Record<string, ValidationRule>) => FormErrors;
  clearError: (fieldName: string) => void;
  clearAllErrors: () => void;
  hasErrors: boolean;
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
  };

  const validate = useCallback(
    (fieldName: string, value: any, rules: ValidationRule): string | undefined => {
      let error: string | undefined;

      // Required validation
      if (rules.required && (!value || value.toString().trim() === '')) {
        error = `This field is required`;
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Min length validation
      if (rules.minLength && value && value.toString().length < rules.minLength) {
        error = `Minimum ${rules.minLength} characters required`;
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Max length validation
      if (rules.maxLength && value && value.toString().length > rules.maxLength) {
        error = `Maximum ${rules.maxLength} characters allowed`;
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Email validation
      if (rules.email && value && !validateEmail(value)) {
        error = 'Please enter a valid email address';
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Phone validation
      if (rules.phone && value && !validatePhone(value)) {
        error = 'Please enter a valid phone number';
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Pattern validation
      if (rules.pattern && value && !rules.pattern.test(value)) {
        error = 'Invalid format';
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Custom validation
      if (rules.custom) {
        error = rules.custom(value);
        if (error) {
          setErrors((prev) => ({ ...prev, [fieldName]: error }));
          return error;
        }
      }

      // Clear error if all validations pass
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });

      return undefined;
    },
    []
  );

  const validateAll = useCallback(
    (data: Record<string, any>, rules: Record<string, ValidationRule>): FormErrors => {
      const newErrors: FormErrors = {};

      Object.entries(rules).forEach(([fieldName, fieldRules]) => {
        const error = validate(fieldName, data[fieldName], fieldRules);
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      setErrors(newErrors);
      return newErrors;
    },
    [validate]
  );

  const clearError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    validate,
    validateAll,
    clearError,
    clearAllErrors,
    hasErrors,
  };
}

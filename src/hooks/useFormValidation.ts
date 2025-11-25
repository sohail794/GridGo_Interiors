import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  phone?: boolean;
  indianPhone?: boolean;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

export interface FormErrors {
  [key: string]: string | undefined;
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
    // Standard email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
  };

  const validateIndianPhone = (phone: string): boolean => {
    // Indian 10-digit mobile number (with optional +91 or 0 prefix)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    return indianPhoneRegex.test(cleanPhone);
  };

  const validate = useCallback(
    (fieldName: string, value: any, rules: ValidationRule): string | undefined => {
      let error: string | undefined;
      const stringValue = value?.toString().trim() || '';

      // Required validation
      if (rules.required && !stringValue) {
        error = `This field is required`;
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Skip other validations if field is empty and not required
      if (!stringValue && !rules.required) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
        return undefined;
      }

      // Min length validation
      if (rules.minLength && stringValue.length < rules.minLength) {
        error = `Minimum ${rules.minLength} characters required`;
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Max length validation
      if (rules.maxLength && stringValue.length > rules.maxLength) {
        error = `Maximum ${rules.maxLength} characters allowed`;
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Email validation
      if (rules.email && !validateEmail(stringValue)) {
        error = 'Please enter a valid email address';
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Phone validation
      if (rules.phone && !validatePhone(stringValue)) {
        error = 'Please enter a valid phone number';
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Indian phone validation
      if (rules.indianPhone && !validateIndianPhone(stringValue)) {
        error = 'Please enter a valid 10-digit Indian mobile number';
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        return error;
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(stringValue)) {
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

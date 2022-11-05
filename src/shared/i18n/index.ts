import { ErrorsI18N } from './types';

export function getErrorMessage(errorMessageKey: keyof ErrorsI18N) {
  return {
    isAppError: true,
    errorMessageKey,
  };
}

export * from './locales/en';
export * from './locales/pt';

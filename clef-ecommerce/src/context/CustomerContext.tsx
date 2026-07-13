import Router from 'next/router';
import React from 'react';
import {
  clearStoredCustomerToken,
  getStoredCustomerToken,
  normaliseMedusaError,
  setStoredCustomerToken,
  storeFetch,
} from '../lib/medusa-store';

export type StorefrontCustomer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
};

type CustomerContextValue = {
  customer: StorefrontCustomer | null;
  token: string | null;
  isCustomerLoading: boolean;
  customerError: string | null;
  login: (email: string, password: string, returnUrl?: string) => Promise<void>;
  register: (input: RegisterInput, returnUrl?: string) => Promise<void>;
  logout: () => void;
  refreshCustomer: () => Promise<void>;
};

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptsTerms: boolean;
};

type AuthResponse = {
  token?: string;
};

type CustomerResponse = {
  customer?: {
    id: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    phone?: string | null;
  };
};

const CustomerContext = React.createContext<CustomerContextValue | null>(null);

const mapCustomer = (response: CustomerResponse): StorefrontCustomer | null => {
  const customer = response.customer;

  if (!customer?.id || !customer.email) {
    return null;
  }

  return {
    id: customer.id,
    email: customer.email,
    firstName: customer.first_name ?? '',
    lastName: customer.last_name ?? '',
    phone: customer.phone ?? null,
  };
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }
};

export const CustomerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [customer, setCustomer] = React.useState<StorefrontCustomer | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isCustomerLoading, setIsCustomerLoading] = React.useState(true);
  const [customerError, setCustomerError] = React.useState<string | null>(null);

  const loadCustomer = React.useCallback(async (authToken: string | null) => {
    if (!authToken) {
      setCustomer(null);
      setToken(null);
      setIsCustomerLoading(false);
      return;
    }

    setIsCustomerLoading(true);
    setCustomerError(null);

    try {
      const response = await storeFetch<CustomerResponse>('/store/customers/me', {
        authToken,
      });
      setCustomer(mapCustomer(response));
      setToken(authToken);
    } catch (error) {
      clearStoredCustomerToken();
      setCustomer(null);
      setToken(null);
      setCustomerError(normaliseMedusaError(error));
    } finally {
      setIsCustomerLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadCustomer(getStoredCustomerToken());
  }, [loadCustomer]);

  const login = React.useCallback(
    async (email: string, password: string, returnUrl = '/account') => {
      setCustomerError(null);

      try {
        const response = await storeFetch<AuthResponse>('/auth/customer/emailpass', {
          method: 'POST',
          body: JSON.stringify({
            email: normalizeEmail(email),
            password,
          }),
        });

        if (!response.token) {
          throw new Error('Medusa did not return a customer session.');
        }

        setStoredCustomerToken(response.token);
        await loadCustomer(response.token);
        void Router.push(returnUrl);
      } catch (error) {
        const message = normaliseMedusaError(error);
        setCustomerError(message);
        throw new Error(message);
      }
    },
    [loadCustomer],
  );

  const register = React.useCallback(
    async (input: RegisterInput, returnUrl = '/account') => {
      const email = normalizeEmail(input.email);
      setCustomerError(null);
      validatePassword(input.password);

      if (input.password !== input.confirmPassword) {
        throw new Error('Passwords must match.');
      }

      if (!input.acceptsTerms) {
        throw new Error('Please accept the terms before creating an account.');
      }

      try {
        const authResponse = await storeFetch<AuthResponse>(
          '/auth/customer/emailpass/register',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password: input.password,
            }),
          },
        );

        if (!authResponse.token) {
          throw new Error('Medusa did not return a customer session.');
        }

        await storeFetch<CustomerResponse>('/store/customers', {
          authToken: authResponse.token,
          method: 'POST',
          body: JSON.stringify({
            email,
            first_name: input.firstName.trim(),
            last_name: input.lastName.trim(),
            phone: input.phone?.trim() || undefined,
          }),
        });

        setStoredCustomerToken(authResponse.token);
        await loadCustomer(authResponse.token);
        void Router.push(returnUrl);
      } catch (error) {
        const message = normaliseMedusaError(error);
        setCustomerError(message);
        throw new Error(message);
      }
    },
    [loadCustomer],
  );

  const logout = React.useCallback(() => {
    clearStoredCustomerToken();
    setCustomer(null);
    setToken(null);
    void Router.push('/login');
  }, []);

  const value = React.useMemo(
    () => ({
      customer,
      token,
      isCustomerLoading,
      customerError,
      login,
      register,
      logout,
      refreshCustomer: () => loadCustomer(getStoredCustomerToken()),
    }),
    [
      customer,
      customerError,
      isCustomerLoading,
      loadCustomer,
      login,
      logout,
      register,
      token,
    ],
  );

  return (
    <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
  );
};

export function useCustomer() {
  const context = React.useContext(CustomerContext);

  if (!context) {
    throw new Error('useCustomer must be used inside CustomerProvider.');
  }

  return context;
}

import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessages, 'id'>): void;
  removeToast(id: string): void;
}
export interface ToastMessages {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([]);
  const addToast = useCallback(
    ({ type, description, title }: Omit<ToastMessages, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        title,
        type,
        description,
      };
      setMessages(state => [...state, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a Proivder');
  }
  return context;
}
export { useToast, ToastProvider };

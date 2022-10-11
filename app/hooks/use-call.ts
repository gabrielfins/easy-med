import { useContext } from 'react';
import { CallContext } from '../contexts/CallContext';

export function useCall() {
  return useContext(CallContext);
}

import { jwtDecode } from 'jwt-decode';
import { DecodePaylodType } from '../types/docode-payload.type';

export function decode(): DecodePaylodType | null {
  const token = sessionStorage.getItem('token');
  if (token === null) {
    return null;
  }

  const decoded = jwtDecode<DecodePaylodType>(token);
  return decoded;
}

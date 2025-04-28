import { jwtDecode } from 'jwt-decode';
import { DecodePaylodType } from '../types/docode-payload.type';

export function decode(): DecodePaylodType {
  const auth = sessionStorage.getItem('response-token');

  if (!auth) {
    throw new Error('Error ao validar token');
  }

  const token = JSON.parse(auth).token;

  const decoded = jwtDecode<DecodePaylodType>(token);
  return decoded;
}

import { jwtDecode } from 'jwt-decode';
import { DecodePaylodType } from '../types/docode-payload.type';

export function decode(): DecodePaylodType | null {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<DecodePaylodType>(token);
    return decoded;
  } catch (e) {
    console.error('Erro ao decodificar token: ', e);
    return null;
  }
}

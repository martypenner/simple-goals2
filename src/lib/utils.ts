import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeJWTPayload(token: string) {
  const base64Url = token.split('.')[1]; // Get the payload part
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert base64url to base64
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export function sanitizeRoomID(roomID: string) {
  return roomID.replaceAll(/[^A-Za-z0-9_/-]/g, '-');
}

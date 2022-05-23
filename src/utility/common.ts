import { Status } from '../types/common';

export function getStatus(isSubmitted: boolean, isApproved: boolean, isRejected: boolean): Status {
  if (isRejected) return 'rejected';
  if (isApproved) return 'approved';
  if (isSubmitted) return 'pending';
  return 'draft';
}

export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key) || null;
}

export function getSessionToken(): string {
  return sessionStorage.getItem('token') || '';
}

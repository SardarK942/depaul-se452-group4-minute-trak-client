import { Status } from '../types/common';

export function getStatus(isSubmitted: boolean, isApproved: boolean, isRejected: boolean): Status {
  if (isRejected) return 'rejected';
  if (isApproved) return 'approved';
  if (isSubmitted) return 'pending';
  return 'draft';
}

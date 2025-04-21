import {OrderDisplayFinancialStatus, OrderDisplayFulfillmentStatus} from '../types/admin.types.d'

export const formatMoney = (amount: string, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(parseFloat(amount));
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const statusFulfillmentValueMap = {
  [OrderDisplayFulfillmentStatus.Fulfilled]: {
    progress: 'complete',
    tone: 'success',
    label: 'Fulfilled',
  },
  [OrderDisplayFulfillmentStatus.PartiallyFulfilled]: {
    progress: 'partiallyComplete',
    tone: 'attention',
    label: 'Partially Fulfilled',
  },
  [OrderDisplayFulfillmentStatus.InProgress]: {
    progress: 'partiallyComplete',
    tone: 'info',
    label: 'In Progress',
  },
  [OrderDisplayFulfillmentStatus.Unfulfilled]: {
    progress: 'incomplete',
    tone: 'warning',
    label: 'Unfulfilled',
  },
  [OrderDisplayFulfillmentStatus.OnHold]: {
    progress: 'incomplete',
    tone: 'warning',
    label: 'On Hold',
  },
  [OrderDisplayFulfillmentStatus.Open]: {
    progress: 'incomplete',
    tone: 'info',
    label: 'Open',
  },
  [OrderDisplayFulfillmentStatus.PendingFulfillment]: {
    progress: 'incomplete',
    tone: 'info',
    label: 'Pending Fulfillment',
  },
  [OrderDisplayFulfillmentStatus.RequestDeclined]: {
    progress: 'incomplete',
    tone: 'critical',
    label: 'Request Declined',
  },
  [OrderDisplayFulfillmentStatus.Restocked]: {
    progress: 'incomplete',
    tone: 'info',
    label: 'Restocked',
  },
  [OrderDisplayFulfillmentStatus.Scheduled]: {
    progress: 'partiallyComplete',
    tone: 'info',
    label: 'Scheduled',
  },
} as const;

export const statusPaymentValueMap = {
  [OrderDisplayFinancialStatus.Paid]: {
    progress: 'complete',
    tone: 'success',
    label: 'Paid',
  },
  [OrderDisplayFinancialStatus.PartiallyPaid]: {
    progress: 'partiallyComplete',
    tone: 'attention',
    label: 'Partially Paid',
  },
  [OrderDisplayFinancialStatus.Voided]: {
    progress: 'incomplete',
    tone: 'critical',
    label: 'Voided',
  },
  [OrderDisplayFinancialStatus.Pending]: {
    progress: 'incomplete',
    tone: "info",
    label: 'Pending',
  },
  [OrderDisplayFinancialStatus.Expired]: {
    progress: 'incomplete',
    tone: 'critical',
    label: 'Expired',
  },
  [OrderDisplayFinancialStatus.Authorized]: {
    progress: 'partiallyComplete',
    tone: 'info',
    label: 'Authorized',
  },
  [OrderDisplayFinancialStatus.Refunded]: {
    progress: 'complete',
    tone: 'critical',
    label: 'Refunded',
  },
  [OrderDisplayFinancialStatus.PartiallyRefunded]: {
    progress: 'partiallyComplete',
    tone: 'attention',
    label: 'Partially Refunded',
  },
} as const;
 
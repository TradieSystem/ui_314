/**
 * Interface to describe {@link CCDetails} for a {@link User} to make payments
 */
export interface CCDetails {
    CCName: string;
    CCNumber: string;
    expiryDate: string;
    CVV: string;
    billingType: CCBillingType;
}

/**
 * Billing type can be {@code IN}coming or {@code OUT}going
 */
export enum CCBillingType {
    IN = 'In',
    OUT = 'Out'
}
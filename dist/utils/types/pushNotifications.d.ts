import type { Constraint } from './constraints';
export interface G_PushNotificationEntry<InternalAppTarget, Timestamp> {
    title: string;
    message: string;
    target?: InternalAppTarget | null;
    published: boolean;
    publishedAt?: Timestamp;
    notificationSent: boolean;
    constraint?: Constraint | null;
}

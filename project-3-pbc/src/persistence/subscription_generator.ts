import { DatabaseDocument } from "./persisted_object";

export type SubscriptionGenerator = (onStreamUpdates: OnStreamUpdate) => Unsubscriber;
export type OnStreamUpdate =  (snapshot: DatabaseDocument[]) => void;

export interface Unsubscriber {
    unsubscribe: () => void
}
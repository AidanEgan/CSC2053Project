import Converter from '../model/converters/converter';
import {SubscriptionGenerator, Unsubscriber} from '../persistence/subscription_generator';
import ListenerClient from './listener_client';
import { DatabaseDocument } from '../persistence/persisted_object';

type OnUpdateCallBack<T> = (data: T[]) => void;
type VoidCallback = () => void;
export default class Listener<T> {
  private converter: Converter<T>;
  public onAllUpdates: OnUpdateCallBack<T> | null;


  constructor(converter: Converter<T>, onAllUpdates: OnUpdateCallBack<T> | null) {
      this.converter = converter;
      this.onAllUpdates = onAllUpdates;
  }

  private subscriptionGenerators: Map<String, SubscriptionGenerator> = new Map<String, SubscriptionGenerator>();
  private currentSubscriptions: Map<String, Unsubscriber> = new Map<String, Unsubscriber>();
  private onUpdateCallBacks: Map<String, VoidCallback> = new Map<String, VoidCallback>();

  public alreadySubscribed(client: ListenerClient<any>): boolean {
    return this.currentSubscriptions.has(client.getClientID());
  }

  public hasSubscriptionGeneratorReady(client: ListenerClient<any>) {
    return this.subscriptionGenerators.has(client.getClientID());
  }

  private executeOnAllUpdatesWrapper(updatedData: T[]): void {
    if (this.onAllUpdates != null) {
      this.onAllUpdates(updatedData);
    }
  }

  public beginListening(onUpdate: VoidCallback, client: ListenerClient<any>): void {
    if (!this.hasSubscriptionGeneratorReady(client)) {
      throw Error("No subscription generator ready!");
    } else if (this.alreadySubscribed(client)) {
      throw Error("There is already a client subscribed!");
    }
    this.onUpdateCallBacks.set(client.getClientID(), onUpdate);
    this.generateStream(client);
  }

  public updateSubscriptionGenerator(newSubscriptionGenerator: SubscriptionGenerator, client: ListenerClient<any>): void {
    this.subscriptionGenerators.set(client.getClientID(), newSubscriptionGenerator);
    if (this.alreadySubscribed(client)) {
      this.currentSubscriptions.get(client.getClientID())!.unsubscribe();
      this.generateStream(client);
    }
  }

  public getOnUpdateForClient(client: ListenerClient<any>): VoidCallback | undefined {
    return this.onUpdateCallBacks.get(client.getClientID());
  }

  private generateStream(client: ListenerClient<any>) {
    this.currentSubscriptions.set(client.getClientID(), this.subscriptionGenerators.get(client.getClientID())!((persistedObjects: DatabaseDocument[]) => {
      let newData: T[] = persistedObjects.map((snapshot: DatabaseDocument) => this.converter.fromPersistence(snapshot));
      this.executeOnAllUpdatesWrapper(newData);
      this.onUpdateCallBacks.get(client.getClientID())!();
    }));
  }

  terminateSubscription(client: ListenerClient<any>): void {
    if (this.alreadySubscribed(client)) {
      this.currentSubscriptions.get(client.getClientID())!.unsubscribe();
      this.currentSubscriptions.delete(client.getClientID());
    }
  }
}
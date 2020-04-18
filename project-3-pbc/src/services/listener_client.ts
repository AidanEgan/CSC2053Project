import Store from './store';
import {SubscriptionGenerator} from '../persistence/subscription_generator';

export default class ListenerClient<StoreType> {
  private subscribeTo: SubscriptionGenerator;
  private store: StoreType;
  private initializationTimeStamp: Date;

  constructor(store: StoreType, subscribeTo: SubscriptionGenerator) {
      this.subscribeTo = subscribeTo;
      this.store = store;
      this.initializationTimeStamp = new Date();
  }

  public getStore(): StoreType {
    return this.store;
  }

  public getClientID(): string {
    return this.initializationTimeStamp.toISOString();
  }


  public toString(): string {
    return this.getClientID();
  }

  public updateSubscriptionGenerator(newSubscription?: SubscriptionGenerator) {
    let store: Store<any> = (this.store as unknown) as Store<any>;
    if (newSubscription !== undefined) {
      this.subscribeTo = newSubscription;
    }
    if (this.subscribeTo != null) {
      store.getListener().updateSubscriptionGenerator(this.subscribeTo, this);
    }
  }
}

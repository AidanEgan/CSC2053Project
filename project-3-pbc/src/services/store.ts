import Listener from './listener';
import Converter from '../model/converters/converter';

export default abstract class Store<T> {
    private listener: Listener<T>;
  
    constructor(converter: Converter<T>) {
      this.updateCache = this.updateCache.bind(this);
      this.isLoaded = this.isLoaded.bind(this);
      this.listener = new Listener<T>(converter, this.updateCache);
    }
  
    abstract updateCache(newData: T[]):void;
  
    abstract isLoaded(): boolean;
  
    getListener(): Listener<T>  {
      return this.listener;
    }
  
  }
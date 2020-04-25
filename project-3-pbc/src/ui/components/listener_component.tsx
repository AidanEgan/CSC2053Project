import ListenerClient from '../../services/listener_client';
import Store from '../../services/store';
import { firebaseApp } from '../../persistence/firebase_app';
import "firebase/firestore";
import * as firebase from "firebase/app";
import React from 'react';



export default abstract class ListenerComponent<T,K> extends React.Component<T,K> {
    private unsubscribe?: firebase.Unsubscribe;
    private clientsNotStarted: boolean = true;
    private clients?: ListenerClient<any>[];

    constructor(props: T) {
        super(props);
        this.onUpdateCallback = this.onUpdateCallback.bind(this);
        this.getEmployedListenerClients = this.getEmployedListenerClients.bind(this);
        this.getPathOnRefresh = this.getPathOnRefresh.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.refreshListenerClients = this.refreshListenerClients.bind(this);
        this.startClients = this.startClients.bind(this);
        this.stopClients = this.stopClients.bind(this);
    }

    abstract getEmployedListenerClients(): ListenerClient<any>[];

    abstract renderGuarded(): React.ReactElement;

    abstract getPathOnRefresh(): string;

    componentDidMount() {
        this.unsubscribe = firebaseApp.auth().onAuthStateChanged((user: firebase.User | null) => {
            this.unsubscribe!();
            this.setState({});
        });
    }

    componentWillUnmount() {
        this.unsubscribe!();
        this.stopClients(this.clients);
    }

    onUpdateCallback() {
        this.setState({});
    }

    refreshListenerClients(clients: ListenerClient<any>[]) {
        this.stopClients(this.clients);
        this.startClients(clients);
    }

    private startClients(clients: ListenerClient<any>[]) {
        this.clientsNotStarted = false;
        this.clients = clients;
        for (let client of this.clients!) {
            client.updateSubscriptionGenerator();
            let store: Store<any> = client.getStore();
            store.getListener().beginListening(this.onUpdateCallback, client);
        }
    }

    private stopClients(clients?: ListenerClient<any>[]) {
        if (clients !== undefined) {
            for (let client of clients!) {
                let store: Store<any> = client.getStore();
                store.getListener().terminateSubscription(client);
            } 
        }
    }

    render() {
        if (this.clientsNotStarted) {
            this.startClients(this.getEmployedListenerClients());
        }
        return this.renderGuarded();
    }
}
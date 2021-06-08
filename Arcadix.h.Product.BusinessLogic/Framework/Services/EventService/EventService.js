import { Subject } from 'rxjs';

const listeners = {};
const eventsSubject = new Subject();
const events = eventsSubject.asObservable();

export const EventService = {

     subscription: events.subscribe(({ name, args }) => {
            if (listeners[name]) {
                for (let listener of listeners[name]) {
                    listener(args);
                }
            }
        }),

    broadcast: (name, args) => {
        eventsSubject.next({
            name,
            args
        });
    },

    on: (name, listener) => {
        if (!listeners[name]) {
            listeners[name] = [];
        }
        listeners[name].push(listener);
    }
};
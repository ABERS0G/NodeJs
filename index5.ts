type EventCallback = () => void;

class MyEventEmitter {
    private eventHandlers: { [eventName: string]: EventCallback[] };

    constructor() {
        this.eventHandlers = {};
    }

    public registerHandler(eventName: string, callback: EventCallback): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(callback);
    }

    public emitEvent(eventName: string): void {
        const handlers = this.eventHandlers[eventName];

        if (handlers) {
            handlers.forEach((callback) => callback());
        }
    }
}

// Пример использования

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено

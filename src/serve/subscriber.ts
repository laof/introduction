/**
 * 组件通讯
 *
 * @export
 * @class Subscriber
 */
class Subscriber {
    private handlers = {};
    on(eventType, handler) {
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }
    off(eventType, handler) {
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--) {
                if (currentEvent[i] === handler) {
                    currentEvent.splice(i, 1);
                }
            }
        }
    }
    emit(eventType, ...args) {
        for (var i = 0; i < this.handlers[eventType].length; i++) {
            this.handlers[eventType][i](...args);
        }
    }
}

export default new Subscriber();
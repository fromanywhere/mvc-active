/*global define */
define(function () {
    "use strict";

    /**
     * @abstract
     */
    class AbstractObservable {

        constructor() {
            /** @type {Array<AbstractObserver>} */
            this.observers = [];
        }

        /**
         * Добавить наблюдателя
         * @param {AbstractObserver} observer
         */
        addObserver(observer) {
            this.observers.push(observer);
            return this;
        }

        /**
         * Удалить наблюдателя
         * @param {AbstractObserver} observer
         */
        removeObserver(observer) {
            let observerPosition = this.observers.indexOf(observer);
            this.observers.splice(observerPosition, 1);
            return this;
        }

        /**
         * Уведомить всех наблюдателей об изменении
         */
        notifyObservers() {
            let watching = this.observers;
            watching.forEach((/**AbstractObserver*/ observer) => {
                observer.update(this);
            });
            return this;
        }
    }

    return AbstractObservable;
});
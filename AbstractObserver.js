/*global define */
define(function () {
    "use strict";

    /**
     * @class
     * @abstract
     */
    class AbstractObserver {
        /**
         * @abstract
         * @param {AbstractObservable} observable
         */
        update(observable) {}
    }

    return AbstractObserver;
});
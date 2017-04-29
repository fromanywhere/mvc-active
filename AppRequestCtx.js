define(function () {

    /**
     * Контекст запроса
     * Хранит в себе идентификатор текущего состояния и параметры запроса
     */
    class AppRequestCtx {

        /**
         *
         * @param {String} stateId
         * @param {Object} [stateParams]
         */
        constructor(stateId, stateParams) {
            this.stateId = stateId;
            this.stateParams = stateParams;
        }

        /**
         *
         * @return {String}
         */
        getStateId() {
            return this.stateId;
        }

        /**
         *
         * @return {Object}
         */
        getStateParams() {
            return this.stateParams;
        }

        /**
         *
         * @param {String} paramName
         * @returns {*}
         */
        getParam(paramName) {
            return this.stateParams[paramName];
        }
    }

    return AppRequestCtx;
});
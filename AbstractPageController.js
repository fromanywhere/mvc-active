define([
    'AbstractController'
], function (
    /** AbstractController */ AbstractController
) {

    /**
     * Абстрактный контроллер страницы
     * Принимает параметры рендеринга.
     * На основании параметров принимает решение, следует ли возвращать результат рендера сопоставленного View (по умолчанию — да)
     */
    class AbstractPageController extends AbstractController {

        /**
         *
         * @param {AppRequestCtx} ctx
         */
        constructor(ctx) {
            super();
            this.needRender = this.handleRequest(ctx);

            if (typeof this.needRender !== 'boolean') {
                throw new Error('needRender должен быть boolean');
            }
        }

        /**
         *
         * @param {AppRequestCtx} ctx
         */
        handleRequest(ctx) {
            return true;
        }
    }

    return AbstractPageController;
});
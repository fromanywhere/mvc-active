define(function () {

    /**
     * Абстрактный контроллер
     * Принимает какой-то запрос и как-то на него реагирует, изменяя модель
     */
    class AbstractController {

        handleRequest() {
            throw new Error('Необходимо реализовать HandleRequest');
        }

        /**
         *
         * @return {AbstractView}
         */
        getView() {
            throw new Error('Необходимо определить View');
        }
    }

    return AbstractController;
});
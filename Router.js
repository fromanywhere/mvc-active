define([
    'AbstractController',
    'RouterView',
    'State'
], function (
    /** AbstractController */ AbstractController,
    /** RouterView */ RouterView,
    /** State */ State
) {

    /**
     * Контроллер приложения
     * Обрабатывает запросы от пользователя, на основе них переходит в нужное состояние
     * На основе полученного состояния и его параметров отрисовывает результат
     */
    class Router extends AbstractController {

        /**
         *
         * @param {HTMLElement} renderNode
         */
        init(renderNode) {
            this.renderNode = renderNode;
        
            window.addEventListener('hashchange', this.handleRequest.bind(this));
            document.addEventListener('submit', this.handleRequest.bind(this));

            this.view = this.getView();
            this.render();
        }

        /**
         *
         * @param {Event} e
         */
        formSubmit(e) {
            e.preventDefault();
            var form = e.target;
            var target = form.getAttribute('target') || State.getCurrentState().stateId;
            var method = form.getAttribute('method') || 'GET';
            var formData = new FormData(form);
            var params = {
                method: method
            };

            for (var value of formData.entries()) {
                params[value[0]] = value[1];
            }

            State.setState(target, params, method.toUpperCase() === 'GET');
        }
        
        getView() {
            return new RouterView();
        }

        /**
         *
         * @param {Event} e
         */
        handleRequest(e) {
            e.preventDefault();

            switch (e.type) {
                case 'hashchange':
                    State.setUrlState(window.location.hash);
                    break;
                case 'submit':
                    this.formSubmit(e);
                    break;
            }
        }

        render() {
            this.renderNode.innerHTML = '';
            this.renderNode.appendChild(this.view.getRenderNode());
            this.view.render();
        }
    }

    return new Router();
});
define([
    'AbstractView',
    'AppRequestCtx',
    'State'
], function (
    /** AbstractView */ AbstractView,
    /** AppRequestCtx */ AppRequestCtx,
    /** State */ State
) {

    class RouterView extends AbstractView {

        constructor() {
            super();
            /** @type AbstractView */
            this.currentView = null;
        }

        getTemplate() {
            return null;
        }

        getSubscribeList() {
            return [State];
        }

        render() {
            var state = State.getCurrentState();

            if (this.currentView) {
                this.currentView.destructor();
            }

            this.resolveDependencies([state.stateId]).then((Page) => {
                var page = new Page[0](new AppRequestCtx(state.stateId, state.stateParams));
                if (page.needRender) {
                    var View = page.getView();
                    this.currentView = new View();
                    this.node.innerHTML = '';
                    this.node.appendChild(this.currentView.getRenderNode());
                    this.currentView.render();
                }
            });
        }
    }

    return RouterView;
});
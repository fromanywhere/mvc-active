define([
    'AbstractView',
    'State'
], function (
    /** AbstractView */ AbstractView,
    /** State */ State
) {
    
    class ErrorPageView extends AbstractView {

        getTemplateParams() {
            return {
                error: State.getCurrentState().stateParams.error,
                trace: State.getCurrentState().stateParams.trace
            }
        }
    }
    
    return ErrorPageView;
});
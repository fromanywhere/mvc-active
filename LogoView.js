define([
    'AbstractView',
    'State'
], function (
    /** AbstractView */ AbstractView,
    /** State */ State
) {
    class LogoView extends AbstractView {

        getTemplateParams() {
            return {
                isMainState: State.getCurrentState().stateId === State.list.MAIN_PAGE,
                logoLink: State.getLinkOnState(State.list.MAIN_PAGE)                             
            }
        }    

    }
    return LogoView;
});
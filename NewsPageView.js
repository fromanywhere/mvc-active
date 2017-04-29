define([
    'AbstractView',
    'DomainModel',
    'State'
], function (
    /** AbstractView */ AbstractView,
    /** DomainModel */ DomainModel,
    /** State */ State
) {

    class NewsPageView extends AbstractView {

        getTemplateParams() {
            return {
                title: DomainModel.getNews()[State.getCurrentState().stateParams.id].title
            }
        }
    }
    
    return NewsPageView;
});
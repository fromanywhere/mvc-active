define([
    'AbstractPageController',
    'State',
    'NewsPageView',
    'DomainModel'
], function (
    /** AbstractPageController */ AbstractPageController,
    /** State */ State,
    /** NewsPageView */ NewsPageView,
    /** DomainModel */ DomainModel,
) {
    class NewsPage extends AbstractPageController {

        handleRequest(ctx) {
            var requestedNews = DomainModel.getNews()[ctx.getParam('id')];

            if (!requestedNews) {
                State.setState(State.list.ERROR_PAGE, {
                    error: "Некорректные параметры новости"
                });
                return false;
            }

            return true;
        }

        getView() {
            return NewsPageView;
        }
    }

    return NewsPage;
});
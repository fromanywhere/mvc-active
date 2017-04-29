define([
    'AbstractPageController',
    'DomainModel',
    'MainPageView'
], function (
    /** AbstractPageController */ AbstractPageController,
    /** DomainModel */ DomainModel,
    /** MainPageView */ MainPageView
) {
    class MainPage extends AbstractPageController {

        getView() {
            return MainPageView;
        }
        
        handleRequest(ctx) {
            var title = ctx.getParam('new');
            var isPost = ctx.getParam('method') === 'POST';

            if (isPost) {
                if (title) {
                    DomainModel.createNews(title, 0);
                }

                return false;
            }

            return true;
        }
    }

    return MainPage;
});
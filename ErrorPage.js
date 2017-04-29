define([
    'AbstractPageController',
    'ErrorPageView'
], function (
    /** AbstractPageController */ AbstractPageController,
    /** ErrorPageView */ ErrorPageView
) {
    class ErrorPage extends AbstractPageController {

        getView() {
            return ErrorPageView;
        }
    }

    return ErrorPage;
});
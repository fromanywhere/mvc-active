define([
    'AbstractView',
    'DomainModel',
    'State'
], function (
    /** AbstractView */ AbstractView,
    /** DomainModel */ DomainModel,
    /** State */ State
) {
    class NewsListView extends AbstractView {

        // Отсортируем по рейтингу, чтобы показать предобработку данных модели
        sortNewsList() {
            return DomainModel.getNews().sort((a, b) => {
                return b.rating - a.rating;
            });
        }

        getSubscribeList() {
            return [DomainModel];
        }

        getTemplateParams() {
            return {
                newsList: this.sortNewsList(),
                getNewsPageLink: (id) => {
                    return State.getLinkOnState(State.list.NEWS_PAGE, {
                        id: id
                    });
                }
            }
        }
    }

    return NewsListView;
});
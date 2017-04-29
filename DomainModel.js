define([
    'AbstractModel'
], function (
    /** AbstractModel */ AbstractModel
) {

    /**
     * Модель, хранящая данные, а также методы работы с ними (чтение / создание)
     */
    class DomainModel extends AbstractModel {

        constructor() {
            super();

            this.data = {
                news: [
                    {
                        id: 0,
                        title: "Заголовок первой новости",
                        rating: 3
                    },
                    {
                        id: 1,
                        title: "Заголовок второй новости",
                        rating: 1
                    },
                    {
                        id: 2,
                        title: "Заголовок третьей новости",
                        rating: 2
                    }
                ]
            };

            // Сэмулируем подгрузку новостей
            this.fetchNews();
        }

        getNews() {
            // Тут данные — объект. Если вернуть сразу this.data.news, вернутся не просто данные, а ссылка на объект.
            // Тогда изменения в возвращенной структуре будут автоматически отражаться и на оригинальной модели, что неправильно.
            // Поэтому возвращается копия оригинальной модели
            return this.data.news.slice();
        }

        /**
         *
         * @param {String} title
         * @param {Number} rating
         */
        createNews(title, rating) {
            this.data.news.push({
                id: this.data.news.length,
                title: title,
                rating: rating
            });
            this.notifyObservers();
        }

        fetchNews() {
            setTimeout(() => {
                this.createNews('Fetched News #' + this.data.news.length, -1);
                if (this.data.news.length < 10) {
                    this.fetchNews();
                }
            }, 3000);
        }
    }

    return new DomainModel();
});
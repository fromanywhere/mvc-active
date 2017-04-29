define([
    'doT.min',
    'AbstractObserver'
], function (
    /** doT */ dot,
    /** AbstractObserver */ AbstractObserver
) {

    /**
     * Абстрактная View. Реализации могут обладать собственной клиентской логикой
     */
    class AbstractView extends AbstractObserver {

        constructor() {
            super();
            this.templateId = this.constructor.name;
            this.template = this.getTemplate();
            this.node = document.createElement('div');
            this.node.setAttribute('data-view-name', this.templateId);
            this.childViews = [];

            this.getSubscribeList().forEach((AbstractModel) => {
                AbstractModel.addObserver(this);
            });
        }
        
        destructor() {
            this.getSubscribeList().forEach((AbstractModel) => {
                AbstractModel.removeObserver(this);
            });

            this.deactivate();
        }

        /**
         *
         * @returns {string|null}
         */
        getTemplate() {
            return document.getElementById(this.templateId).innerHTML;
        }

        /**
         *
         * @returns {Element}
         */
        getRenderNode() {
            return this.node;
        }

        /**
         *
         * @returns {Array<AbstractModel>}
         */
        getSubscribeList() {
            return [];
        }

        /**
         *
         * @param {AbstractModel} model
         */
        update(model) {
            this.render();
        }

        /**
         *
         * @returns {{}}
         */
        getTemplateParams() {
            return {};
        }

        /**
         *
         * @param {String} newHTML
         * @returns {boolean}
         */
        needRender(newHTML) {
            return this.cachedHTML !== newHTML;
        }
        
        activate() {
        
        }
        
        deactivate() {
        
        }

        /**
         *
         * @param {Array<String>} dependenciesCollection
         * @returns {Promise}
         */
        resolveDependencies(dependenciesCollection) {
            return new Promise((resolve) => {
                require(dependenciesCollection, (...resolvedDependencies) => {
                    resolve(resolvedDependencies);
                });
            });
        }
        
        render() {
            var renderHTML = dot.template(this.template)(this.getTemplateParams());
            if (!this.needRender(renderHTML)) {
                return;
            }
            this.cachedHTML = renderHTML;

            // Деактивируем обработчики на текущей View, если есть
            if (this.isActivated) {
                this.deactivate();
            }

            // Деактивируем все дочерние View
            for (var childView = 0; childView < this.childViews.length; childView++) {
                this.childViews[childView].destructor();
            }

            // Удалим ссылки на бывшие дочерние View, они больше не нужны
            this.childViews = [];
            
            // Перерисуем представление
            this.node.innerHTML = renderHTML;
            
            // Найдем хуки для отрисовки дочерних View и отрисуем их
            var childHooks = this.node.querySelectorAll('[data-view]');
            var dependenciesCollection = [];
            for (var childHook = 0; childHook < childHooks.length; childHook++) {
                var childHookClassName = childHooks[childHook].getAttribute('data-view');
                dependenciesCollection.push(childHookClassName);
            }

            // Асинхронно загрузим все зависимости
            this.resolveDependencies(dependenciesCollection).then((resolvedDependencies) => {
                resolvedDependencies.forEach((Dependency, index) => {
                    var childViewInstance = new Dependency();
                    this.childViews.push(childViewInstance);
                    childHooks[index].parentNode.replaceChild(childViewInstance.getRenderNode(), childHooks[index]);
                    childViewInstance.render();
                });

                // Активируем обработчики на текущей View
                this.activate();
                this.isActivated = true;
            });
        }
    }
    
    return AbstractView;
});
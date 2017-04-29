define([
    'AbstractView',
    'DomainModel',
    'State'
], function (
    /** AbstractView */ AbstractView,
    /** DomainModel */ DomainModel,
    /** State */ State
) {
    class PostingFormView extends AbstractView {

        getSubscribeList() {
            return [DomainModel];
        }

        activate() {
            this.submitHandler = (e) => {
                if (e.target.elements.new.value) {
                    alert('Новость опубликована!');
                }
            };

            this.node.addEventListener('submit', this.submitHandler);
        }

        deactivate() {
            this.node.removeEventListener('submit', this.submitHandler);
        }

        needRender(newHTML) {
            var param = State.getCurrentState().stateParams;
            return (param.method === 'GET' && super.needRender(newHTML)) || (param.method === 'POST');
        }
    }

    return PostingFormView;
});
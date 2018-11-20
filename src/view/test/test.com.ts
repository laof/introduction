import '@load/bootstrap';
import { RegisteredComponents, OnInit, BaseComponent } from '@serve/webengine';
import subscriber from '@src/serve/subscriber';

@RegisteredComponents({ template: require('./index.html'), style: require('./css.less') })
export class TestComponent extends BaseComponent implements OnInit {

    private subscriber = subscriber;

    onInit(): void {
        $('.test-click').click(() => {
            this.subscriber.emit('test', true);
        })
    }
    say() {
        console.log(123);
    }

}
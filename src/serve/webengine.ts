import '@load/jquery';
export interface Data {
    data(): void;
}
export interface Bind {
    bind(): void;
}
export interface OnInit {
    onInit(): void;
}
export interface OnSubscriber {
    onSubscriber(): void;
}
export interface OnDestroy {
    onDestroy(): void;
}
export interface InjectionCommentsOptions {
    template: string;
    style?: string;
}

export interface RenderingViewOptions extends InjectionCommentsOptions {
    name?: string;
    include?: any[];
    target?: string;
}
export class BaseComponent { }

interface comment {
    name: string;
    template: string;
    component: any;
}
class CoveComment {
    public comment: comment[] = [];
    add(obj: comment) {
        this.comment.push(obj)
    }
    template(name: string): string {
        for (let i = 0; i < this.comment.length; i++) {
            if (this.comment[i].name == name) {
                return this.comment[i].template;
            }
        }
        return '';
    }
    onInit() {
        this.comment.forEach((item: comment, i) => {
            const insta = new item.component();
            insta.onInit();
            insta.onSubscriber && insta.onSubscriber();
            insta.data && insta.data();
            insta.bind && insta.bind();
        })
    }
}
const coveComment: CoveComment = new CoveComment();

/**
 * 渲染视图
 *
 * @export
 * @param {RenderingViewOptions} config
 * @returns
 */
export function InjectionView(config: RenderingViewOptions) {
    return <T>(target: any, name?: string, value?: PropertyDescriptor): void => {
        const includes = config.include || [];
        const view: any = $(config.template);
        includes.forEach((target, i) => {
            const classes = target.name;
            view.find(classes).replaceWith(coveComment.template(classes));
        })
        $('#' + (config.target || 'view')).replaceWith(view);
        coveComment.onInit();
        const insta = new target();
        insta.onInit();
        insta.onSubscriber && insta.onSubscriber();
        insta.bind && insta.bind();
        insta.data && insta.data();
    }
}

/**
 * 注册组件
 *
 * @export
 * @param {InjectionCommentsOptions} config
 * @returns
 */
export function RegisteredComponents(config: InjectionCommentsOptions) {
    return <T>(target: any, name?: string, value?: PropertyDescriptor): void => {
        coveComment.add({ name: target.name, component: target, template: config.template });
    }
}



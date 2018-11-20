import '@load/bootstrap';
import '@load/swiper';
import '@static/js/owl.carousel';
import * as main from '@static/js/main';

import { OnInit, InjectionView } from '@src/serve/webengine';

declare var Swiper: any;

@InjectionView({ template: require('./index.html'), style: require('./css.less') })
export class HomeComponent implements OnInit {
    private swiper: any;
    onInit(): void {
        main.start();
        const u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('iPhone') > -1 || u.indexOf(
            'Windows Phone') > -1 || navigator.userAgent.indexOf("iPad") > -1) {
            $(".hover-bg .hover-text").css({
                'opacity': '1'
            });

            $(".hover-bg .hover-text>h4").css({
                'opacity': '1',
                '-webkit-transform': 'translateY(0)',
                'transform': 'translateY(0)'
            });

            $(".hover-bg .hover-text>i").css({
                'opacity': '1'
            });
        }

        this.swiper = new Swiper('.swiper-container', {
            autoplay: 3000,
            speed: 1000,
            autoplayDisableOnInteraction: false,
            loop: true,
            centeredSlides: true,
            slidesPerView: 3,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            onInit: function (swiper) {
                swiper.slides[3].className = "swiper-slide swiper-slide-active"; //第一次打开不要动画
            },
            breakpoints: {
                668: {
                    slidesPerView: 3
                }
            },
            onSlideChangeEnd: () => {
                const index = $('#swiper-loop').find('.swiper-slide-active').attr('data-swiper-slide-index');
                $('#text-description div:nth-child(' + (Number(index) + 1) + ')').siblings('div').removeClass('active');
                $('#text-description div:nth-child(' + (Number(index) + 1) + ')').addClass('active');
            }
        });
    }
}





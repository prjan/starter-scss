/*globals jQuery, window, document, FastClick */
$(function() {
    FastClick.attach(document.body);
});

(function ($, window, document) {
    'use strict';

    window.STARTER = window.STARTER || {
        $window: null,
        $body: null,

        init: function () {
            this.$window = $(window);
            this.$body = $('body');
            this.$header = $('.js-sec--head');

            this.headerMenuMobile();
            this.scrollTo();
            this.customSelect();
            this.popup();
        },

        /**
         * Header menu mobile
         */
        headerMenuMobile: function () {
            var that = this;

            that.$btnMenuTrigger = $('.js-btn--trigger-menu');

            // Open menu
            that.$btnMenuTrigger.on('click', function (event) {
                event.preventDefault();

                $(this).toggleClass('active');

                that.$header.toggleClass('is-menu-opened');
            });
        },

        /**
         * Scroll to
         */
        scrollTo: function () {
            var that = this;

            $('.js-scroll-to').on('click', function (event) {
                event.preventDefault();

                var $this = $(this),
                    $href = $(this).attr('href'),
                    $el = $($href),
                    $offsetElement = null,
                    offest = $(this).attr('data-offset');

                if ($el.length) {
                    $offsetElement = $el.offset().top;

                    $('html, body').animate({
                        scrollTop: $offsetElement
                    }, 600);

                    that.$header.removeClass('is-menu-opened');
                }
            });
        },

        /**
         * Custom select
         */
        customSelect: function (context) {
            var $select;

            if ($(context).length) {
                $select = $(context).find('.js-custom-select');
            } else {
                $select = $('.js-custom-select');
            }

            $select.each(function () {
                var $this = $(this);

                if ($this.length && !$this.parent().parent().find('.custom-select-outer').length) {
                    $this.wrap('<div class="custom-select-outer" />').customSelect();
                }
            });
        },

        /**
         * Popup
         */
        popup: function () {
            var $trigger = $('.js-trigger-popup-open');

            $trigger.magnificPopup({
                type: 'inline'
            });
        },
    };

    $(document).on('ready', function () {
        window.STARTER.init();
    });

}(jQuery, window, document));

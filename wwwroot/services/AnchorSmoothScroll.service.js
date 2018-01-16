(function () {
    'use strict';

    angular
        .module('services')
        .factory('AnchorSmoothScrollService', AnchorSmoothScrollService)

    AnchorSmoothScrollService.$inject = [];

    function AnchorSmoothScrollService() {
        var service = {
            ScrollTo: ScrollTo
        };

        return service;

        function ScrollTo(eID,delta=0) {

            var startY = currentYPosition();
            var stopY = elmYPosition(eID) + delta;
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 20);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for (var j = startY; j > stopY; j -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                if (self.pageYOffset) return self.pageYOffset;
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent !== document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }

        };
    }
})();

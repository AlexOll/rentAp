(function () {
    'use strict';

    angular
        .module('utilities')
        .factory('ImageUtility', ImageUtility);

    ImageUtility.$inject = [];

    function ImageUtility() {
        var service = {
            Base64ToImage: Base64ToImage
        };

        return service;

        function Base64ToImage(source) {
            var result = null;

            if (typeof source !== 'string') {
                return result;
            }

            var mime = source.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

            if (mime && mime.length) {
                result = new File([""], "", { type: mime[1] })
                result.dataURL = source;
            }

            return result;
        }
    }
})();
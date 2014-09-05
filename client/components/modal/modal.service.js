'use strict';

angular.module('yuProjectsApp')
    .factory('Modal', function ($rootScope, $modal) {
        /**
         * Opens a modal
         * @param  {Object} scope      - an object to be merged with modal's scope
         * @param  {String} modalClass - (optional) class(es) to be applied to the modal
         * @return {Object}            - the instance $modal.open() returns
         */
        function openModal(scope, modalClass) {
            var modalScope = $rootScope.$new();
            scope = scope || {};
            modalClass = modalClass || 'modal-default';

            angular.extend(modalScope, scope);

            return $modal.open({
                templateUrl: 'components/modal/modal.html',
                windowClass: modalClass,
                scope: modalScope
            });
        }

        // Public API here
        return {

            /* Confirmation modals */
            confirm: {

                /**
                 * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
                 * @param  {Function} del - callback, ran when delete is confirmed
                 * @return {Function}     - the function to open the modal (ex. myModalFn)
                 */
                delete: function (name, del) {
                    del = del || angular.noop;

                    /**
                     * Open a delete confirmation modal
                     * @param  {String} name   - name or info to show on modal
                     * @param  {All}           - any additional args are passed staight to del callback
                     */
                    return function () {
                        var deleteModal;

                        deleteModal = openModal({
                            modal: {
                                dismissable: true,
                                title: 'Confirm Delete',
                                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                                buttons: [
                                    {
                                        classes: 'btn-danger',
                                        text: 'Delete',
                                        click: function (e) {
                                            deleteModal.close(e);
                                        }
                                    },
                                    {
                                        classes: 'btn-default',
                                        text: 'Cancel',
                                        click: function (e) {
                                            deleteModal.dismiss(e);
                                        }
                                    }
                                ]
                            }
                        }, 'modal-danger');


                        deleteModal.result.then(function (event) {
                            del.apply(event);
                        });
                    }();
                }
            },

            /* Popup modals */
            popup: {

                /**
                 * Create a function to open a success  modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
                 * @param  {Function} options - and object that contains options for the modal
                 * @param  {Function} next - callback, ran when confirmed
                 * @return {Function}     - the function to open the modal (ex. myModalFn)
                 */
                success: function (options, next) {
                    next = next || angular.noop;

                    /**
                     * Open a success confirmation modal
                     * @param  {String} name   - name or info to show on modal
                     * @param  {All}           - any additional args are passed straight to next callback
                     */
                    return function () {
                        var args = Array.prototype.slice.call(arguments),
                            successModal;
                        options = options || {};

                        angular.extend(options, {
                            dismissable: true,
                            buttons: [
                                {
                                    classes: 'btn-success',
                                    text: 'Okay!',
                                    click: function (e) {
                                        successModal.dismiss(e);
                                        next.apply(event, args);
                                    }
                                }
                            ]
                        });
                        successModal = openModal(
                            {modal: options},
                            'modal-success');
                    }();
                }
            }



        };
    });

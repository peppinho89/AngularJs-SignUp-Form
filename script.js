(function () {

    var app = angular.module("validation", ["ngMessages"]);

    var RegistrationController = function () {
        var model = this;

        model.message = "";

        model.user = {
            username: "",
            password: "",
            confirmPassword: ""
        };

        model.submit = function (isValid) {
            if (isValid) {
                model.message = "Submitted " + model.user.username;
            } else {
                model.message = "There are still invalid fields";
            }
        };

    };

    var compareTo = function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    };

    var validateForm = function () {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                var inputEl = el[0].querySelector("[name]");
                var inputNgEl = angular.element(inputEl);
                var inputName = inputNgEl.attr('name');

                inputNgEl.on('change', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty)
                }

                )
            }
        }
    };

    app.directive("compareTo", compareTo);
    app.directive("validateForm", validateForm);
    app.controller("RegistrationController", RegistrationController);

}());

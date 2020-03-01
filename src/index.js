'use strict';

import isObject from "lodash/isObject";
import isEmpty from "lodash/isEmpty";
import $validations from "./helpers/validations";
import messages from "./helpers/messages";

function validate(rule, value, validations) {

    let errors = {};

    Object.entries(validations).forEach(([name, _args]) => {

        // Check if validation has [rule]: true | function type
        if (!_args) {
            throw new Error('No arguments added!')
        }

        //@ Custom input validation
        if (name === 'validate' && typeof _args === 'function') {
            const valid = _args(value);

            if (typeof valid !== 'undefined' && typeof valid === 'boolean') {

                if (!valid) {
                    errors[name] = {message: 'Invalid'};
                }
            }

        } else {

            // Get defined validators
            const getValidateType = $validations[name];

            if (typeof getValidateType === "undefined") {
                throw new Error(`"${name}" is not a validation type!`);
            }

            let isValid;

            // Function type validation
            if (typeof getValidateType === 'function') {
                isValid = getValidateType(value, _args)
            } else {
                isValid = getValidateType(value)
            }

            if (!isValid) {
                let message = messages[name];

                if (typeof message === 'function') {
                    message = message(_args);
                }
                errors[name] = {message};
            }
        }

        // Add validation errors for this rule
        if (!isEmpty(errors)) {
            this.validateErrors = this.validateErrors || {};
            this.validateErrors[rule] = errors;
            return;
        }

        // Reset validations for rule/rules
        if (this.validateErrors) {

            if (this.validateErrors[rule]) {
                delete this.validateErrors[rule];
            }

            if (isEmpty(this.validateErrors)) {
                // We set the value to null, all errors are cleared and the form is touched
                this.validateErrors = null;
            }
        }
    });

}

const install = (Vue, _opts = {}) => {

    Vue.mixin({
        created() {
            const $validations = this.$options.validations;

            if ($validations) {
                Object.keys($validations || {}).forEach(rule => {

                    const validateObj = $validations[rule];

                    if (!isObject(validateObj) || typeof validateObj === "undefined") {
                        throw new Error('Invalid type!')
                    }

                    this.$watch(rule, value => {
                        validate.call(this, rule, value, validateObj)
                    });
                })
            }
        },
        computed: {
            $validate() {

                if (typeof this.$options.validations === "undefined") {
                    throw new Error('validations obj is missing on your component!');
                }

                return {
                    setError: $validations => {
                        /**
                         * @usage Can be used even on an API call to set errors based on field
                         * $validation: {
                         *   your_model_property: {
                         *       your_validations: true | false
                         *   }
                         * }
                         *
                         * @example {name: {required: true, ...}, email: {email: true}}
                         */
                        Object.keys($validations || {}).forEach(rule => {

                            const validateObj = $validations[rule];

                            if (!isObject(validateObj) || typeof validateObj === "undefined") {
                                throw new Error('Invalid type!')
                            }

                            const ruleValue = this[rule]; // this scope, refers to Vue instance

                            validate.call(this, rule, ruleValue, validateObj);
                        });
                    },
                    hasError: rule => {
                        /**
                         * @info Check for errors on a type field
                         */
                        if (!this.validateErrors || typeof this.validateErrors === "undefined") return false;

                        const error = this.validateErrors[rule];

                        if (typeof error === "undefined" || !error) return false;

                        const _error = {};

                        _error[Object.entries(error)[0][0]] = Object.entries(error)[0][1];

                        return _error;
                    },
                    isValid: () => {
                        /**
                         * @info this.validateErrors is null when no errors, on first init, type is undefined
                         */
                        if (this.validateErrors === undefined) {
                            this.$validate.setError(this.$options.validations);
                            return false;
                        }
                        return this.validateErrors === null;
                    }
                }
            },
        },
        data() {
            return {
                validateErrors: undefined
            }
        },
    });
};

export default {
    install
};

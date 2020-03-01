'use strict';

import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";

const email = (value) => {
    return /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(value);
};

const minLength = (value, length) => {
    if (!isNumber(length)) return false;

    return value.length >= Number(length)
};

const required = (value) => {

    if (value && typeof value !== "undefined") {
        value = value.toString()
    }

    if (isString(value)) {
        value = value.trim()
    }

    return !isEmpty(value);
};

export default {
    required,
    email,
    minLength
}

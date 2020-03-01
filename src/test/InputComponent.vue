<template>
    <div id="app">
        <form @submit.prevent="submit" novalidate class="form__wrapper">
            <div class="input-group">
                <label>Text</label>
                <input type="text" v-model="text">
                <div class="errors" v-if="$validate.hasError('text')">
                    <span v-if="$validate.hasError('text').required">
                        {{$validate.hasError('text').required.message}}
                    </span>
                    <span v-if="$validate.hasError('text').minLength">
                        {{$validate.hasError('text').minLength.message}}
                    </span>
                    <span v-if="$validate.hasError('text').validate">
                        Value must be '123'
                    </span>
                </div>
            </div>
            <div class="input-group">
                <label>Email</label>
                <input type="text" v-model="email">
                <div class="errors" v-if="$validate.hasError('email')">
                    <span v-if="$validate.hasError('email').required">
                        Required
                    </span>
                    <span v-if="$validate.hasError('email').email">
                        Invalid email
                    </span>
                </div>
            </div>
            <button type="submit">Submit</button>

            <div class="form-status" v-if="isReady">
                Form submitted!
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: '',
                email: '',
                isReady: false
            }
        },
        validations: {
            text: {
                required: true,
                minLength: 3,
                validate: (value) => value === '123'
            },
            email: {
                required: true,
                email: true,
            }
        },
        methods: {
            submit() {
                if (this.$validate.isValid()) {
                    this.isReady = true;
                    // your turn now... :)
                }
            }
        }
    }
</script>
<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');

    *, ::after, ::before {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    body {
        background: #f2f3f8;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    button {
        display: inline-block;
        background-color: #5d78ff;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        padding: .65rem 1rem;
        border-radius: 6px;
        border: none;
        outline: none;
    }

    .form__wrapper {
        max-width: 450px;
        margin: 0 auto;
        box-shadow: 0 0 13px 0 rgba(82, 63, 105, .05);
        background-color: #fff;
        padding: 20px;

        .input-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }

        input {
            display: block;
            width: 100%;
            border: 1px solid #e2e5ec;
            border-radius: 6px;
            padding: 8px;
            height: 32px;
            outline: none;
        }

        .errors {
            display: block;
            margin-top: 5px;

            span {
                display: block;
                color: #F44336;
                font-size: 13px;
                font-weight: 300;
            }
        }

        .form-status {
            margin-top: 20px;
            color: #4CAF50;
            border: 1px solid;
            padding: 10px;
        }
    }
</style>
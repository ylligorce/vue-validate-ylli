
# vue-validate-ylli

## Installation

```bash
npm install vue-validate-ylli --save
```

Import the library and use as a Vue plugin

```javascript
import Vue from 'vue'
import VueValidateYlli from 'vue-validate-ylli'
Vue.use(VueValidateYlli)
```

## Basic usage

```javascript
<script>
new Vue({
	data () {
             return {
                text: '',
                email: ''
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
             submit () {
                 if (this.$validate.isValid()) {
                     //Your logic ...
                 }
             }
	 }
})
</script>
<template>
    <input type='text' v-model='text' />
    <div v-if="$validate.hasError('text')">
        <span v-if="$validate.hasError('text').required"> 
                {{$validate.hasError('text').required.message}}
        </span>	    
        <span v-if="$validate.hasError('text').minLength">
                Must have 3 characters
        </span>
        <span v-if="$validate.hasError('text').validate">
            Value must be '123'
        </span>
    </div>
</template>

```
## Rules

 - required
> 	Boolean true | false
 - email
> 	Boolean true | false
 - minLength
> 	Number
 - validate
> 	Function (value) => return boolean (true | false) based on a condition

## Dev

Test
```bash
npm run serve
```

Build
```bash
npm run build
```
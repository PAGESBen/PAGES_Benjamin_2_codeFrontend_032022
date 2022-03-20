<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
            >
                <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="input-2"
            description="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
            >
                <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-link href="#">Je n'ai pas encore de compte</b-link>
        </b-form>
    </div>
</template>

<script>
    export default {
        name : 'LoginForm',
        data() {
            return {
                form: {
                    email: '',
                    password:''
                },
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                JSON.stringify(this.form)
            },
        }
    }
</script>
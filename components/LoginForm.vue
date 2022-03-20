<template>
    <b-row>
        <b-col  md='6'>
            <b-form @submit="onSubmit">
                <b-form-group
                id="email"
                label="Email address:"
                label-for="email"
                >
                    <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                id="password"
                label="Password:"
                label-for="password"
                >
                    <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-link href="#">Je n'ai pas encore de compte</b-link>
            </b-form>
        </b-col>
    </b-row>
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
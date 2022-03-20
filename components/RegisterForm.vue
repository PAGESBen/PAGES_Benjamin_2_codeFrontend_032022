<template>
    <b-row>
        <b-col  md='6'>
            <b-form @submit="onSubmit">

                <b-form-group
                id="firstname"
                label="Fisrt Name:"
                label-for="firstname"
                >
                    <b-form-input
                    id="firstname"
                    v-model="form.firstname"
                    type="text"
                    placeholder="Jeremy"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                id="lastname"
                label="Last Name:"
                label-for="lastname"
                >
                    <b-form-input
                    id="lastname"
                    v-model="form.lastname"
                    type="text"
                    placeholder="Zunino"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                id="position"
                label="Position:"
                label-for="position"
                >
                    <b-form-input
                    id="position"
                    v-model="form.position"
                    type="text"
                    placeholder="Développeur Web"
                    required
                    ></b-form-input>
                </b-form-group>                

                <b-form-group
                id="email"
                label="Email address:"
                label-for="email"
                description="We'll never share your email with anyone else."
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
                description="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
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
                <b-link href="#">J'ai déjà un compte</b-link>
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
                    firstname: '',
                    lastname: '',
                    email: '',
                    password:'',
                    position: '',
                },
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                console.log(JSON.stringify(this.form))
            },
        }
    }
</script>
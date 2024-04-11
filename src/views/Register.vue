<template>
  <main>
    <div class="nav">
        <h2 style="margin: 5px;display: inline-block;">TODO app</h2><i class="fa-regular fa-circle-check fa-lg" style="display: inline-block;"></i>
        <div class="line"></div>
    </div>
    <div class="modal">
        <h2 style="filter: drop-shadow(1px 1px 5px #000000);padding-top: 1rem;align-self: center;">Regisztráció</h2>
            <div style="padding-top: 1rem;align-self: center;width: 75%;">
                <h3>Név</h3>
                <div class="inputdiv"><input id="nameinput"></input></div>
            </div>
            <div style="padding-top: 1rem;align-self: center;width: 75%;">
                <h3>Email cím</h3>
                <div class="inputdiv"><input type="email" required id="emailinput"></input></div>
            </div>
            <div style="padding-top: 1rem;align-self: center;width:75%;">
                <h3>Jelszó</h3>
                <div class="inputdiv"><input type="password" required id="pwinput"></input></div>
            </div>
            <div style="padding-top: 1.5rem;align-self: center;">
                <button class="loginbtn" @click="register()">Regisztráció</button>
                <p style="padding-top: 3.5rem;">Van már fiókja? <a href="/webtech/">Jelentkezzen be!</a></p>
            </div>
            <div class="regtext">
                
            </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            name: ''
        }
    },
    methods: {
        register() {
          let email = document.getElementById('emailinput').value
          let password = document.getElementById('pwinput').value
          let name = document.getElementById('nameinput').value
            const response = fetch('https://api.fightman01bot.hu:5849/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                    name: name
                })
            })
            .then(response => {
                if (response.status === 200) {
                    this.$router.push('/')
                } else {
                    console.log('Sikertelen regisztráció!')
                }
            })
        }
    }
}
</script>

<style scoped>
    .line {
        width: 100%;
        height: 1px;
        background-color: #e9ecef;
    }
    .modal {
        background-color: #585858;
        border-radius: 15px;
        height: 28em;
        width: 30em;
        top: 50%; right: 50%;
        transform: translate(50%, -50%);
        display: flex;
        flex-direction: column;
        position: absolute;
        filter: drop-shadow(1px 1px 5px #000000);
    }
    .inputdiv {
        background-color: #2E2E2E;
        border-radius: 5px;
        height: 2.5rem;
        position: relative;
    }
    input {
        background-color: transparent;
        color: white;
        border: none;
        width: 100%;
        height: 2.5rem;
        font-size: 1.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        position: relative;
        
    }
    input:focus {
        outline: none;
    }
    .loginbtn {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        right:50%;
        transform: translate(50%);
        position: absolute;
        font-size: 1rem;
    }
    a:visted {
        color: blue;
    }
    body {
        overflow: hidden;
    }
</style>
<template>
  <main>
    <div class="nav">
        <h2 style="margin: 5px;display: inline-block;">TODO app</h2><i class="fa-regular fa-circle-check fa-lg" style="display: inline-block;"></i>
        <div class="line"></div>
    </div>
    <div class="modal">
        <h2 style="filter: drop-shadow(1px 1px 5px #000000);padding-top: 1rem;align-self: center;">Bejelentkezés</h2>
            <div style="padding-top: 1rem;align-self: center;width: 75%;">
                <h3>Felhasználónév</h3>
                <div class="inputdiv"><input type="email" id="emailinput" @keydown.enter="login()" required></input></div>
            </div>
            <div style="padding-top: 1rem;align-self: center;width:75%;">
                <h3>Jelszó</h3>
                <div class="inputdiv"><input type="password" id="pwinput" @keydown.enter="login()" required></input></div>
            </div>
            <div style="padding-top: 1.5rem;align-self: center;">
                <button class="loginbtn" @click="login()">Bejelentkezés</button>
                <p style="padding-top: 3.5rem;">Nincs még fiókja? <a href="register">Regisztráljon!</a></p>
            </div>
            <div class="regtext">
                
            </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Login',
  created() {
    if (localStorage.getItem("token")) {
        return this.$router.push("/todos");
    }
  },
  methods: {
    login() {
        let email = document.getElementById('emailinput').value;
        let pw = document.getElementById('pwinput').value;
        fetch('https://api.fightman01bot.hu:5849/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: pw
            })
        }).then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    localStorage.setItem('token', data.token);
                });
                setTimeout(() => {
                    this.$router.push('/todos');
                }, 500);
            } else {
                alert('Hibás email cím vagy jelszó!');
            }
        });
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
        width: 30em;
        height: 23em;
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
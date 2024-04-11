<template >
  <main>
    <div class="nav">
        <h2 style="margin: 5px;display: inline-block;">TODO app</h2><i class="fa-regular fa-circle-check fa-lg" style="display: inline-block;"></i>
        <button class="logoutbtn" @click="logout()">Kijelentkezés</button>
        <div class="line"></div>
    </div>
        <div style="width: 100%;display:flex;justify-content: center;padding-top: 2em;">
            <div class="inputdiv"><input placeholder="Elem hozzáadása" id="eleminput" @keydown.enter="ujelem()" @input="search_in_todo_table()"></input></div><div class="pluszdiv" @click="test()"><i class="fa-solid fa-plus fa-2x" id="plusicon"></i></div>
        </div>
    <div class="modal">
        <table id="todotable" cellpadding="0">
            <tr v-for="item in todos.todos" v-bind:key="item.id">
                <td style="width: 8%;" v-if="!item.kesz"><button style="background-color: transparent;border: 0;" @click="setkesz(item.id, true)"><i class="fa-regular fa-circle-check fa-2x" style="color: black;cursor:pointer;"></i></button></td>
                <td style="width: 8%;" v-if="item.kesz"><button style="background-color: transparent;border: 0;" @click="setkesz(item.id, false)"><i class="fa-regular fa-circle-check fa-2x" style="color: #009206;cursor:pointer;"></i></button></td>
                <td style="font-size: 1.5em;overflow: scroll;max-width: 400px;border-bottom: 1px solid white;" v-if="!item.kesz"><p style="width: 95%;overflow: scroll;max-width: 95%;" id="todoszoveg">{{ item.szoveg }}</p></td>
                <td style="font-size: 1.5em;overflow: scroll;max-width: 400px;border-bottom: 1px solid white;" v-if="item.kesz"><p style="width: 95%;overflow: scroll;max-width: 95%;text-decoration: line-through;" id="todoszoveg">{{ item.szoveg }}</p></td>
                <td style="right: 0;position: relative;height: 39px;border-bottom: 1px solid white;padding-bottom: 10px;width: 15%;">
                    <div style="display: flex; justify-content: space-evenly;width: 100%;top:31%;position:relative;">
                        <button style="background-color: transparent;border: 0;" @click="showtodo(item.id)"><i class="fa-solid fa-eye fa-lg" style="color: white;cursor:pointer;"></i></button><button style="background-color: transparent;border: 0;" @click="edit_item(item.id)"><i class="fa-solid fa-pen fa-lg" style="color:#3E69FF;cursor:pointer;"></i></button><button @click="deleteTodo(item.id)" style="background-color: transparent;border: 0;"><i class="fa-solid fa-trash fa-lg" style="color: red;cursor:pointer;"></i></button>
                    </div>
                </td>
            </tr>        
        </table>
    </div>
    <div class="blurbg">
        <div class="addmodal">
            <div style="align-self: flex-start;z-index: 1;padding-top: 1rem;"><h1>Új listaelem</h1></div>
            <div class="popuptartalom">
                <div style="padding-top: 1rem;align-self: center;width: 90%;">
                    <h3>Megnevezés</h3>
                    <div class="inputdiv-popup"><input id="megnevezesinput"></input></div>
                </div>
                <div style="padding-top: 1rem;align-self: center;width: 90%;">
                    <h3 style="position: relative;">Címkék</h3>
                    <div class="cimkediv">
                        <div class="cimke" :class="cimkek.includes(cimke.id) ? 'selected_cimke' : ''" :style="{ 'background-color': cimke.color, 'color' : get_contrast(cimke.color) }" @click="add_cimke(cimke.id)" v-for="cimke in apicimkek.cimkek">{{ cimke.nev }} <button style="background-color: transparent;border: 0;font-size: 1rem;" :style="{ 'color' : get_contrast(cimke.color) }" @click="delete_cimke(cimke.id)"><i class="fa-solid fa-circle-minus"></i></button></div>
                        <!-- <div class="cimke" style="background-color: orange;" @click="add_cimke('Címke 2')">Címke2</div>
                        <div class="cimke" style="background-color: green;" @click="add_cimke('Címke 3')">Címke3</div>
                        <div class="cimke" style="background-color: blue;" @click="add_cimke('Címke 4')">Címke4</div> -->
                        <div class="ujcimkeinput"><input id="ujcimke" placeholder="Új címke" @keydown.enter="save_cimke()"></input></div>
                    </div>
                    <div class="cimkediv2">
                    <div v-if="!showmodal" class="cimke" :style="{ 'background-color': apicimkek.cimkek.filter(item => item.id == cimkeid)[0].color, 'color' : get_contrast_by_id(cimkeid) }" v-for="cimkeid in cimkek" style="cursor: default;">{{ apicimkek.cimkek.filter(item => item.id == cimkeid)[0].nev }}</div>
                    </div>
                </div>
                <div style="padding-top: 1rem;align-self: center;width: 90%;">
                    <h3>Személy</h3>
                    <div class="inputdiv-popup"><input id="szemelyinput"></input></div>
                </div>      
            </div>
            <div class="gombok">
                <button @click="closemodal()" class="cancelbtn">Mégse</button><button class="savebtn" @click="saveTodo()">Mentés</button>
            </div>
        </div>
    </div>
    <div class="showmodal" @click="closeshowmodal()">
    
      <div class="showmodal-content">
        <div class="showmodal-header">
          <span class="close" @click="closeshowmodal()">&times;</span>
          <h2 id="showmodalszoveg"></h2>
        </div>
        <div class="modal-body" style="flex-wrap: wrap;display:flex;">
          <i class="fa-solid fa-person fa-2x" style="margin-top: 0.5rem;margin-left: 0.5rem;"></i><p id="showmodalszemely" style="margin-left: 1rem;font-size: 1.5rem;"></p>
        </div>
        <div class="modal-cimke" style="display: flex;flex-wrap: wrap;" v-if="cimkek.length > 0">
          <i class="fa-solid fa-tag fa-2x" style="margin-top: 0.5rem;margin-left: 0.5rem;"></i><div class="cimke" :style="{ 'background-color': cimke.color, 'color' : get_contrast(cimke.color) }" style="margin-top: 0.5rem;margin-left: 0.5rem;position: relative;margin-bottom: 0.5rem;cursor: default;" v-for="cimke in cimkek" v-if="showmodal">{{ cimke.nev }}</div>
        </div>
      </div>
    
    </div>
  </main>
</template>

<script>
    export default {
      name: "Todos",
      data() {
        return {
          todos: [],
          cimkek: [],
          apicimkek: [],
          showmodal: false
        }
      },
      created() {
        if (!localStorage.getItem("userid")) {
            this.$router.push("/");
        }
        this.$watch(
          () => this.$route.params.id,
          this.fetchData,
          { immediate: true }
        )
      },
      methods: {
        delete_cimke(cimkeid) {
          fetch("https://api.fightman01bot.hu:5849/delete_cimke", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  id: cimkeid,
                  userid: localStorage.getItem("userid")
              })
          })
          .then(response => response.json())
          .then(data => {
              this.apicimkek = data
              this.cimkek = this.cimkek.filter(item => item !== cimkeid);
          })
        },
        get_contrast(hexcolor) {
          if (!hexcolor.includes("#")) {
            return "white";
          }
          var r = parseInt(hexcolor.substring(1,3),16);
          var g = parseInt(hexcolor.substring(3,5),16);
          var b = parseInt(hexcolor.substring(5,7),16);
          var yiq = ((r*299)+(g*587)+(b*114))/1000;
          return (yiq >= 128) ? 'black' : 'white';
        },
        get_contrast_by_id(cimke_id) {
          var hexcolor = this.apicimkek.cimkek.filter(item => item.id == cimke_id)[0].color;
          if (!hexcolor.includes("#")) {
            return "white";
          }
          var r = parseInt(hexcolor.substring(1,3),16);
          var g = parseInt(hexcolor.substring(3,5),16);
          var b = parseInt(hexcolor.substring(5,7),16);
          var yiq = ((r*299)+(g*587)+(b*114))/1000;
          return (yiq >= 128) ? 'black' : 'white';
        },
        save_cimke() {
          fetch("https://api.fightman01bot.hu:5849/add_cimke", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  nev: document.getElementById("ujcimke").value,
                  userid: localStorage.getItem("userid")
              })
          })
          .then(response => response.json())
          .then(data => {
              this.apicimkek = data
              document.getElementById("ujcimke").value = ""
          });
          },
        search_in_todo_table() {
          let input, szovegek, filter;
          input = document.getElementById("eleminput");
          filter = input.value.toUpperCase();
          if (filter === "") {
            szovegek = document.querySelectorAll("#todoszoveg");
            for (let i = 0; i < szovegek.length; i++) {
              szovegek[i].parentElement.parentElement.style.display = "";
            }
            return;
          }
          szovegek = document.querySelectorAll("#todoszoveg");
          for (let i = 0; i < szovegek.length; i++) {
            if (szovegek[i].innerText.toUpperCase().indexOf(filter) > -1) {
              szovegek[i].parentElement.parentElement.style.display = "";
            } else {
              szovegek[i].parentElement.parentElement.style.display = "none";
            }
          }
        },
        add_cimke(cimkenev) {
          if (!this.cimkek.includes(cimkenev)) {
            this.cimkek.push(cimkenev);
          } else {
            this.cimkek.splice(this.cimkek.indexOf(cimkenev), 1);
          }
        },
        showtodo(todoID) {
          this.showmodal = true;
          let modal = document.querySelector('.showmodal');
          let todo = this.todos.todos.find(todo => todo.id === todoID);
          this.cimkek = this.apicimkek.cimkek.filter(cimke => todo.cimkeid.includes(cimke.id));
          document.querySelector('#showmodalszoveg').innerText = todo.szoveg;
          document.querySelector('#showmodalszemely').innerText = todo.szemely;
          if (todo.kesz) {
            document.querySelector('.showmodal-header').style.backgroundColor = 'green';
          } else {
            document.querySelector('.showmodal-header').style.backgroundColor = '#3E69FF';
          }
          modal.style.display = 'block';
        },
        closeshowmodal() {
          let modal = document.querySelector('.showmodal');
          this.cimkek = [];
          modal.style.display = 'none';
          this.showmodal = false;
        },
        fetchData() {
          fetch("https://api.fightman01bot.hu:5849/get_todos?userid=" + localStorage.getItem("userid"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
              this.todos = data;
            });
          fetch("https://api.fightman01bot.hu:5849/get_cimkek?userid=" + localStorage.getItem("userid"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
              this.apicimkek = data;
            });
          },
        ujelem() {
            document.querySelector('.blurbg').style.display = 'flex';
            document.querySelector('#megnevezesinput').value = document.querySelector('#eleminput').value
            document.querySelector('#megnevezesinput').focus()
        },
        closemodal: function closemodal() {
            document.querySelector('.blurbg').style.display = 'none';
            this.cimkek = [];
            document.querySelector('#eleminput').value = '';
            document.querySelector('#megnevezesinput').value = '';
            document.querySelector('#szemelyinput').value = '';
            document.querySelector('.savebtn').id = '';
            let szovegek = document.querySelectorAll("#todoszoveg");
            for (let i = 0; i < szovegek.length; i++) {
              szovegek[i].parentElement.parentElement.style.display = "";
            }
        },
        saveTodo() {
          let savebtn = document.querySelector('.savebtn');
          if (!savebtn.id) {
            fetch("https://api.fightman01bot.hu:5849/add_todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    szoveg: document.querySelector('#megnevezesinput').value,
                    cimkek: this.cimkek,
                    szemely: document.querySelector('#szemelyinput').value,
                    kesz: false,
                    userid: localStorage.getItem("userid")
                })
            })
            .then(response => response.json())
            .then(data => {
                this.todos = data;
                this.cimkek = [];
                document.querySelector('.blurbg').style.display = 'none';
                document.querySelector('#eleminput').value = '';
                document.querySelector('#eleminput').value = '';
                document.querySelector('#megnevezesinput').value = '';
                document.querySelector('#szemelyinput').value = '';
                let szovegek = document.querySelectorAll("#todoszoveg");
                for (let i = 0; i < szovegek.length; i++) {
                  szovegek[i].parentElement.parentElement.style.display = "";
                }
            });
          } else {
            fetch("https://api.fightman01bot.hu:5849/edit_todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: savebtn.id,
                    szoveg: document.querySelector('#megnevezesinput').value,
                    cimkek: this.cimkek,
                    szemely: document.querySelector('#szemelyinput').value,
                    kesz: false,
                    userid: localStorage.getItem("userid")
                })
            })
            .then(response => response.json())
            .then(data => {
                this.todos = data;
                this.cimkek = [];
                document.querySelector('.blurbg').style.display = 'none';
                document.querySelector('.savebtn').id = '';
                document.querySelector('#eleminput').value = '';
                document.querySelector('#megnevezesinput').value = '';
                document.querySelector('#szemelyinput').value = '';
                let szovegek = document.querySelectorAll("#todoszoveg");
                for (let i = 0; i < szovegek.length; i++) {
                  szovegek[i].parentElement.parentElement.style.display = "";
                }
            });
          }

        },
        deleteTodo(todoID) {
            fetch("https://api.fightman01bot.hu:5849/delete_todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: todoID,
                    userid: localStorage.getItem("userid")
                })
            })
            .then(response => response.json())
            .then(data => {
                this.todos = data;
            });
        },
        setkesz(todoID, allapot) {
            fetch("https://api.fightman01bot.hu:5849/set_kesz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: todoID,
                    kesz: allapot,
                    userid: localStorage.getItem("userid")
                })
            })
            .then(response => response.json())
            .then(data => {
                this.todos = data;
            });
        },
        logout() {
            localStorage.removeItem("userid");
            this.$router.push("/");
        },
        edit_item(todoID) {
          document.querySelector('.blurbg').style.display = 'flex';
          document.querySelector('#megnevezesinput').value = this.todos.todos.find(x => x.id === todoID).szoveg
          document.querySelector('#megnevezesinput').focus()
          document.getElementById('szemelyinput').value = this.todos.todos.find(x => x.id === todoID).szemely
          document.querySelector('.savebtn').id = todoID
          this.cimkek = this.todos.todos.find(x => x.id === todoID).cimkeid
        }
      }
    }

</script>

<style scoped>
    @keyframes animateblur {
    from {opacity: 0}
    to {opacity: 1}
    }
    p::-webkit-scrollbar {
        display: none;
    }
    td::-webkit-scrollbar {
        display: none;
    }
    .popuptartalom::-webkit-scrollbar {
        display: none;
    }
    .cimkediv2 {
        border-radius: 5px;
        height: fit-content;
        position: relative;
        display:inline-block;
        width: 75%;
        justify-self: center;
        display: flex;
        left: 15%;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .cimke {
        background-color: #3E69FF;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        height: fit-content;
        width: fit-content;
        padding-left: 0.8rem;
        padding-right: 0.8rem;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        font-size: 1.2em;
    }
    .gombok {
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: right;
        padding-right: 1rem;
        bottom: 0;
        padding-bottom: 1rem;
    }
    .savebtn {
        background-color: green;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 1.2em;
    }
    .cancelbtn {
        background-color: #FF3E3E;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 1.2em;
        margin-right: 0.8rem;
    }
    .popuptartalom {
        position: absolute;
        /* top: 10%;
        left: 50%;
        transform: translate(-50%, 0%); */
        align-self: center;
        width: 75%;
        height: 70%;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        overflow:scroll;
        max-height: 100%;
    }
    table {
        align-self: center;
        width: 40em;
        padding-top: 1rem;
        border-spacing: 0px 0.5rem;
        padding-bottom: 20px;
        max-width: 70%;
    }
    .line {
        width: 100%;
        height: 1px;
        background-color: #e9ecef;
    }
    .line_table {
        width: 100%;
        height: 1px;
        background-color: #e9ecef;
        position: absolute;
        display: flex;
    }
    .cimkediv {
        background-color: #3D3D3D;
        border-radius: 5px;
        height: fit-content;
        position: relative;
        display:inline-block;
        width: 75%;
        justify-self: center;
        display: flex;
        left: 15%;
        flex-wrap: wrap;
        align-content: flex-start;
        min-height: 10rem;
    }
    .ujcimkeinput {
        background-color: #828282;
        border-radius: 5px;
        height: 2em;
        position: relative;
        display:inline-block;
        width: 10em;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
    }
    #ujcimke {
        background-color: transparent;
        color: white;
        border: none;
        height: 30px;
        font-size: 1.2rem;
        padding-left: 0rem;
        padding-right: 0rem;
        padding-top: 0rem;
        position: relative;
        width: 100%;
    }
    #ujcimke::placeholder {
        color: white;
    }
    .blurbg{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(57,53,53,0.4);
        backdrop-filter: blur(5px);
        display: none;
        animation-name: animateblur;
        animation-duration: 0.5s;
    }
    .addmodal {
        background-color: #585858;
        z-index: 1;
        border-radius: 15px;
        height: 70%;
        width: 60em;
        top: 50%; right: 50%;
        transform: translate(50%, -50%);
        display: flex;
        flex-direction: row;
        position: absolute;
        max-width: 80%;
        align-items: center;
        justify-content: center;
    }
    .modal {
        background-color: #585858;
        border-radius: 15px;
        height: fit-content;
        width: 50em;
        top: 50%; right: 50%;
        transform: translate(50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        overflow: scroll;
        max-width: 80%;
    }
    .modal::-webkit-scrollbar {
        display: none;
    }
    .logoutbtn {
        background-color: red;
        color: white;
        border: none;
        padding: 8px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
        right: 0.2em;
        position: absolute;
    }
    .inputdiv {
        background-color: #2E2E2E;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        height: 3rem;
        position: relative;
        margin-left: 0.5rem;
        display:inline-block;
        width: 25em;
        max-width: 75%;
    }
    .inputdiv-popup {
        background-color: #2E2E2E;
        border-radius: 5px;
        height: 3rem;
        position: relative;
        display:inline-block;
        width: 100%;
    }
    .pluszdiv {
        background-color: #3E69FF;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        height: 3rem;
        width: 3.5rem;
        position: relative;
        cursor: pointer;
        min-width: 2.5rem;
    }
    input {
        background-color: transparent;
        color: white;
        border: none;
        width: 100%;
        height: 3rem;
        font-size: 1.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        position: relative;
        
    }
    input:focus {
        outline: none;
    }
    #plusicon {
        top: 50%;
        right: 50%;
        transform: translate(45%, -50%);
        position: absolute;
    }
    .elemhozza {
        display: flex;
        max-width: 80%;
        width: 35em;
    }
    body {
        overflow: hidden;
    }
    .showmodal {
      display: none;
      position: fixed;
      z-index: 1;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto; 
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4); 
    }
    
    .showmodal-content {
      position: relative;
      background-color: #585858;
      margin: auto;
      padding: 0;
      border: 1px solid #888;
      max-width: 80%;
      width: 30em;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      -webkit-animation-name: animatetop;
      -webkit-animation-duration: 0.4s;
      animation-name: animatetop;
      animation-duration: 0.4s;
    }
    
    @-webkit-keyframes animatetop {
      from {top:300px; opacity:0} 
      to {top:0; opacity:1}
    }
    
    @keyframes animatetop {
      from {top:300px; opacity:0}
      to {top:0; opacity:1}
    }
    
    .close {
      color: white;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
    
    .showmodal-header {
      padding: 2px 16px;
      background-color: #3E69FF;
      color: white;
    }
    
    .showmodal-body {padding: 2px 16px;}
</style>
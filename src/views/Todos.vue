<template >
  <main>
    <div class="nav">
        <h2 style="margin: 4px;display: inline-block;">TODO app</h2><i class="fa-regular fa-circle-check fa-lg" style="display: inline-block;"></i>
        <div class="udvuser">Üdv, {{ login_name }}!</div>
        <button class="logoutbtn" @click="logout()">Kijelentkezés</button>
        <div class="line"></div>
    </div>
    <div class="oldaltartalom">
        <div style="width: 100%;display:flex;justify-content: center;padding-top: 2em;">
            <div class="inputdiv"><input placeholder="Elem hozzáadása" id="eleminput" @keydown.enter="ujelem()" @input="search_in_todo_table()"></input></div><div class="pluszdiv" @click="ujelem()"><i class="fa-solid fa-plus fa-2x" id="plusicon"></i></div>
        </div>
        <div class="taboktable">
            <table class="tabok">
                <tr>
                    <td class="szurestab-empty"></td>
                    <td class="selectedtab" @click="selected_tab('all')" id="all_tab">Összes</td>
                    <td class="szurestab" @click="selected_tab('done')" id="done_tab">Kész</td>
                    <td class="szurestab" @click="selected_tab('active')" id="active_tab">Aktív</td>
                    <td class="szurestab" @click="selected_tab('soon')" id="soon_tab">Közelgő</td>
                    <td class="szurestab" @click="selected_tab('cimke')" id="cimke_tab">Címke alapján</td>
                    <td class="szurestab-empty"></td>
                </tr>
            </table>
        </div>
    
        <div class="modal">
            <table id="todotable" cellpadding="0" v-if="show_todos.todos.length > 0 && !shownincstalalat">
                <tr v-for="item in show_todos.todos" v-bind:key="item.id">
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
            <h2 style="color: white;align-self: center;" v-if="show_todos.todos.length == 0 || shownincstalalat">Nincs feljegyzés!</h2>
        </div>
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
                        <div class="cimke" style="background-color: #828282;cursor: default;width: 10em;"><input id="ujcimke" placeholder="Új címke" @keydown.enter="save_cimke()"></input></div>
                    </div>
                    <div class="cimkediv2">
                    <div v-if="!showmodal" class="cimke" :style="{ 'background-color': apicimkek.cimkek.filter(item => item.id == cimkeid)[0].color, 'color' : get_contrast_by_id(cimkeid) }" v-for="cimkeid in cimkek" style="cursor: default;">{{ apicimkek.cimkek.filter(item => item.id == cimkeid)[0].nev }}</div>
                    </div>
                </div>
                <div style="padding-top: 1rem;align-self: center;width: 90%;">
                    <h3>Személy</h3>
                    <div class="inputdiv-popup"><input id="szemelyinput"></input></div>
                </div>
                <div style="padding-top: 1rem;align-self: center;width: 90%;">
                    <h3>Időpont</h3>
                    <VueDatePicker v-model="date" :format="datumforma" :enable-time-picker="false" :min-date="new Date()"/>
                </div>
                <div style="padding-top: 1rem;align-self: center;width: 90%;">
                    <h3>Helyszín</h3>
                    <div class="inputdiv-popup"><input id="helyszininput"></input></div>
                </div>
            </div>
            <div class="gombok">
                <button @click="closemodal()" class="cancelbtn">Mégse</button><button class="savebtn" @click="saveTodo()">Mentés</button>
            </div>
        </div>
    </div>
    <div class="blurbg_cimke">
    <div class="addmodal_cimke">
        <div style="align-self: flex-start;z-index: 1;padding-top: 1rem;"><h1>Címke kiválasztása</h1></div>
        <div class="popuptartalom">
            <div style="padding-top: 1rem;align-self: center;width: 90%;">
                <h3 style="position: relative;">Címkék</h3>
                <div class="cimkediv">
                    <div class="cimke" :class="cimkek.includes(cimke.id) ? 'selected_cimke' : ''" :style="{ 'background-color': cimke.color, 'color' : get_contrast(cimke.color) }" @click="add_filter_cimke(cimke.id)" v-for="cimke in apicimkek.cimkek">{{ cimke.nev }}</div>
                    <!-- <div class="cimke" style="background-color: orange;" @click="add_cimke('Címke 2')">Címke2</div>
                    <div class="cimke" style="background-color: green;" @click="add_cimke('Címke 3')">Címke3</div>
                    <div class="cimke" style="background-color: blue;" @click="add_cimke('Címke 4')">Címke4</div> -->
                </div>
                <div class="cimkediv2" style="margin-bottom: 1rem;">
                <div v-if="!showmodal" class="cimke" :style="{ 'background-color': apicimkek.cimkek.filter(item => item.id == cimkeid)[0].color, 'color' : get_contrast_by_id(cimkeid) }" v-for="cimkeid in filter_cimkek" style="cursor: default;">{{ apicimkek.cimkek.filter(item => item.id == cimkeid)[0].nev }}</div>
                </div>
            </div>
        </div>
        <div class="gombok">
            <button @click="closecimkemodal()" class="cancelbtn">Mégse</button><button class="savebtn" @click="update_show_todos()">Mentés</button>
        </div>
    </div>
    </div>
    <div class="showmodal" @click="closeshowmodal()">
    
      <div class="showmodal-content">
        <div class="showmodal-header">
          <span class="close" @click="closeshowmodal()">&times;</span>
          <h2 id="showmodalszoveg"></h2>
        </div>
        <div class="modal-body" style="flex-wrap: wrap;display:flex;margin-top: 0.5rem;" id="showszemely">
          <i class="fa-solid fa-person fa-2x" style="margin-left: 0.5rem;"></i><p id="showmodalszemely" style="margin-left: 1rem;font-size: 1.5rem;margin-top: -0.2rem;"></p>
        </div>
        <div class="modal-cimke" style="display: flex;flex-wrap: wrap;" v-if="cimkek.length > 0">
          <i class="fa-solid fa-tag fa-2x" style="margin-top: 0.5rem;margin-left: 0.5rem;"></i><div class="cimke" :style="{ 'background-color': cimke.color, 'color' : get_contrast(cimke.color) }" style="margin-top: 0.5rem;margin-left: 0.5rem;position: relative;margin-bottom: 0.5rem;cursor: default;" v-for="cimke in cimkek" v-if="showmodal">{{ cimke.nev }}</div>
        </div>
        <div class="modal-body" style="display: flex;flex-wrap: wrap;" id="showdatum">
          <i class="fa-solid fa-calendar-days fa-2x" style="margin-left: 0.5rem;"></i><p style="margin-left: 1rem;font-size: 1.5rem;margin-top: -0.2rem;" id="showmodaldatum"></p>
        </div>
        <div class="modal-body" style="flex-wrap: wrap;display:flex;margin-top: 0.2rem;" id="showhelyszin">
          <i class="fa-solid fa-location-dot fa-2x" style="margin-left: 0.5rem;"></i><p id="showmodalhelyszin" style="margin-left: 1rem;font-size: 1.5rem;margin-top: -0.2rem;"></p>
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
        showmodal: false,
        show_todos: [],
        current_show: "all",
        date: null,
        filter_cimkek: [],
        shownincstalalat: false,
        searchinput: '',
        login_name: '',
      }
    },
    created() {
      if (localStorage.getItem("token") == null) {
          return this.$router.push(".");
      }
      this.$watch(
        () => this.$route.params.id,
        this.fetchData,
        { immediate: true }
      )
    },
    methods: {
      kozelgofilter(date) {
        if (date == null || date.length == 0) {
          return false
        }
        const datum = new Date();
        datum.setDate(datum.getDate() + 7);
        return this.dateparser(date) >= new Date() && this.dateparser(date) <= datum
      },
      dateparser(date) {
        let elemek = date.split(".");
        let ev = parseInt(elemek[0], 10);
        let honap = parseInt(elemek[1], 10) - 1;
        let nap = parseInt(elemek[2], 10);
        let datum = new Date(ev, honap, nap)
        return datum
      },
      datumforma(date) {
        let ev, honap, nap
        if (date == null) {
          return null
        }
        if (typeof(date) === "string") {
          let elemek = date.split(".");
          ev = parseInt(elemek[0], 10);
          honap = parseInt(elemek[1], 10) - 1;
          nap = parseInt(elemek[2], 10);
        } else {
          ev = date.getFullYear();
          honap = date.getMonth() + 1;
          nap = date.getDate();
        }
        if (honap <= 9) {
          honap = "0"+honap
        }
        if (nap <= 9) {
          nap = "0"+nap
        }
        return `${ev}.${honap}.${nap}.`;
      },
      update_show_todos(){
        if (this.current_show == "all") {
          this.show_todos.todos = this.todos.todos.slice()
        }
        if (this.current_show == "done") {
          this.show_todos.todos =this.todos.todos.slice().filter(item => item.kesz)
        }
        if (this.current_show == "active") {
          this.show_todos.todos = this.todos.todos.slice().filter(item => !item.kesz)
        }
        if (this.current_show == "soon") {
          this.show_todos.todos = this.todos.todos.slice().filter(item => this.kozelgofilter(item.date))
        }
        if (this.current_show == "cimkek") {
          this.show_todos.todos = this.todos.todos.slice().filter(item => item.cimkeid.length > 0 ? item.cimkeid.some(cimke => this.filter_cimkek.includes(cimke)) : false)
          document.querySelector(".blurbg_cimke").style.display = "none"
          document.querySelector("#cimke_tab").classList.add("selectedtab")
          soon_tab.classList.remove("selectedtab");
          all_tab.classList.remove("selectedtab");
          done_tab.classList.remove("selectedtab");
          active_tab.classList.remove("selectedtab");
        }
      },
      selected_tab(tab) {
        let all_tab = document.querySelector("#all_tab");
        let active_tab = document.querySelector("#active_tab");
        let done_tab = document.querySelector("#done_tab");
        let soon_tab = document.querySelector("#soon_tab");
        let cimke_tab = document.querySelector("#cimke_tab");
        if (tab=="all") {
          all_tab.classList.add("selectedtab");
          active_tab.classList.remove("selectedtab");
          done_tab.classList.remove("selectedtab");
          soon_tab.classList.remove("selectedtab");
          cimke_tab.classList.remove("selectedtab");
          this.current_show = "all"
          this.update_show_todos()
        }
        if (tab=="done") {
          done_tab.classList.add("selectedtab");
          active_tab.classList.remove("selectedtab");
          all_tab.classList.remove("selectedtab");
          soon_tab.classList.remove("selectedtab");
          cimke_tab.classList.remove("selectedtab");
          this.current_show = "done"
          this.update_show_todos()
        }
        if (tab=="active") {
          active_tab.classList.add("selectedtab");
          all_tab.classList.remove("selectedtab");
          done_tab.classList.remove("selectedtab");
          soon_tab.classList.remove("selectedtab");
          cimke_tab.classList.remove("selectedtab");
          this.current_show = "active"
          this.update_show_todos()
        }
        if (tab == "soon") {
          soon_tab.classList.add("selectedtab");
          all_tab.classList.remove("selectedtab");
          done_tab.classList.remove("selectedtab");
          active_tab.classList.remove("selectedtab");
          cimke_tab.classList.remove("selectedtab");
          this.current_show = "soon"
          this.update_show_todos()
        }
        if (tab == "cimke") {
          this.current_show = "cimkek"
          document.querySelector(".blurbg_cimke").style.display = "flex";
        }
      },
      delete_cimke(cimkeid) {
        fetch("https://api.fightman01bot.hu:5849/delete_cimke", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("token")
            },
            body: JSON.stringify({
                id: cimkeid,
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
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("token")
            },
            body: JSON.stringify({
                nev: document.getElementById("ujcimke").value
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
          this.shownincstalalat = false;
          return;
        }
        let talalatok = 0;
        szovegek = document.querySelectorAll("#todoszoveg");
        for (let i = 0; i < szovegek.length; i++) {
          if (szovegek[i].innerText.toUpperCase().indexOf(filter) > -1) {
            talalatok++;
            szovegek[i].parentElement.parentElement.style.display = "";
          } else {
            szovegek[i].parentElement.parentElement.style.display = "none";
          }
          if (talalatok === 0) {
            this.shownincstalalat = true;
          } else {
            this.shownincstalalat = false;
          }
        }
      },
      add_cimke(cimkeid) {
        if (!this.cimkek.includes(cimkeid)) {
          this.cimkek.push(cimkeid);
        } else {
          this.cimkek.splice(this.cimkek.indexOf(cimkeid), 1);
        }
      },
      add_filter_cimke(cimkeid) {
        if (!this.filter_cimkek.includes(cimkeid)) {
          this.filter_cimkek.push(cimkeid);
        } else {
          this.filter_cimkek.splice(this.filter_cimkek.indexOf(cimkeid), 1);
        }
      },
      showtodo(todoID) {
        this.showmodal = true;
        let modal = document.querySelector('.showmodal');
        let todo = this.todos.todos.find(todo => todo.id === todoID);
        this.cimkek = this.apicimkek.cimkek.filter(cimke => todo.cimkeid.includes(cimke.id));
        document.querySelector('#showmodalszoveg').innerText = todo.szoveg;
        document.querySelector('#showmodalszemely').innerText = todo.szemely;
        document.querySelector('#showmodalhelyszin').innerText = todo.helyszin;
        document.querySelector('#showmodaldatum').innerText = todo.date;
        document.querySelector('#showhelyszin').style.display = "flex"
        document.querySelector('#showszemely').style.display = "flex"
        document.querySelector('#showdatum').style.display = "flex"
        if (todo.helyszin == null || todo.helyszin.length == 0) {
          document.querySelector('#showhelyszin').style.display = "none"
        }
        if (todo.szemely == null || todo.szemely.length == 0) {
          document.querySelector('#showszemely').style.display = "none"
        }
        if (!todo.date) {
          document.querySelector('#showdatum').style.display = "none"
        }
        if (todo.kesz) {
          document.querySelector('.showmodal-header').style.backgroundColor = 'green';
        } else {
          document.querySelector('.showmodal-header').style.backgroundColor = '#3E69FF';
        }
        modal.style.display = 'block';
        this.date = this.datumforma(todo.date)
      },
      closeshowmodal() {
        let modal = document.querySelector('.showmodal');
        this.cimkek = [];
        modal.style.display = 'none';
        this.showmodal = false;
        this.date = null
      },
      fetchData() {
        fetch("https://api.fightman01bot.hu:5849/get_todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(data => {
            this.todos = data;
            this.update_show_todos()
          });
        fetch("https://api.fightman01bot.hu:5849/get_cimkek", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(data => {
            this.apicimkek = data;
          });
        fetch("https://api.fightman01bot.hu:5849/get_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(data => {
            this.login_name = data.user;
          });
        },
      ujelem() {
          document.querySelector('.blurbg').style.display = 'flex';
          document.querySelector('#megnevezesinput').value = document.querySelector('#eleminput').value
          document.querySelector('#megnevezesinput').focus()
          this.date = null
      },
      closemodal() {
          document.querySelector('.blurbg').style.display = 'none';
          this.cimkek = [];
          document.querySelector('#eleminput').value = '';
          this.shownincstalalat = false
          document.querySelector('#megnevezesinput').value = '';
          document.querySelector('#szemelyinput').value = '';
          document.querySelector('#helyszininput').value = '';
          document.querySelector('.savebtn').id = '';
          let szovegek = document.querySelectorAll("#todoszoveg");
          for (let i = 0; i < szovegek.length; i++) {
            szovegek[i].parentElement.parentElement.style.display = "";
          }
      },
      closecimkemodal() {
          document.querySelector('.blurbg_cimke').style.display = 'none';
      },
      saveTodo() {
        let savebtn = document.querySelector('.savebtn');
        if (!savebtn.id) {
          fetch("https://api.fightman01bot.hu:5849/add_todo", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization" : localStorage.getItem("token")
              },
              body: JSON.stringify({
                  szoveg: document.querySelector('#megnevezesinput').value,
                  cimkek: this.cimkek,
                  szemely: document.querySelector('#szemelyinput').value,
                  kesz: false,
                  date: this.datumforma(this.date),
                  helyszin: document.querySelector('#helyszininput').value,
              })
          })
          .then(response => response.json())
          .then(data => {
              this.todos = data;
              this.update_show_todos()
              this.cimkek = [];
              document.querySelector('.blurbg').style.display = 'none';
              document.getElementById("eleminput").value = '';
              this.shownincstalalat = false
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
                  "Content-Type": "application/json",
                  "Authorization" : localStorage.getItem("token")
              },
              body: JSON.stringify({
                  id: savebtn.id,
                  szoveg: document.querySelector('#megnevezesinput').value,
                  cimkek: this.cimkek,
                  szemely: document.querySelector('#szemelyinput').value,
                  kesz: false,
                  date: this.datumforma(this.date),
                  helyszin: document.querySelector('#helyszininput').value,
              })
          })
          .then(response => response.json())
          .then(data => {
              this.todos = data;
              this.update_show_todos()
              this.cimkek = [];
              document.querySelector('.blurbg').style.display = 'none';
              document.querySelector('.savebtn').id = '';
              document.querySelector('#eleminput').value = '';
              this.shownincstalalat = false
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
                  "Content-Type": "application/json",
                  "Authorization" : localStorage.getItem("token")
              },
              body: JSON.stringify({
                  id: todoID,
              })
          })
          .then(response => response.json())
          .then(data => {
              this.todos = data;
              this.update_show_todos()
          });
      },
      setkesz(todoID, allapot) {
          fetch("https://api.fightman01bot.hu:5849/set_kesz", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization" : localStorage.getItem("token")
              },
              body: JSON.stringify({
                  id: todoID,
                  kesz: allapot,
              })
          })
          .then(response => response.json())
          .then(data => {
              this.todos = data;
              this.update_show_todos()
          });
      },
      logout() {
          localStorage.removeItem("token");
          this.$router.push(".");
      },
      edit_item(todoID) {
        document.querySelector('.blurbg').style.display = 'flex';
        document.querySelector('#megnevezesinput').value = this.todos.todos.find(x => x.id === todoID).szoveg
        document.querySelector('#helyszininput').value = this.todos.todos.find(x => x.id === todoID).helyszin
        document.querySelector('#megnevezesinput').focus()
        document.getElementById('szemelyinput').value = this.todos.todos.find(x => x.id === todoID).szemely
        document.querySelector('.savebtn').id = todoID
        if (this.todos.todos.find(x => x.id === todoID).date) {
          this.date = this.dateparser(this.todos.todos.find(x => x.id === todoID).date)
        } else {
          this.date = null;
        }
        this.cimkek = this.todos.todos.find(x => x.id === todoID).cimkeid
      }
    }
  }

</script>
<style scoped>
    @import '../assets/todos.css';
</style>
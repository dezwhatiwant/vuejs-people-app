/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [
        { name: "Bob Dole",
          bio: "Has no soul",
          bioVisible: true
        },
        { name: "Billy Bob",
          bio: "Has been robbed",
          bioVisible: true
        },
        { name: "Candy Cigarettes",
          bio: "Look and taste like the real thing",
          bioVisible: true
        }
      ],
      newPerson: {
        name: "",
        bio: ""
      }
    };
  },
  created: function() {},
  methods: {
    addPerson: function() {
      var newPersonInfo = {
        name: this.newPerson.name,
        bio: this.newPerson.bio,
        bioVisible: true
      };

      if (this.newPerson.bio && this.newPerson.name) {
        this.people.push(newPersonInfo);
        this.newPerson.name = "";
        this.newPerson.bio = "";
      }
    },
    countPeople: function() {
      var totalPeople = this.people.length;
      document.getElementById("total").innerHTML = this.people.length;
    },
    deletePerson: function(inputPerson) {
      var indexOfPerson = this.people.indexOf(inputPerson);
      this.people.splice(indexOfPerson, 1);
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
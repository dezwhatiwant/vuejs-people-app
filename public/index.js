/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {
        name: "",
        bio: ""
      }
    };
  },
  created: function() {
    axios
      .get('/api/people')
      .then(function(response) {
        this.people = response.data;
      }.bind(this));
  },
  methods: {
    addPerson: function() {
      
      if ( this.newPerson.bio && this.newPerson.name ) {
        var clientParams = {
          name: this.newPerson.name,
          bio: this.newPerson.bio,
        };

        axios
          .post('/api/people', clientParams)
          .then(function(response) {
            this.people.push(response.data);
            this.newPerson.name = "";
            this.newPerson.bio = "";
          }.bind(this));
      }
    },
    countPeople: function() {
      var totalPeople = this.people.length;
      document.getElementById("total").innerHTML = this.people.length;
    },
    deletePerson: function(inputPerson) {
      var indexOfPerson = this.people.indexOf(inputPerson);
      this.people.splice(indexOfPerson, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
      //Safety if line above does not work due to vue this.$set(inputPerson, "bioVisible", !(inputPerson.bioVisible));
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
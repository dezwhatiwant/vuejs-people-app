/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      people: [],
      newPerson: {
        name: "",
        bio: "",
      },
      errors: [],
      nameFilter: "",
      bioFilter: "",
      sortAttribute: "name"
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
            this.errors = [];
          }.bind(this))
          .catch(function(error) {
            this.errors = error.response.data.errors;
          }.bind(this));
      }
    },
    deletePerson: function(inputPerson) {
      var indexOfPerson = this.people.indexOf(inputPerson);
      this.people.splice(indexOfPerson, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    },
    isValidPerson: function(inputPerson) {
      var validName = inputPerson.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      var validBio = inputPerson.bio.toLowerCase().includes(this.bioFilter.toLowerCase());
      return validName && validBio;
    },
    setAttribute: function(inputAttribute) {
      this.sortAttribute = !this.sortAttribute;
      this.sortAttribute = inputAttribute;
    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var lowerAttribute1 = person1[this.sortAttribute].toLowerCase();
        var lowerAttribute2 = person2[this.sortAttribute].toLowerCase();
        return lowerAttribute1.localeCompare(lowerAttribute2);
      }.bind(this));
    }
  }
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


















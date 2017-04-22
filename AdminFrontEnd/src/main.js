import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import routes from './routes';
import store from './store';

import { ClientTable, ServerTable } from 'vue-tables-2';

import appView from './components/app/app.vue'

Vue.use(VueRouter);

let paramsTable = {
  perPage: 20,
  sortIcon: {
    base: 'fa',
    up: 'fa-arrow-up',
    down: 'fa-arrow-down'
  },
  texts: {
    count: 'Showing {from} to {to} of {count} records|{count} records|One record',
    filter: 'Filter Results:',
    filterPlaceholder: 'Buscar:',
    limit: 'Registros:',
    noResults: 'Nenhum resultado encontrado',
    page: 'Página:', // for dropdown pagination 
    filterBy: 'Filter by {column}', // Placeholder for search fields when filtering by column
    loading: 'Carregando...', // First request to server
    defaultOption: 'Select {column}' // default option for list filters
  }
};

Vue.use(ClientTable, paramsTable);
Vue.use(ServerTable, paramsTable);

if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)

  if (localUser && store.state.user !== localUser) {
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.fullPath != '/') {
    if (store.state.token) {
      next();
    }
    else {
      next('/');
    }
  }
  else {
    if (store.state.token) {
      next('/dash');
    }
    else {
      next();
    }
  }
});

sync(store, router);

new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(appView)
});

alertify.defaults.glossary.cancel = 'Cancelar';
alertify.defaults.glossary.title = 'Chapecoense FT';
alertify.defaults.movable = false;
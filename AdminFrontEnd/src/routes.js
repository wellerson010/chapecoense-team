import DashView from './components/Dash.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TasksView from './components/views/Tasks.vue'
import AccessView from './components/views/Access.vue'
import ReposView from './components/views/Repos.vue'

import editFederationView from './components/edit-federation/edit-federation.vue';
import editOpponentView from './components/edit-opponent/edit-opponent.vue';
import editPlayerView from './components/edit-player/edit-player.vue';
import federationView from './components/federation/federation.vue';
import notFoundView from './components/404/404.vue';
import loginView from './components/login/login.vue';
import opponentView from './components/opponent/opponent.vue';
import playersView from './components/players/players.vue';
import positionView from './components/position/position.vue';

// Routes
const routes = [
  {
    path: '/',
    component: loginView,
  },
  {
    path: '/dash',
    component: DashView,
    children: [
      {
        path: 'players',
        alias: '',
        component: playersView,
        name: 'Jogadores',
        meta: { description: 'Elenco e todos os jogadores que já passaram pelo time' },
      },
      {
        path: 'edit-player/:id',
        component: editPlayerView,
        name: 'Editar Jogador'
      },
      {
        path: 'position',
        component: positionView,
        name: 'Posições'
      },
      {
        path: 'opponent',
        component: opponentView,
        name: 'Adversários'
      },
      {
        path: 'edit-opponent/:id',
        component: editOpponentView,
        name: 'Editar Adversários'
      },
      {
        path: 'federation',
        component: federationView,
        name: 'Federação'
      },
      {
        path: 'edit-federation/:id',
        component: editFederationView,
        name: 'Editar Federação'
      },



      {
        path: 'dashboard',
        component: DashboardView,
        name: 'Dashboard',
        meta: { description: 'Overview of environment' }
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: { description: 'Tasks page in the form of a timeline' }
      },
       {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: { description: 'Example of using maps' }
      },{
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: { description: 'List of popular javascript repos' }
      }
    ]
  }, {
    path: '*',
    component: notFoundView
  }
]

export default routes

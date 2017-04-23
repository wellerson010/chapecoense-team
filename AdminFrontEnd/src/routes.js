import DashView from './components/Dash.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TasksView from './components/views/Tasks.vue'
import AccessView from './components/views/Access.vue'
import ReposView from './components/views/Repos.vue'

import editPlayerView from './components/edit-player/edit-player.vue';
import notFoundView from './components/404/404.vue';
import loginView from './components/login/login.vue';
import playersView from './components/players/players.vue';

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

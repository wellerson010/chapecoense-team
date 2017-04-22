import DashView from './components/Dash.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

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
        meta: { description: 'Elenco e todos os jogadores que já passaram pelo time' }
      },
      {
        path: 'dashboard',
        component: DashboardView,
        name: 'Dashboard',
        meta: { description: 'Overview of environment' }
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: { description: 'Simple and advance table in CoPilot' }
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: { description: 'Tasks page in the form of a timeline' }
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: { description: 'User settings page' }
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: { description: 'Example of using maps' }
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: { description: 'List of our servers' }
      }, {
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

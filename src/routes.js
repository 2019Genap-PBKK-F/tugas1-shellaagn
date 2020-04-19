import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

import DataDasarView from './components/views/DataDasar.vue'
import JenisSatkerView from './components/views/JenisSatker.vue'
import MasterIndikatorView from './components/views/MasterIndikator.vue'
import PeriodeView from './components/views/Periode.vue'
import IndikatorPeriodeView from './components/views/IndikatorPeriode.vue'
import SatuanKerjaView from './components/views/SatuanKerja.vue'
import CapaianUnitView from './components/views/CapaianUnit.vue'
import IndikatorSatkerView from './components/views/IndikatorSatuanKerja.vue'
import IndikatorSatkerLogView from './components/views/IndikatorSatuanKerjaLog.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      },

      {
        path: 'datadasar',
        component: DataDasarView,
        name: 'DataDasar',
        meta: {description: 'Data Dasar'}
      }, {
        path: 'jenissatker',
        component: JenisSatkerView,
        name: 'JenisSatker',
        meta: {description: 'Jenis Satuan Kerja'}
      }, {
        path: 'masterindikator',
        component: MasterIndikatorView,
        name: 'MasterIndikator',
        meta: {description: 'Master Indikator'}
      }, {
        path: 'periode',
        component: PeriodeView,
        name: 'Periode',
        meta: {description: 'Periode'}
      }, {
        path: 'indikatorperiode',
        component: IndikatorPeriodeView,
        name: 'IndikatorPeriode',
        meta: {description: 'Indikator Periode'}
      }, {
        path: 'satuankerja',
        component: SatuanKerjaView,
        name: 'SatuanKerja',
        meta: {description: 'Satuan Kerja'}
      }, {
        path: 'capaianunit',
        component: CapaianUnitView,
        name: 'CapaianUnit',
        meta: {description: 'Capaian Unit'}
      }, {
        path: 'indikatorsatker',
        component: IndikatorSatkerView,
        name: 'IndikatorSatker',
        meta: {description: 'Indikator Satuan Kerja'}
      }, {
        path: 'indikatorsatkerlog',
        component: IndikatorSatkerLogView,
        name: 'IndikatorSatkerLog',
        meta: {description: 'Indikator Satuan Kerja Log'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes

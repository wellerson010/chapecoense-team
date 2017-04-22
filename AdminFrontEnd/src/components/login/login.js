import apiService from '../../services/api-service'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds () {
      const {username, password} = this

      if (!username || !password) {
        this.response = 'Usuário e/ou password vazio!'
        return
      }

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      this.response = 'Carregando...'
      
      apiService.request('/auth/authenticate', 'post', {
        login: username,
        password: password
      })
      .then(response => {
        this.toggleLoading()

        var data = response.data

        if (data.error) {
          this.response = data.message
        }

        /* Setting user in the state and caching record to the localStorage */
        if (data.authenticate) {
          var token = 'JWT ' + data.token

          this.$store.commit('SET_USER', data.user)
          this.$store.commit('SET_TOKEN', token)

          if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(data.user))
            window.localStorage.setItem('token', token)
          }
          this.$router.push('/dash')
        }
        else {
          this.response = 'Usuário não autenticado!'
        }
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING')
        console.log(error)

        this.response = 'Servidores estão com problema. Contate o administrador do site!'
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
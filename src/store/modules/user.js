/* eslint-disable */
import { login, logout, insertUser } from '../../api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import * as crypto from 'crypto'
import { parsePayload } from '../../utils/auth'
import { Message } from 'element-ui';

const state = {
  token: getToken(),
  name: '',
  id_tag: '',
  avatar: 'https://oss.liontao.xin/pandora_avatar.png'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id_tag) => {
    state.id_tag = id_tag
  }
}

const actions = {
  // user login
  async login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return await login({
      id: username.trim(),
      token: crypto.createHash('md5').update(password).digest('hex')
    }).then(async response => {
      const { data } = response.data
      if (!response.data.status)
        return { error: '登录失败，请检查你的用户名或密码' }
      else {
        setToken(data)
        commit('SET_TOKEN', data)
        dispatch('getInfo', data)
        return await insertUser(data)
      }
    }).catch(err => {
      console.warn(err)
      Message.error('登录失败，请重试')
    })
  },

  getInfo({ commit, state }) {
    const { id, name } = parsePayload(state.token)
    commit('SET_NAME', name)
    commit('SET_ID', id)
  },

  // user logout
  logout({ dispatch, state }) {
    dispatch('resetToken')
    resetRouter()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


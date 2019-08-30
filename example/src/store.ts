import Vue from 'vue'
import Vuex from 'vuex'
import {Lesson} from "@/models/lessons.model"
import {EntityAdapter} from 'vue-entity-adapter'
import actions from '@/store/actions';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

Vue.use(Vuex)

export const lessonsAdapter = new EntityAdapter<Lesson>()

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  state: {
    lessonState: {
      ...lessonsAdapter.getInitialState()
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		a: new Set(),
		arr: []
	},
	mutations: {
		adda(state, item) {
			
			state.a.add(item)
			
			for (var i of state.a) {
				console.log(i)
			}
			state.arr = [...state.a]
		}
	},
	actions: {},
	modules: {}
})

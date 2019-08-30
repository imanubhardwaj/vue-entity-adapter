<template>
  <div id="app">
    <div class="row">
      <button @click="addOne">Add One</button>
      <button @click="addMany">Add Many</button>
      <button @click="addAll">Add All</button>
      <button @click="removeOne">Remove One</button>
      <button @click="removeMany">Remove Many</button>
      <button @click="removeAll">Remove All</button>
      <button @click="updateOne">Update One</button>
      <button @click="updateMany">Update Many</button>
      <button @click="upsertOne">Upsert One</button>
      <button @click="upsertMany">Upsert Many</button>
      <button @click="logEntity">Log Entity</button>
      <button @click="logEntitiesCount">Log Entities Count</button>
      <button @click="logEntitiesIds">Log Entities Ids</button>
    </div>
    <p v-for="lesson in lessons" :key="lesson.id">{{lesson.title}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from "@/store";
import {
	ADD_LESSON_ACTION,
	ADD_LESSONS_ACTION, GET_LESSON, GET_LESSON_IDS,
	GET_LESSONS, GET_LESSONS_COUNT, REMOVE_ALL_LESSONS_ACTION,
	REMOVE_LESSON_ACTION, REMOVE_LESSONS_ACTION,
	REPLACE_LESSONS_ACTION, UPDATE_LESSON_ACTION, UPDATE_LESSONS_ACTION, UPSERT_LESSON_ACTION, UPSERT_LESSONS_ACTION
} from "@/store/types";

@Component({
  components: {}
})
export default class App extends Vue {
	get lessons() {
		return store.getters[GET_LESSONS]
  }

	addOne() {
		store.dispatch(ADD_LESSON_ACTION, {id: 0, title: 'Lesson0'})
  }

	addMany() {
		const lessons = [1, 2, 3, 4].map(item => {
			return {
				id: item,
        title: `Lesson${item}`
      };
    });
		store.dispatch(ADD_LESSONS_ACTION, lessons)
  }

	addAll() {
		const lessons = [4, 3, 2, 1].map(item => {
			return {
				id: item,
        title: `Lesson${item}`
      };
    });
		store.dispatch(REPLACE_LESSONS_ACTION, lessons)
  }

  removeOne() {
		store.dispatch(REMOVE_LESSON_ACTION, 0)
  }

  removeMany() {
		this.addMany()
		store.dispatch(REMOVE_LESSONS_ACTION, [1, 2])
  }

  removeAll() {
		store.dispatch(REMOVE_ALL_LESSONS_ACTION)
  }

  updateOne() {
		this.addMany()
		store.dispatch(UPDATE_LESSON_ACTION, {id: 2, changes: {title: 'New Lesson2'}})
  }

	updateMany() {
		this.addMany()
		store.dispatch(UPDATE_LESSONS_ACTION, [{id: 1, changes: {title: 'New Lesson1'}}, {id: 3, changes: {title: 'New Lesson3'}}])
  }

  upsertOne() {
		this.addMany()
		store.dispatch(UPSERT_LESSON_ACTION, {id: 2, title: 'New Lesson2'})
  }

	upsertMany() {
		this.addMany()
		store.dispatch(UPSERT_LESSONS_ACTION, [{id: 1, title: 'New Lesson1'}, {id: 5, title: 'Lesson5'}])
  }

	logEntity() {
		this.addMany()
		console.log(store.getters[GET_LESSON](3))
  }

	logEntitiesCount() {
		console.log(store.getters[GET_LESSONS_COUNT])
  }

	logEntitiesIds() {
		console.log(store.getters[GET_LESSON_IDS])
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.row {
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 10px;
  }
}
</style>

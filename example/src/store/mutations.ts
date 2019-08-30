import Vue from "vue";
import {
	ADD_LESSON_MUTATION,
	ADD_LESSONS_MUTATION,
	REMOVE_ALL_LESSONS_MUTATION,
	REMOVE_LESSON_MUTATION,
	REMOVE_LESSONS_MUTATION,
	REPLACE_LESSONS_MUTATION,
	UPDATE_LESSON_MUTATION,
	UPDATE_LESSONS_MUTATION,
	UPSERT_LESSON_MUTATION,
	UPSERT_LESSONS_MUTATION
} from "@/store/types";
import {State} from "@/models/state.model";
import {Lesson} from "@/models/lessons.model";
import {lessonsAdapter} from "@/store";
import {Update} from "vue-entity-adapter";

export default {
	[ADD_LESSON_MUTATION]: (state: State, payload: Lesson) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.addOne(payload, state.lessonState)
		})
	},
	[ADD_LESSONS_MUTATION]: (state: State, payload: Lesson[]) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.addMany(payload, state.lessonState)
		})
	},
	[REPLACE_LESSONS_MUTATION]: (state: State, payload: Lesson[]) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.addAll(payload, state.lessonState)
		})
	},
	[REMOVE_LESSON_MUTATION]: (state: State, payload: number) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.removeOne(payload, state.lessonState)
		})
	},
	[REMOVE_LESSONS_MUTATION]: (state: State, payload: number[]) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.removeMany(payload, state.lessonState)
		})
	},
	[REMOVE_ALL_LESSONS_MUTATION]: (state: State) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.removeAll(state.lessonState)
		})
	},
	[UPDATE_LESSON_MUTATION]: (state: State, payload: Update<Lesson>) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.updateOne(payload, state.lessonState)
		})
	},
	[UPDATE_LESSONS_MUTATION]: (state: State, payload: Update<Lesson>[]) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.updateMany(payload, state.lessonState)
		})
	},
	[UPSERT_LESSON_MUTATION]: (state: State, payload: Lesson) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.upsertOne(payload, state.lessonState)
		})
	},
	[UPSERT_LESSONS_MUTATION]: (state: State, payload: Lesson[]) => {
		Vue.set(state, 'lessonState', {
			...lessonsAdapter.upsertMany(payload, state.lessonState)
		})
	}
}

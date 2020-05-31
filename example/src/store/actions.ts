import {
	ADD_LESSON_ACTION,
	ADD_LESSON_MUTATION,
	ADD_LESSONS_ACTION,
	ADD_LESSONS_MUTATION,
	REMOVE_ALL_LESSONS_ACTION, REMOVE_ALL_LESSONS_MUTATION,
	REMOVE_LESSON_ACTION,
	REMOVE_LESSON_MUTATION,
	REMOVE_LESSONS_ACTION,
	REMOVE_LESSONS_MUTATION,
	REPLACE_LESSONS_ACTION,
	REPLACE_LESSONS_MUTATION,
	UPDATE_LESSON_ACTION,
	UPDATE_LESSON_MUTATION,
	UPDATE_LESSONS_ACTION,
	UPDATE_LESSONS_MUTATION, UPSERT_LESSON_ACTION, UPSERT_LESSON_MUTATION, UPSERT_LESSONS_ACTION, UPSERT_LESSONS_MUTATION
} from "@/store/types";
import {Lesson} from "@/models/lessons.model";
import {Update} from "vue-entity-adapter-plus";

export default {
	[ADD_LESSON_ACTION]: ({commit}: any, payload: Lesson) => {
		commit(ADD_LESSON_MUTATION, payload)
	},
	[ADD_LESSONS_ACTION]: ({commit}: any, payload: Lesson[]) => {
		commit(ADD_LESSONS_MUTATION, payload)
	},
	[REPLACE_LESSONS_ACTION]: ({commit}: any, payload: Lesson[]) => {
		commit(REPLACE_LESSONS_MUTATION, payload)
	},
	[UPDATE_LESSON_ACTION]: ({commit}: any, payload: Update<Lesson>) => {
		commit(UPDATE_LESSON_MUTATION, payload)
	},
	[UPDATE_LESSONS_ACTION]: ({commit}: any, payload: Update<Lesson>[]) => {
		commit(UPDATE_LESSONS_MUTATION, payload)
	},
	[REMOVE_LESSON_ACTION]: ({commit}: any, payload: number) => {
		commit(REMOVE_LESSON_MUTATION, payload)
	},
	[REMOVE_LESSONS_ACTION]: ({commit}: any, payload: number[]) => {
		commit(REMOVE_LESSONS_MUTATION, payload)
	},
	[REMOVE_ALL_LESSONS_ACTION]: ({commit}: any) => {
		commit(REMOVE_ALL_LESSONS_MUTATION)
	},
	[UPSERT_LESSON_ACTION]: ({commit}: any, payload: Lesson) => {
		commit(UPSERT_LESSON_MUTATION, payload)
	},
	[UPSERT_LESSONS_ACTION]: ({commit}: any, payload: Lesson[]) => {
		commit(UPSERT_LESSONS_MUTATION, payload)
	}
}

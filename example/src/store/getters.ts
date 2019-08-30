import {GET_LESSON, GET_LESSON_IDS, GET_LESSONS, GET_LESSONS_COUNT} from "@/store/types";
import {State} from "@/models/state.model";
import {lessonsAdapter} from "@/store";
import {Lesson} from "@/models/lessons.model";

export default {
	[GET_LESSON]: (state: State) => (id: string): Lesson => lessonsAdapter.getOne(id, state.lessonState),
	[GET_LESSONS]: (state: State): Lesson[] => lessonsAdapter.getAll(state.lessonState),
	[GET_LESSONS_COUNT]: (state: State) => lessonsAdapter.getCount(state.lessonState),
	[GET_LESSON_IDS]: (state: State) => lessonsAdapter.getIds(state.lessonState)
}

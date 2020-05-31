import {EntityState} from "vue-entity-adapter-plus";
import {Lesson} from "@/models/lessons.model";

export interface State {
	lessonState: LessonState;
}

interface LessonState extends EntityState<Lesson> {}

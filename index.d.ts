/// <reference types="node" />

declare module 'vue-entity-adapter' {
	export interface EntityState<T> {
		ids: string[];
		entities: T[];
	}

	export interface UpdateStr<T> {
		id: string;
		changes: Partial<T>;
	}
	export interface UpdateNum<T> {
		id: number;
		changes: Partial<T>;
	}

	export type Update<T> = UpdateStr<T> | UpdateNum<T>;

	export class EntityAdapter<T> {
		constructor();

		public getInitialState(): EntityState<T>;
		public getOne(id: string, state: EntityState<T>): T;
		public getAll(state: EntityState<T>): T[];
		public getCount(state: EntityState<T>): number;
		public getIds(state: EntityState<T>): number[];
		public addOne(element: T, state: EntityState<T>): EntityState<T>;
		public addMany(elements: T[], state: EntityState<T>): EntityState<T>;
		public addAll(elements: T[], state: EntityState<T>): EntityState<T>;
		public removeOne(id: string, state: EntityState<T>): EntityState<T>;
		public removeOne(id: number, state: EntityState<T>): EntityState<T>;
		public removeMany(ids: string[], state: EntityState<T>): EntityState<T>;
		public removeMany(ids: number[], state: EntityState<T>): EntityState<T>;
		public removeAll(state: EntityState<T>): EntityState<T>;
		public updateOne(update: Update<T>, state: EntityState<T>): EntityState<T>;
		public updateMany(updates: Update<T>[], state: EntityState<T>): EntityState<T>;
		public upsertOne(element: T, state: EntityState<T>): EntityState<T>;
		public upsertMany(elements: T[], state: EntityState<T>): EntityState<T>;
	}
}

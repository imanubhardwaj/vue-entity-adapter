import { EntityAdapter } from './index';

describe('Entity adapter', () => {
	let entityAdapter;
	let state;

	beforeEach(() => {
		entityAdapter = new EntityAdapter();
		state = entityAdapter.getInitialState();
	});

	it('should create new entity adapter', () => {
		expect(entityAdapter).toBeTruthy();
	});

	it('should return initial state', () => {
		expect(entityAdapter.getInitialState()).toEqual({ ids: [], entities: {} });
	});

	it('should get one element', () => {
		const element = { id: '1', label: 'first' };

		let newState = entityAdapter.addOne(element, state);

		expect(entityAdapter.getOne(element.id, newState)).toEqual(element);
		expect(state).not.toBe(newState);
	});

	it('should get all elements', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		let newState = entityAdapter.addAll(elements, state);

		expect(entityAdapter.getAll(newState)).toEqual(elements);
		expect(state).not.toBe(newState);
	});

	it('should get entities count', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		let newState = entityAdapter.addAll(elements, state);

		expect(entityAdapter.getCount(newState)).toEqual(elements.length);
		expect(state).not.toBe(newState);
	});

	it('should get all ids', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		let newState = entityAdapter.addAll(elements, state);

		expect(entityAdapter.getIds(newState)).toEqual(elements.map(item => item.id));
		expect(state).not.toBe(newState);
	});

	it('should add element', () => {
		const element = { id: '1', label: 'first' };

		const newState = entityAdapter.addOne(element, state);

		expect(newState.ids.length).toBe(1);
		expect(newState.ids[0]).toBe(element.id);
		expect(newState.entities[element.id]).toEqual(element);
		expect(state).not.toBe(newState);
	});

	it('should add multiple elements', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		const newState = entityAdapter.addMany(elements, state);

		expect(newState.ids.length).toBe(2);
		expect(newState.ids[0]).toBe(elements[0].id);
		expect(newState.entities[elements[0].id]).toEqual(elements[0]);
		expect(state).not.toBe(newState);
	});

	it('should replace all elements', () => {
		let elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		let newState = entityAdapter.addAll(elements, state);

		expect(newState.ids.length).toBe(2);
		expect(newState.ids[0]).toBe(elements[0].id);
		expect(newState.ids[1]).toBe(elements[1].id);
		expect(newState.entities[elements[0].id]).toEqual(elements[0]);
		expect(newState.entities[elements[1].id]).toEqual(elements[1]);
		expect(state).not.toBe(newState);

		elements = [
			{ id: '3', label: 'third' }
		];

		newState = entityAdapter.addAll(elements, newState);

		expect(newState.ids.length).toBe(3);
		expect(newState.ids[2]).toBe(elements[0].id);
		expect(newState.entities[elements[0].id]).toEqual(elements[0]);
		expect(state).not.toBe(newState);
	});

	it('should remove element', () => {
		const element = { id: '1', label: 'first' };

		let newState = entityAdapter.addOne(element, state);
		newState = entityAdapter.removeOne(element.id, state);

		expect(newState.ids.length).toBe(0);
		expect(newState.entities).toEqual({});
		expect(state).not.toBe(newState);
	});

	it('should remove many elements', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' },
			{ id: '3', label: 'three' }
		];

		let newState = entityAdapter.addMany(elements, state);
		newState = entityAdapter.removeMany(['1', '2'], newState);

		expect(newState.ids.length).toBe(1);
		expect(newState.entities).toEqual({"3": { id: '3', label: 'three' }});
		expect(state).not.toBe(newState);
	});

	it('should remove all elements', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		let newState = entityAdapter.addAll(elements, state);
		newState = entityAdapter.removeAll(state);

		expect(newState.ids.length).toBe(0);
		expect(newState.entities).toEqual({});
		expect(state).not.toBe(newState);
	});

	it('should update element', () => {
		const element = { id: '1', label: 'first', description: 'lorem ipsum' };
		const changes = { label: 'two' };

		let newState = entityAdapter.addOne(element, state);
		newState = entityAdapter.updateOne({ id: element.id, changes: changes }, newState);

		expect(newState.entities[element.id].label).toEqual(changes.label);
		expect(state).not.toBe(newState);
	});

	it('should update many elements', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];
		const changes = [{ label: 'newFirst' }, { label: 'newTwo' }];

		let newState = entityAdapter.addMany(elements, state);
		newState = entityAdapter.updateMany([{ id: elements[0].id, changes: changes[0] }, { id: elements[1].id, changes: changes[1] }], newState);

		expect(newState.entities[elements[0].id].label).toEqual(changes[0].label);
		expect(newState.entities[elements[1].id].label).toEqual(changes[1].label);
		expect(state).not.toBe(newState);
	});

	it('should upsert element', () => {
		const elements = [
			{ id: '1', label: 'first' },
			{ id: '2', label: 'two' }
		];

		let newState = entityAdapter.addMany(elements, state);
		newState = entityAdapter.upsertOne({ id: '3', label: 'three' }, newState);

		expect(newState.entities[newState.ids[2]]).toEqual({ id: '3', label: 'three' });
		expect(state).not.toBe(newState);
	});

	it('should upsert many elements', () => {
		const element = { id: '1', label: 'first' };

		let newState = entityAdapter.addOne(element, state);
		newState = entityAdapter.upsertMany([{ id: '2', label: 'two' }, { id: '3', label: 'three' }], newState);

		expect(newState.entities[newState.ids[1]]).toEqual({ id: '2', label: 'two' });
		expect(newState.entities[newState.ids[2]]).toEqual({ id: '3', label: 'three' });
		expect(state).not.toBe(newState);
	});
});

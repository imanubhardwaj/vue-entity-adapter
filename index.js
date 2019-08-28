import { cloneDeep } from 'lodash';

/**
 * Class to manipulate entities
 */
export class EntityAdapter {
  constructor() {
    this.ids = [];
    this.entities = {};
  }

  /**
   * Get initial state
   * @returns {{entities: ({}|*), ids: Array}}
   */
  getInitialState() {
    return {
      ids: this.ids,
      entities: this.entities
    }
  }

  /**
   * Get one entity
   * @param id
   * @param state
   * @returns {*}
   */
  getOne(id, state) {
    return state.entities[id];
  }

  /**
   * Get all entities
   * @param state
   * @returns {(*)[]}
   */
  getAll(state) {
    return Object.keys(state.entities).map(key => state.entities[key]);
  }

  /**
   * Get entities count
   * @param state
   * @returns {number}
   */
  getCount(state) {
    return Object.keys(state.entities).length;
  }

  /**
   * Add one entity
   * @param element
   * @param state
   * @returns {*}
   */
  addOne(element, state) {
    const newState = cloneDeep(state);

    newState.ids.push(element.id);
    newState.entities[element.id] = element;

    return newState;
  }

  /**
   * Add multiple entities
   * @param elements
   * @param state
   * @returns {*}
   */
  addMany(elements, state) {
    let newState = cloneDeep(state);

    for (const element of elements) {
      newState = this.addOne(element, newState);
    }

    return newState;
  }

  /**
   * Replace entities
   * @param elements
   * @param state
   * @returns {*}
   */
  addAll(elements, state) {
    let newState = cloneDeep(state);

    this.removeAll(newState);
    for (const element of elements) {
      newState = this.addOne(element, newState);
    }

    return newState;
  }

  /**
   * Remove one entity
   * @param id
   * @param state
   * @returns {*}
   */
  removeOne(id, state) {
    const newState = cloneDeep(state);

    delete newState.entities[id];
    newState.ids = newState.ids.filter(_id => _id !== id);

    return newState;
  }

  /**
   * Remove many entities
   * @param ids
   * @param state
   * @returns {*}
   */
  removeMany(ids, state) {
    const newState = cloneDeep(state);

    for (const id of ids) {
      this.removeOne(id, newState);
    }

    return newState;
  }

  /**
   * Remove all entities
   * @param state
   * @returns {*}
   */
  removeAll(state) {
    const newState = cloneDeep(state);

    newState.ids = [];
    newState.entities = {};

    return newState;
  }

  /**
   * Update one entity
   * @param update
   * @param state
   * @returns {*}
   */
  updateOne(update, state) {
    const newState = cloneDeep(state);

    for (const prop in update.changes) {
      newState.entities[update.id][prop] = update.changes[prop];
    }

    return newState;
  }

  /**
   * Update many entities
   * @param update
   * @param state
   * @returns {*}
   */
  updateMany(updates, state) {
    const newState = cloneDeep(state);

    for (const update of updates) {
      this.updateOne(update, newState);
    }

    return newState;
  }

  /**
   * Update entity if exists else Insert
   * @param element
   * @param state
   * @returns {*}
   */
  upsertOne(element, state) {
    const newState = cloneDeep(state);

    if (element.id in newState.entities) {
      this.updateOne({id: element.id, changes: element}, newState);
    } else {
      this.addOne(element, newState);
    }

    return newState;
  }

  /**
   * Update entities if exist else Insert
   * @param elements
   * @param state
   * @returns {*}
   */
  upsertMany(elements, state) {
    const newState = cloneDeep(state);

    for (const element of elements) {
      if (element.id in newState.entities) {
        this.updateOne({id: element.id, changes: element}, newState);
      } else {
        this.addOne(element, newState);
      }
    }

    return newState;
  }
}

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
}

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
}

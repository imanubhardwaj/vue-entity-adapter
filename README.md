# Note
This project is a fork of the project of [Manu Bhardwaj](https://github.com/imanubhardwaj), 
You can access the original project [here](https://github.com/imanubhardwaj/vue-entity-adapter).


The difference from this project to the original project, are just a few changes in the definitions for typescript and a small improvement in the ordering logic in the getAll method.

# Introduction

Entity State adapter for managing record collections.

Entity provides an API to manipulate and query entity collections.

Reduces boilerplate for creating reducers that manage a collection of models.
Provides performant CRUD operations for managing entity collections.
Extensible type-safe adapters for selecting entity information.

#### [Example](example)

#### [Demo](https://vue-entity-adapter.manubhardwaj.in/)

## Installation
Installing with *npm*

``npm i vue-entity-adapter-plus``

## Getting Started

* Create a ``EntityState``

``interface TodoState extends EntityState<Todo> {}``

* Create an ``EntityAdapter``

``const todoAdapter = new EntityAdapter<Todo>();``

## Adapter Methods
These methods are provided by the adapter object returned when using ``new EntityAdapter()``. The methods are used inside your mutations to manage the entity collection based on your provided actions.

#### getInitialState
Returns the initialState for entity state based on the provided type. Additional state is also provided through the provided configuration object. The initialState is provided to your reducer function.

## Entity Selectors

#### getOne
Returns the entity with the given id.

#### getAll
Returns all entities from the state.

#### getCount
Returns the number of entities from the state.

#### getIds
Returns the ids of entities from the state.

## Adapter Collection Methods

The entity adapter also provides methods for operations against an entity. These methods can change one to many records at a time. Each method returns the newly modified state if changes were made and the same state if no changes were made.

* addOne: Add one entity to the collection
* addMany: Add multiple entities to the collection
* addAll: Replace current collection with provided collection
* removeOne: Remove one entity from the collection
* removeMany: Remove multiple entities from the collection, by id or by predicate
* removeAll: Clear entity collection
* updateOne: Update one entity in the collection
* updateMany: Update multiple entities in the collection
* upsertOne: Add or Update one entity in the collection
* upsertMany: Add or Update multiple entities in the collection

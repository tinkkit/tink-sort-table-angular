# Tink sort table Angular directive

v1.1.13

## What is this repository for?

The Tink Angular sort table directive provides you with a table that can be sorted.

Tink is an in-house developed easy-to-use front-end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel.

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:

   `bower install tink-sort-table-angular --save`

2. Add the following files to your project:

   `<link rel="stylesheet" href="bower_components/tink-core/dist/tink.css" />` (or one of the Tink themes)

   `<script src="bower_components/tink-sort-table-angular/dist/tink-sort-table-angular.js"></script>`

   `<script src="bower_components/tink-helper-safe-apply-angular/dist/tink-helper-safe-apply-angular.js"></script>`

   `<script src="bower_components/ng-lodash/build/ng-lodash.js"></script>`



----------



## How to use

### tink-sort-table

```html
<tink-sort-table></tink-sort-table>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-tink-sort-table | `Array` | `[]` | Data that needs to be sorted.
data-tink-sort-type | `String` | `''` | Type of the field string or date.
data-tink-init-sort | `String` | `''` | The value that needs to be sorted at the start.
data-tink-init-sort-order | `String` | `''` | Order you want the table sort in from the start: 'asc' or 'desc'.
data-tink-callback | `Function($property,$order,$type)` | `undefined` | This function will be called when the array needs to be sorted.
data-tink-sort | `Boolean` | `true` | If false the sorting function needs to be done by user.
data-tink-sort-header | `String` | `''` | you have to place this on each th with proper dataname.

### Example

A working example can be found in [the Tink documentation](http://tink.digipolis.be/#/docs/directives/sort-table#example).

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)

# Tink sort table Angular directive

v2.0.4

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
<table tink-sort-table="ctrl.rapporten.data" tink-callback="sorted($property,$order)" tink-asc="ctrl.asc" tink-sort-field="ctrl.header" class="table-responsive table-interactive">
       <thead>
           <tr>
               <th tink-sort-header="volgnummer" tink-sort-type="date">Nummer</th>
               <th tink-sort-header="familienaam">Naam</th>
               <th tink-sort-header="voornaam">Voornaam</th>
               <th>Notities</th>
               <th>Advies</th>
               <th></th>
           </tr>
       </thead>
       <tbody>
           <tr ng-repeat="rapport in ctrl.rapporten.data" class="clickableTableRow">
               <td>{{rapport.volgnummer | date:'dd/MM/yyyy'}}</td>
               <td>{{ rapport.familienaam }}</td>
               <td>{{ rapport.voornaam }}</td>
           </tr>
       </tbody>
   </table>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-tink-sort-table | `Array` | `[]` | Data that needs to be sorted.
data-tink-callback | `Function($property,$order)` | `undefined` | This function will be called when the array needs to be sorted.
data-tink-sort-header | `String` | `''` | you have to place this on each th with proper dataname.
data-tink-tink-sort-field | `Object` | `undefined` | Required property, the name of the sorted field.
data-tink-asc | `Boolean` | `undefined` | Required property, Field is asc sorted or not (desc sorted).
data-tink-sort-active | `Boolean` | `undefined` | If false the field wil not be able to sort.
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

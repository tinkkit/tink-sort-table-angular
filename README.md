# Tink sort table Angular directive

v1.1.9

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


----------


## How to use

### tink-sort-table

### Component

```html
<tink-sort-table></tink-sort-table>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-tink-sort-table | `Array` | `undefined` | Data that needs to be sorted.
data-tink-sort-type | `String` | `undefined` | Type of the field string or date.
data-tink-init-sort | `String` | `undefined` | The value that needs to be sorted at the start.
data-tink-init-sort-order | `String(asc | desc)` | `Undefined` | Order you want the table sort in from the start.
data-tink-callback | `Function($property,$order,$type)` | `undefined` | This function will be called when the array needs to be sorted.
data-tink-sort | `Boolean` | `true` | If false the sorting function needs to be done by user.
data-tink-sort-header | `String` | `undefined` | you have to place this on each th with proper dataname.

###Example
```html
<table tink-sort-table="ctrl.rapporten.data" tink-callback="sorted($property,$order,$type)" class="table-responsive table-interactive">
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
               <td>
                   <span class="fa-stack fa-1x commentBoxIcon">
                       <i class="fa fa-comment fa-2x fa-stack-1x"></i>
                       <strong class="fa-stack-1x fa-stack-text fa-inverse"></strong>
                   </span>
               </td>
               <td><span class="bcsdIcon" ng-class="{questionIcon: rapport.advies.code == 'ONB', checkIcon: rapport.advies.code == 'AKK', crossIcon: rapport.advies.code == 'NAK'}"><i class="fa"></i></span></td>
               <td><i class="fa fa-angle-right"></i></td>
           </tr>
       </tbody>
   </table>
```

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)

## License

The MIT License (MIT)

Copyright (c) 2014 Stad Antwerpen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

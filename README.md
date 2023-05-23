# Charting
NotS WAPP Charting, Injection workshop


## Installatie

# D3: Data-Driven Documents

<a href="https://d3js.org"><img src="https://d3js.org/logo.svg" align="left" hspace="10" vspace="6"></a>

**D3** (or **D3.js**) is een JavaScript-bibliotheek voor het visualiseren van gegevens met behulp van webstandaarden. D3 helpt u data tot leven te brengen met behulp van SVG, Canvas en HTML. D3 combineert krachtige visualisatie- en interactietechnieken met een gegevensgestuurde benadering van DOM-manipulatie, waardoor u alle mogelijkheden van moderne browsers krijgt en de vrijheid om de juiste visuele interface voor uw gegevens te ontwerpen.


## Resources

* [Introduction](https://observablehq.com/@d3/learn-d3)
* [API Reference](https://github.com/d3/d3/blob/main/API.md)
* [Releases](https://github.com/d3/d3/releases)
* [Examples](https://observablehq.com/@d3/gallery)
* [Wiki](https://github.com/d3/d3/wiki)

## Installing

Installeren met npm: `npm install d3`.Je kunt de [laatste release on GitHub](https://github.com/d3/d3/releases/latest). Voor vanilla HTML in moderne browsers, import D3 van jsDelivr:

```html
<script type="module">

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const div = d3.selectAll("div");

</script>
```

Voor legacy environments, kun je D3’s UMD bundle laden van een npm-based CDN zoals jsDelivr; `d3` global is geëxporteerd:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>

const div = d3.selectAll("div");

</script>
```

Je kunt ook alleen de D3 microlibraries gebruiken. Bijvoorbeeld: [d3-selection](https://github.com/d3/d3-selection):

```html
<script type="module">

import {selectAll} from "https://cdn.jsdelivr.net/npm/d3-selection@3/+esm";

const div = selectAll("div");

</script>
```

D3 is geschreven met [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html). Maak een custom bundel met behulp van Rollup, Webpack of iets anders. Importeren van D3 in een ES2015 applicatie importeer specifieke symbolen van D3 modules:

```js
import {scaleLinear} from "d3-scale";
```

Of importeer alles in een namespace (hier, `d3`):

```js
import * as d3 from "d3";
```

Of een dynamic import:

```js
const d3 = await import("d3");
```


Je kunt ook de individuele modeles importen en zo combineren tot een d3 object [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):

```js
const d3 = await Promise.all([
  import("d3-format"),
  import("d3-geo"),
  import("d3-geo-projection")
]).then(d3 => Object.assign({}, ...d3));
```


## Barchart


##

/*
---

name: AZ

description: manages CMS behavior. Init panel and load plugin scripts

license: MIT-style license.

requires:
  - More/Date.Extras

provides: [AZ]

...
*/

AZ = {};

Date.defineParser('%d %m %Y');
Locale.use('fr-FR');
a way to turn [https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans](https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans) into a json file 


1. `npm install`
2. `curl https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans > wiki.html`
3. `node index.js`
4. you now have a `pies.json` file

to use this json later:

`const jsonData = require('./pies.json');`

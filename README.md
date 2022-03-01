a way to turn [https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans](https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans) into a json file 


1. `npm install`
2. `curl https://en.wikipedia.org/wiki/List_of_pies,_tarts_and_flans > wiki.html`
3. `node index.js`
4. you now have a `pies.json` file

to use this json later:

`const jsonData = require('./pies.json');`

format is as follows

```
[

  {
    "Name": "Aloo pie",
    "Image": "",
    "Origin": "Trinidad and Tobago",
    "Type": "Savory",
    "Description": "This soft and fried pastry is a variant of the samosa, made from flour and water, and filled with boiled, spiced and mashed potatoes and other vegetables like green peas. Its shape is similar to a calzone, and it is usually larger than a samosa, approximately 5 inches (13 cm) long.[1]",
    "ThumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Aloo_Pie.jpg/123px-Aloo_Pie.jpg"
  },

  {
    "Name": "Apple crispApple crumble",
    "Image": "",
    "Origin": "United States",
    "Type": "Sweet",
    "Description": "A dessert consisting of baked apples topped with a crispy crust. Many different kinds of fruit can substituted for apples, and one of the most common variants is 'apple rhubarb crisp' including rhubarb. It is a simpler alternative to apple pie and apple cobbler.",
    "ThumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Applecrisp.jpg/123px-Applecrisp.jpg"
  }

]
```

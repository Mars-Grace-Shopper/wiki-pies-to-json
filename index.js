const tabletojson = require('tabletojson').Tabletojson;
const fs = require('fs');
const path = require('path');


const main = async () => {

const html = await fs.readFileSync(path.resolve(__dirname, 'wiki.html'), {encoding: 'UTF-8'});
const htmljson = tabletojson.convert(html, { stripHtmlFromCells: false })[0];
const parsedjson = tabletojson.convert(html)[0];

//console.log(`htmljson.length: ${htmljson.length}  parsedjson.length: ${parsedjson.length}`)
//console.dir(parsedjson, {depth: null})
//console.dir(htmljson, {depth: null})

const seedjson = [];

for (let i = 0; i < htmljson.length; i++) {
  const imghtml = htmljson[i]['Image']
  let tmpThumb, tmpType, tmpName

  if (imghtml.length > 0) {
    tmpThumb = 'https:' + imghtml.split(' ').filter(w => w.includes('src='))[0].split('"')[1]
  } else {
    tmpThumb = '/default.png'
  }

  if (parsedjson[i].Description == 'Sweet or savory') {
    tmpType = 'Savory or sweet';
  } else {
    tmpType = parsedjson[i].Description;
  }
  

  if (htmljson[i].Name.includes('<br')) {
    tmpName = htmljson[i].Name.split('title="')[1].split('"')[0]
  } else {
    tmpName = parsedjson[i].Name
  }

  let tmpPie = {
    name: tmpName,
    origin: parsedjson[i].Origin,
    type: tmpType,
    description:parsedjson[i].Description,
    thumbnailurl: tmpThumb,
    price: (Math.floor(Math.random() * (10000 - 100) + 100) / 100).toFixed(2), // price between 1.00 and 100.00
    quantity: Math.floor(Math.random() * (100 - 1) + 1),
  }

  //console.log(parsedjson[i].Name) 
  //console.log(htmljson[i].Name) 
  //console.log(tmpPie) 
//  console.log(parsedjson[i])
  //if (i == 1) process.exit();
  seedjson.push(tmpPie)
}
  
const data = JSON.stringify(seedjson);
await fs.writeFileSync('pies.json', data, {encoding:'utf8', flag:'w'});

}


main()


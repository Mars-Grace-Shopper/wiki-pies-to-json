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

for (let i = 0; i < htmljson.length; i++) {
  const ex = htmljson[i]['Image']
  if (ex.length > 0) {
  let tmpThumb = 'https:' + ex.split(' ').filter(word => word.includes('src='))[0].split('"')[1]
  parsedjson[i].ThumbnailUrl = tmpThumb
  } else {
    parsedjson[i].ThumbnailUrl = ''
  }
//  console.log(parsedjson[i])
}
  
const data = JSON.stringify(parsedjson);
await fs.writeFileSync('pies.json', data);

}


main()


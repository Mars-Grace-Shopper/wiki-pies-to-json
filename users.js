const fs = require("fs");


const main = async () => {
  // source: https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977
  statesArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  
  // source: https://gist.github.com/bdbaraban/46985c45eae42b4fe52f6ec6f50eb27c
  const streetSuffixArray = [ "Avenue", "Bypass", "Circus", "Close", "Crescent", "Drive", "Gardens", "Grove", "Hill", "Lane", "Mead", "Mews", "Place", "Rise", "Road", "Row", "Square", "Street", "Vale", "Way", "Wharf" ]
  
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
  
  let firstNamePool = await fs
    .readFileSync("wordlists/NAMES-F.TXT")
    .toString()
    .split("\n")
    .filter((e) => e !== "");
  const fullFirstNamePoolLength = firstNamePool.length;
  
  let lastNamePool = await fs
    .readFileSync("wordlists/NAMES.TXT")
    .toString()
    .split("\n")
    .filter((e) => e !== "");
  const fullLastNamePoolLength = lastNamePool.length;
  
  const uniqueName = (namePool, ) => {
  
    if (typeof fullNamePoolLength === undefined)  {
      //only run this once! at beginning
      const fullNamePoolLength = namePool.length
      console.log(`namePool.length: ${namePool.length}`)
    }
  
    const randomName = () => namePool[randomInt(0, namePool.length)];
    if (namePool.length == 0) {
      console.log(red("ERROR: NO MORE UNIQUE NAMES"));
      console.log(
        "Max names possible from name list file: ",
        fullNamePoolLength - 1
      );
      process.exit(1);
    } else {
      let tmpName = randomName();
      namePool = namePool.filter((item) => item !== tmpName);
      return tmpName.replace(/\r/g, "");
    }
  };
  
  const wordPool = fs
    .readFileSync("wordlists/COMMON.TXT")
    .toString()
    .split("\n")
    .filter((item) => item !== "")
    .filter((e) => !e.includes(" "))
    .filter((e) => !e.includes("-"))
    .filter((e) => !e.includes("'"));
  
  const randomWord = () => wordPool[randomInt(0, wordPool.length)].replace(/\r/g, "");
  const randomStreetSuffix = () => streetSuffixArray[randomInt(0, streetSuffixArray.length)];
  const randomState = () => statesArray[randomInt(0, statesArray.length)];
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const uncapitalizeFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);
  
  
  const randomString = (wordcount, maxchars) => {
    let tmpString = randomWord();
    while (wordcount > 0) {
      tmpString += " " + randomWord();
      wordcount--;
    }
    tmpString = tmpString.replace(/\r/g, "");
    if (maxchars) {
      return tmpString.substring(0, maxchars);
    } else {
      return tmpString;
    }
  };
  
  // --------------------------------------
  
  const seedjson = []

  for (let i = 0; i< 200; i++) {
    let fName = uniqueName(firstNamePool);
    let lName = uniqueName(lastNamePool);
    let tmpUser = {
      username: `${uncapitalizeFirstLetter(fName)}${lName.charAt(0).toLowerCase()}${randomInt(1,99)}`,
      firstName: fName,
      lastName: lName,
      password: '123', 
      email: `${fName}${lName}@seed.js`,
      type: 'user',
      streetAddress: `${randomInt(1,999)} ${capitalizeFirstLetter(randomWord())} ${randomStreetSuffix()}`,
      city: capitalizeFirstLetter(randomWord()),
      state: randomState(),
      zipcode: randomInt(10000,99999),
      cardHolderName: fName + ' ' + lName,
      cardNumber: `${randomInt(1000,9999)} ${randomInt(1000,9999)} ${randomInt(1000,9999)} ${randomInt(1000,9999)}`,
      cardExpiration: `${randomInt(1,12)} / ${randomInt(2022,2026)}`,
      CVV: `${randomInt(100,999)}`,
    }
    //  console.log(uniqueName(firstNamePool) + ' ' + uniqueName(lastNamePool))
    seedjson.push(tmpUser)
  }
  
  //console.log(seedjson)
  const data = JSON.stringify(seedjson);
  await fs.writeFileSync('users.json', data, {encoding:'utf8', flag:'w'});
}

main()




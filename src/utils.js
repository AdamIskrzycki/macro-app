
export const groupBy = (list, key) => {
    const groupedArray = [];
  
    list.forEach((item) => {
      const collection = groupedArray.find((elem) => elem[key] === item[key]);

      if (collection === undefined) {
        item.count = 1;
        groupedArray.push(item);
      } else {
        collection.count++
      }
    });
  
    return groupedArray;
  };

  export const halveMacros = (obj) => {

    for (let key in obj) {
      console.log(key, obj[key])
    }

    // for([key, value] of Object.entries(obj)) {
    //   const t = typeof value;
    //   switch(t) {
    //     // If the current property has a numeric value, set the value to 0.
    //     case 'number': obj[key] = 0; break;
    //     // Otherwise print some status information.
    //     default: console.log('The property '+key+'is of an unhandled type ('+t+').');
    //    }
    //  }
  }
  
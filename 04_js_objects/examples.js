let shoppingList = [
  {name: 'Apples', quantity: 2, price: 1.99},
  {name: 'Dates', quantity: 1, price: 5.99},
  {name: 'Coconut Water', quantity: 3, price: 2.49}
]


let total = shoppingList.reduce(function (total, currentItem) {
  return total + currentItem.quantity * currentItem.price
}, 0)


let meals = [
  {
    meal: 'Scrambled Eggs',
    mealType: 'breakfast'
  }, 
  {
    meal: 'Buttermilk Pancakes',
    mealType: 'breakfast'
  },
  {
    meal: 'Chocolate Protein Shake',
    mealType: 'breakfast'
  },
  {
    meal: 'BLT Sandwich',
    mealType: 'lunch'
  },
  {
    meal: 'Soup',
    mealType: 'lunch'
  },
  {
    meal: 'Burrito',
    mealType: 'lunch'
  },
  {
    meal: 'Indian Curry',
    mealType: 'dinner'
  },
  {
    meal: 'Grilled Chicken Caesar',
    mealType: 'dinner'
  },
  {
    meal: 'Fish & Chips',
    mealType: 'dinner'
  }
]
// the two functions below should take the array of meal objects and turn it into an object with keys for each mealType and values of arrays containing all meals of that type (as strings)
function generateMenuWithDotNotation(meals) {
  const newObj = {};
  newObj.breakfast = [];
  newObj.lunch = [];
  newObj.dinner = [];
  for (const meal in meals) {
    console.log('meal', meal);
    if (meal.mealType === 'breakfast') {
      newObj.breakfast.push(meal.meal)
    } else if (meal.mealType === 'lunch') {
      newObj.lunch.push(meal.meal)
    } else if (meal.mealType === 'dinner') {
      newObj.dinner.push(meal.meal)
    }
  }
  return newObj
}

console.log('generateMenuWithDotNotation', generateMenuWithDotNotation(meals))

function generateMenuWithBracketNotation(meals) {
	const newObj = {};
	for(const meal of meals) {
		const mealType = meal.mealType;
		// if(!newObj[mealType]) {
		//	newObj[mealType] = [];
		//}
		newObj[mealType] ||= []; // newObj[mealType] = newObj[mealType] || []
		newObj[mealType].push(meal.meal)
	}
	return newObj
}

console.log('generateMenuWithBracketNotation', generateMenuWithBracketNotation(meals))


function generateMenuWithBracketNotationAndReduce(meals) {
  return meals.reduce((obj, meal) => {
    obj[meal.mealType] ||= []; // obj[meal.mealType] = obj[meal.mealType] || [];
    obj[meal.mealType].push(meal.meal);
    return obj;
  }, {})
  // const callback = (obj, meal) => {
  //   obj[meal.mealType] ||= []; // obj[meal.mealType] = obj[meal.mealType] || [];
  //   obj[meal.mealType].push(meal.meal);
  //   return obj;
  // }
  // return meals.reduce(callback, {})
}

console.log('generateMenuWithBracketNotationAndReduce', generateMenuWithBracketNotationAndReduce(meals))
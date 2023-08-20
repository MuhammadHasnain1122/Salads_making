'use client'

import { useSelector } from "react-redux";

export default function dailyUpdate({searchParams}) {

    const salads = useSelector(state => state.data.salads)
    const subscriptions = useSelector(state => state.data.subscriptions)
    const ingredients = useSelector(state => state.data.ingredients)
    const propsObj = searchParams.selectedWeekdays
    const propsIds = propsObj.length === 1 ? propsObj : propsObj.map(str => parseInt(str))
    const filteredWeekdays = [];
        for (const item of subscriptions) {
        for (const weekday of item.weekdays) {
            if (propsIds.includes(weekday)) {
              filteredWeekdays.push(item);
              break; // Break the inner loop after finding a match
            }
          }
        }
    const subscriperId = filteredWeekdays.map(item => item.id)
    const filterSalads = salads.filter(salad => subscriperId.includes(salad.subscriper))
    const saladsIngredients = filterSalads.map(item => item.ingredients)  
    const ingredientObj = {}
    saladsIngredients.forEach(innerArray => {
        innerArray.forEach(item => {
            const {id, numOfServings } = item;
            if (ingredientObj[id]) {
                ingredientObj[id] += numOfServings;
              } else {
                ingredientObj[id] = numOfServings;
              }
        })
    })
    const ingredientsArray = Object.keys(ingredientObj).map(id => ({
        id: parseInt(id),
        numOfServings: ingredientObj[id]
      }));
    
    const combinedIngredients = ingredientsArray.map(ingredient => {
    const ingred = ingredients.find(item => item.id === ingredient.id);
    return {
        id: ingredient.id,
        name: ingred.name,
        amount: ingredient.numOfServings,
        cost: ingred.costPerServing,
        weight: ingred.weightPerServing,
        totalCost: (ingred.costPerServing * ingredient.numOfServings).toFixed(2),
        totalWeight: ingred.weightPerServing * ingredient.numOfServings
    }
    })

      const totalCosts = combinedIngredients.map(item => parseFloat(item.totalCost.replace(/[ €]/g, '')));
      const totalWeights = combinedIngredients.map(item => (item.totalWeight));
      const totalCost = totalCosts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const totalWeight = totalWeights.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    if(salads.length === 0 || subscriptions.length === 0) {
        return <div >loading...</div>
    }

    else if (filterSalads.length === 0) {
        return <div className="flex flex-row justify-center p-24 text-xl">
            No user has subscribed to a salad yet!
        </div>
    }

  return (
    <main className="flex flex-col items-center py-24">
        <div className="space-y-12">
        <table className="table-auto border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Ingredient</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Cost Per Serving</th>
                <th className="border px-4 py-2">Weight Per Serving</th>
                <th className="border px-4 py-2">Total Cost</th>
                <th className="border px-4 py-2">Total Weight</th>
              </tr>
            </thead>
            <tbody>
              {combinedIngredients.map(ingredient => (
                <tr key={ingredient.id}>
                  <td className="border px-4 py-2">{ingredient.id}</td>
                  <td className="border px-4 py-2">{ingredient.name}</td>
                  <td className="border px-4 py-2">{ingredient.amount}</td>
                  <td className="border px-4 py-2">{ingredient.cost} €</td>
                  <td className="border px-4 py-2">{ingredient.weight} g</td>
                  <td className="border px-4 py-2">{ingredient.totalCost} €</td>
                  <td className="border px-4 py-2">{ingredient.totalWeight} g</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-y-2">
             <div className="flex flex-row justify-center text-xl font-semibold">The total weight for the selected days is {totalWeight} g</div>
             <div className="flex flex-row justify-center text-xl font-semibold">The total cost for the selected days is {totalCost.toFixed(2)} €</div>
          </div>
        </div>
    </main>
  )
}

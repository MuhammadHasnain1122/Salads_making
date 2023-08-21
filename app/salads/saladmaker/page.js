'use client'

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function saladmaker() {

  const router = useRouter();
  const businessLogic = useSelector(state => state.data.businessLogic);
  const subscriptions = useSelector(state => state.data.subscriptions);
  const ingredientsList = useSelector(state => state.data.ingredients);
  const [showPopup, setShowPopup] = useState(false);
  const [ingredient, setIngredint] = useState([{id: 1, serving: 1, ingredientId: '', weight: 0, cost: 0}]);
  const [selectedIngredientCount, setSelectedIngredientCount] = useState(0);
  const [saladName, setSaladName] = useState('Name Your Salad');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [saladSizeInfo, setSaladSizeInfo] = useState({targetCost: 3.5, targetWeight: 350})
  const [subscriper, setSubscriper] = useState('')
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');
  const [salad, setSalad] = useState({
        name: saladName,
        size: selectedSize,
        ingredients: ingredient,
        price: cost,
        subscriper: subscriper
  })



  useEffect(() => {
      let totalCost = 0;
      for (let i = 0; i < ingredient.length; i++) {
        totalCost += ingredient[i].cost;
      }
      const formattedTotalCost = totalCost.toFixed(2)
      setCost(formattedTotalCost)

      let totalWeight = 0;
      for (let i = 0; i < ingredient.length; i++) {
        totalWeight += ingredient[i].weight;
      }
      setPrice(totalWeight)
  }, [ingredient])

  const submitClick = async () => {
    // Handle the user's confirmation
    setShowPopup(false);

    try {
      await fetch('/api/salads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salad),
      });
      // Redirect or update state as needed
    } catch (error) {
      console.error('Error creating item:', error);
    }
    router.push('/salads')
  };

  const cancelClick = () => {
    // Handle the user's cancellation
    setShowPopup(false);
  };

  const Submit = () => {

    if (saladName.trim() === 'Name Your Salad') {
      alert('Please provide a valid salad name.');
      return;
    }
    if (!subscriper) {
      alert('Please select a user.');
      return;
    }
    if (selectedIngredientCount === 0) {
      alert('Please select at least one ingredient.');
      return;
    }

    const ingredients = ingredient.map(item => ({
      id: item.ingredientId,
      numOfServings: item.serving
    }));

    setSalad({
      name: saladName,
      size: selectedSize,
      ingredients: ingredients,
      price: cost,
      subscriper: subscriper
})
  setShowPopup(true)
  }

  const cancelButton = () => {
    router.push('/salads')
  };

  const sizeChange = event => {
    const saladType = businessLogic.saladTypes[event.target.value];
    setSaladSizeInfo(saladType)
    setSelectedSize(event.target.value);
  };

  const subscriptionChange = event => {
    setSubscriper(parseInt(event.target.value));
  };

  const selectChange = (e, id) => {
    const ingredientId = parseInt(e.target.value);
    const ingredientObj = ingredientsList.filter(ingredient => ingredient.id === ingredientId)
      const weightValue = ingredientObj[0].weightPerServing;
      const costValue = ingredientObj[0].costPerServing;
      const updatedIngredients = ingredient.map(ingredient => {
      if (ingredient.id === id) {
        return {id: id, serving: 1, ingredientId: parseInt(e.target.value), weight: weightValue, cost: costValue };
      }
      return ingredient;
    });
    setIngredint(updatedIngredients);
    setSelectedIngredientCount(selectedIngredientCount + 1);
    }

  const addRow = () => {
    setIngredint([...ingredient, { id: ingredient.length + 1, serving: 1, ingredientId: '', weight: 0, cost: 0 }]);
  };

  const deleteRow = (id) => {
    const updatedIngredients = ingredient.filter(ingredient => ingredient.id !== id);
    setIngredint(updatedIngredients);
    setSelectedIngredientCount(selectedIngredientCount - 1);
  };

  const increment = (id) => {
    const updatedIngredients = ingredient.map(ingredient => {
      if (ingredient.id === id) {
        const weight = ingredient.weight / ingredient.serving;
        const cost = ingredient.cost / ingredient.serving;
        return {
          ...ingredient,
          serving: ingredient.serving + 1,
          weight: weight * (ingredient.serving + 1),
          cost: cost * (ingredient.serving + 1)
        };
      }
      return ingredient;
    });
    setIngredint(updatedIngredients);
  };
  
  const decrement = (id) => {
    const updatedIngredients = ingredient.map(ingredient => {
      if (ingredient.id === id && ingredient.serving > 1) {
        const weight = ingredient.weight / ingredient.serving;
        const cost = ingredient.cost / ingredient.serving;
        return {
          ...ingredient,
          serving: ingredient.serving - 1,
          weight: weight * (ingredient.serving - 1),
          cost: cost * (ingredient.serving - 1)
        };
      }
      return ingredient;
    });
    setIngredint(updatedIngredients);
  };

  return (
    <main className='flex flex-col items-center space-y-9 py-24'>

      <div className='flex flex-col items-start justify-start w-full px-10'>
        <div className='flex flex-col items-start justify-start'>
            <select
            value={subscriper}
            onChange={subscriptionChange}
            className="border rounded p-1">
              <option>Select User</option>
            {subscriptions.map(item => (
              <option value={item.id} key={item.id}>{item.name}</option>
            ))}
            </select>
        </div>
      </div>
            <div className="flex flex-col space-y-8 p-4">
               <div>
                    <div className='flex flex-row justify-between border-b-2 border-slate-200'>
                            <input 
                                className='text-[24px] focus:border-none focus:outline-none'
                                type='text'
                                value={saladName}
                                onChange={(e) => setSaladName(e.target.value)}
                            />
                                <div className="flex items-center">
                                    <select
                                    value={selectedSize}
                                    onChange={sizeChange}
                                    className="border rounded p-1">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    </select>
                                </div>
                    </div>
                    <div>
                        <p>total cost/weight:  {saladSizeInfo.targetCost}€ /{saladSizeInfo.targetWeight}g</p>
                    </div>
               </div>
               <div>
                    <div className='flex flex-row justify-between'><p>total cost: {cost} €</p><p>total weight: {price} g</p></div>
                        {ingredient.map(ingredient => (
                            <div key={ingredient.id} className='flex flex-row items-center space-x-1 bg-gray-100 p-3 border-transparent rounded-md mb-2'>
                            <div className='pr-24 '>
                              <select
                              onChange={(e) => selectChange(e, ingredient.id)}
                              className="border rounded p-1"
                              >
                              <option value=''>Select Your Ingredient</option>
                              {ingredientsList.map(ingredient => (
                                  <option key={ingredient.id} value={ingredient.id}
                                  >
                                      {ingredient.name}
                                  </option>
                                  ))}
                              </select>
                          </div>
                          <div className='flex flex-row items-center space-x-2'>
                              <p>Servings</p>
                              <p className='pr-2 font-semibold'>{ingredient.serving}</p>
                          </div>
                          <div>
                              <button 
                                  onClick={() => decrement(ingredient.id)}
                                  className="bg-gray-300 p-2 rounded text-sm mr-1">
                                  -
                              </button>
                          </div>
                          <div>
                              <button
                                  onClick={() => increment(ingredient.id)}
                                  className="bg-gray-300 p-2 rounded text-sm">
                                  +
                              </button>
                          </div>
                          <div className='pr-8'>
                              <p>{ingredient.weight} g</p>
                          </div>
                          <div className='pr-2'>
                              <p>{ingredient.cost.toFixed(2)} €</p>
                          </div>
                          <div>
                              <button
                                  onClick={() => deleteRow(ingredient.id)}
                                  className="text-red-600 p-1 rounded ml-2"
                                  >
                                  <FaTrash />
                              </button>
                          </div>
                          </div>
                        ))}
               </div>
                <div className="w-full">
                    <button onClick={addRow} className="w-full bg-green-500 text-white p-2 rounded mr-2">
                    Add Ingredient
                    </button>
                </div>
                <div className='flex flex-row justify-end space-x-3'>
                    <button type='button' onClick={cancelButton} className="bg-red-500 text-white p-2 rounded">Cancel</button>
                    <button type='button' onClick={Submit} className="bg-blue-500 text-white p-2 rounded">Make Salad</button>
                </div>
            </div>
            {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-24 border rounded shadow-md">
                  <p className="text-center mb-4">Are you sure, you want to make the salad?</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={submitClick}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={cancelClick}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
          )}
    </main>
  );

}







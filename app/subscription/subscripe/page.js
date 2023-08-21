'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function subscripe() {

  const router = useRouter();
  const [name, setName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const weekdays = [{id: 1, label: 'Monday'}, {id: 2, label: 'Tuesday'}, {id: 3, label: 'Wednesday'}, {id: 4, label: 'Thursday'}, {id: 5, label: 'Friday'}];
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedSize, setSelectedSize] = useState('small');
  const [time, setTime] = useState('morning');
  const [userDetail, setUserDetail] = useState({
    name: name,
    type: selectedSize,
    weekdays: selectedItems,
    timePreference: time,
  })

  const OnSubmit = () => {

    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }
    if (selectedItems.length === 0) {
      alert('Please select at least one weekday.');
      return;
    }

    setUserDetail({
      name: name,
      type: selectedSize,
      weekdays: selectedItems,
      timePreference: time,
    })
    setShowPopup(true);
  }

  const submitClick = async () => {
    // Handle the user's confirmation
    setShowPopup(false);
    try {
      await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetail),
      });
      // Redirect or update state as needed
    } catch (error) {
      console.error('Error creating item:', error);
    }
    router.push('/subscription?reload=true');
  };

  const cancelClick = () => {
    // Handle the user's cancellation
    setShowPopup(false);
  };

  const cancelButton = () => {
    router.push('/subscription')
  };

  function checkboxHandler(e){
		let isSelected = e.target.checked;
		let value = parseInt(e.target.value);

		if( isSelected ){
			setSelectedItems( [...selectedItems, value ] )
		}else{
			setSelectedItems((prevData)=>{
				return prevData.filter((id)=>{
					return id!==value
				})
			})
		}
    setUserDetail({
      name: name,
      type: selectedSize,
      weekdays: selectedItems,
      timePreference: time,
    })
	}

  return (
    <main className='flex flex-row justify-center py-24'>

       <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Subscription Form</h2>
          <form>
            <div className="flex flex-col space-y-5 pt-5">
                  <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row space-x-2 items-center">
                        <label>Name</label>
                        <input
                          placeholder="Your Name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border rounded p-2 w-full"
                        />
                      </div>
                      <div className="flex flex-row space-x-2 items-center">
                        <label>Size</label>
                            <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="border rounded p-2">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            </select>
                        </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center space-x-2">
                          <label>Time Prefrence</label>
                          <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="border rounded p-2">
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                          </select>
                      </div>
                  </div>
                  <div className="flex flex-row">
                    <p className="pr-8">Weekdays</p>
                     {weekdays.map((item,index)=><div className="card" key={index}>
                        <input type="checkbox" checked={ selectedItems.includes( item.id ) } value={item.id} onChange={checkboxHandler}    />
                        <label className="mr-5">{item.label}</label>
                  </div>)}
                  </div>
                  <div className="flex flex-row justify-end items-center space-x-2">
                    <button type="button" onClick={cancelButton} className="bg-red-500 text-white p-2 rounded">Cancel</button>
                    <button onClick={OnSubmit} type="button" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                  </div>
            </div>
          </form>
        </div>
        {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-24 border rounded shadow-md">
                  <p className="text-center mb-4">Are you sure, you want to subscripe?</p>
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
  )
}

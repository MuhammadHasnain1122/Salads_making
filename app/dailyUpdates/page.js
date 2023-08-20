'use client'

import { useState } from "react";
import Link from "next/link";


export default function dailyupdates() {

  const weekdays = [{id: 1, label: 'Monday'}, {id: 2, label: 'Tuesday'}, {id: 3, label: 'Wednesday'}, {id: 4, label: 'Thursday'}, {id: 5, label: 'Friday'}];
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  function checkboxHandler(e){
    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);

    if( isSelected ){
        setSelectedWeekdays( [...selectedWeekdays, value ] )
    }else{
        setSelectedWeekdays((prevData)=>{
            return prevData.filter((id)=>{
                return id!==value
            })
        })
    }
}

  return (
    <main className="flex flex-col items-center py-24 space-y-16">
        <div className="text-3xl font-semibold">See total cost for the Selected Weekdays</div>
        <div className="flex flex-row justify-center">
                  {weekdays.map((item,index)=><div className="card" key={index}>
                        <input type="checkbox" checked={ selectedWeekdays.includes( item.id ) } value={item.id} onChange={checkboxHandler}    />
                        <label className="mr-5">{item.label}</label>
                  </div>)}
        </div>
        <div>
            {selectedWeekdays.length === 0 ? 
            <p className="text-xl">Please select some days.</p> :
            <Link href={{pathname: '/dailyUpdates/dailyUpdate', query:{selectedWeekdays}}}>
                <button type='button' className="bg-blue-500 text-white p-2 rounded">See Result</button>
            </Link>
            }
        </div>
    </main>
  )
}

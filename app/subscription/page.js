'use client'

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSubscriptions } from "../store/dataSlice";


export const Subscriptions = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSubscriptions)
  }, [])

  const subscriptions = useSelector(state => state.data.subscriptions);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];



  if(!subscriptions) {
    return <div>loading...</div>
  }

  return (
    <main className="flex flex-row justify-center p-24">
        <div className="flex flex-col items-center space-y-10">

          <div className="flex flex-row justify-between w-full items-center">
          <h1 className="text-xl font-medium">
            Subscribtions
          </h1>
            <Link href='/subscription/subscripe'>
             <button
               className='bg-slate-200 p-4 border-transparent rounded-md'
                type='button'
              >
                Subscribe
              </button>
            </Link>
         </div>

        <table className="table-auto border-collapse border">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Type</th>
          <th className="border px-4 py-2">Time Preference</th>
          {daysOfWeek.map((day, index) => (
            <th key={index} className=" px-4 py-2 text-center">
              <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                {day.substr(0, 1)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((subscription) => ( 

          <tr key={subscription.id}>
          <td className="border px-4 py-2">{subscription.id}</td>
          <td className="border px-4 py-2">{subscription.name}</td>
          <td className="border px-4 py-2">{subscription.type}</td>
          <td className="border px-4 py-2">{subscription.timePreference}</td>
          {daysOfWeek.map((day, index) => (
            <td
              key={index}
              className=" px-4 py-2 text-center"
            >
              {subscription.weekdays.includes(index + 1) ? '✓' : 'X'}
            </td>
          ))}
        </tr>
        ))}
      </tbody>
    </table>
        </div>
    </main>
  )
};

export default Subscriptions;

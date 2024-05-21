import React from 'react'

const Expenselist = [
    {
        "id":1,
        "title": "medicine for me",
        "date":"4/23/2024",
        "amount":1000.00,
        "category":"Health",
    },
    {
        "id":2,
        "title": "medicine for me",
        "date":"4/23/2024",
        "amount":1000.00,
        "category":"Health",
    },
    {
        "id":3,
        "title": "medicine for me",
        "date":"4/23/2024",
        "amount":1000.00,
        "category":"Health",
    },
    {
        "id":4,
        "title": "medicine for me",
        "date":"4/23/2024",
        "amount":1000.00,
        "category":"Health",
    }

]

const Expenses = () => {
    return (
        <div className='w-full'>
            <table className='w-full'>
                <tr className='w-full border-b border-slate-300 p-4 h-12'>
                    <th className='w-1/6  px-2 text-start'>Date</th>
                    <th className='w-3/6  px-2 text-start'>Title</th>
                    <th className='w-1/6  px-2 text-end'>Amount</th>
                    <th className='w-1/6  px-2 text-center'>Actions</th>
                </tr>
                {Expenselist.map((expense)=>(
                <tr className='w-full border-b border-slate-300 p-4 h-10 odd:bg-slate-300 text-sm ' key={expense.id}>
                    <td className='w-1/6  px-2 text-start'>{expense.date}</td>
                    <td className='w-3/6  px-2 text-start'>{expense.title}</td>
                    <td className='w-1/6  px-2 text-end'>{expense.amount}</td>
                    <td className='w-1/6 px-2 '>
                        <button className='place-self-center bg-primary'>Edit</button>
                    </td>
                </tr>

                ))}
            </table>
        </div>
    )
}

export default Expenses;

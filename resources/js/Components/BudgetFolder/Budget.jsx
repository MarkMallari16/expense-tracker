
import { Button } from '@material-tailwind/react'
import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";


const Budget = ({ dailyBudget, weeklyBudget, monthlyBudget }) => {
    return (
        <div className='w-full bg-white mt-5 p-5 rounded-sm'>
            <div>
                <div className='budget-container'>
                    <h2 className='font-bold text-xl'>Budget</h2>
                    <div className='text-gray-600'>
                        Current Budget
                    </div>
                    <div className='mt-5'>
                        <div className='font-bold text-md flex justify-between flex-wrap'>
                            <div className=' text-center'>Daily</div>
                            <div className='text-center'>Weekly</div>
                            <div className=' text-center'>Monthly</div>
                        </div>
                        <div className='text-sm mt-2 flex justify-between  flex-wrap'>
                            <div className='text-center'>{1}</div>
                            <div className='text-center'>{2}</div>
                            <div className='text-center'>{3}</div>
                        </div>
                    </div>
                    <div className='flex flex-col mt-5 gap-2 justify-center'>
                        <div>
                            <Button className='w-full  flex items-center justify-center gap-1' color='red'>Deduct Budget  <FaMinus /></Button>


                        </div>
                        <div >
                            <Button className='w-full  flex items-center justify-center  gap-1' color='blue'>Increase Budget <FaPlus />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Budget

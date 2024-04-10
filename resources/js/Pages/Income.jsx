import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import IncomeHistory from '@/Components/IncomeHistory';
import { QuoteIcon } from 'lucide-react';

function Income({ auth, income }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className='flex flex-col sm:flex-row gap-10'>
                <div className='w-full sm:w-[65%] p-4'>
                    <div className="bg-white h-auto w-full rounded-md flex">
                        <div className='w-[5%] p-2'>
                            <QuoteIcon size={30} fill='black' />
                        </div>
                        <div className='p-5 h-auto'>
                            <p>It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.</p>
                        </div>
                    </div>

                    <div className='mt-10 mx-10'>
                        <p className='text-2xl font-bold pl-2'>Income Today</p>
                        <span className='text-8xl font-bold '>P{totalIncome.toLocaleString()}</span>
                        <p className='px-1 text-xl mt-4'>Potential Income This Month <span className='font-bold'>P200,500</span></p>
                    </div>


                    <div className='bg-blue-800 w-full flex flex-wrap p-3 mt-8 mx-2 gap-2 rounded-lg'>
                        <div className='w-44 h-24 bg-white rounded-md'>
                            <p className='text-2xl pt-2 px-2 font-bold'>Job</p>
                            <p className='p-2'>P15,000/Monthly</p>
                        </div>

                        <div className='w-44 h-24 bg-white rounded-md'>
                            <p className='text-2xl pt-2 px-2 font-bold'>Part Time</p>
                            <p className='p-2'>Depends</p>
                        </div>

                        <div className='w-44 h-24 bg-white rounded-md'>
                            <p className='text-2xl pt-2 px-2 font-bold'>Business</p>
                            <p className='p-2'>P2,000 Today</p>
                        </div>

                        <div className='w-44 h-24 bg-white rounded-md'>
                            <p className='text-2xl pt-2 px-2 font-bold'>Part Time</p>
                            <p className='p-2'>Depends</p>
                        </div>

                        <div className='w-44 h-24 bg-white rounded-md'>
                            <p className='text-2xl pt-2 px-2 font-bold'>Part Time</p>
                            <p className='p-2'>Depends</p>
                        </div>

                    </div>

                </div>

                <div className='mt-4 mx-3 sm:w-[32%] rounded-md bg-white h-[100vh]'>
                    <div className='mx-3 mt-10 mb-5 flex justify-end'>
                        <span className='bg-blue-800 p-2 rounded-md text-white cursor-pointer' >+ Income</span>

                    </div>
                    <div className='px-2 flex flex-col gap-3'>
                        {
                            income.map(distribute => {

                                return <IncomeHistory title={distribute.title} income={distribute.income} time={distribute.created_at} />
                            })

                        }

                    </div>

                </div>
            </div>




        </AuthenticatedLayout>
    )
}

export default Income

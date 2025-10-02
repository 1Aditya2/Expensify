import React from 'react'
import BalanceTrend from './BalanceTrend'
import PeriodToPeriod from './PeriodToPeriod'

const Analytics = () => {
  return (
    <div className='ml-6 mt-4 gap-4'>
      <div className='flex items-start flex-wrap justify-center gap-2 w-full overflow-auto h-[87vh]'>
        <BalanceTrend/>
        <PeriodToPeriod/>
      </div>
    </div>
  )
}

export default Analytics
import React from 'react'
import { useLocalization } from '@/hooks/useLocalization'

const CountdownTimer = () => {
  const { localization } = useLocalization()

  return (
    <div className="flex flex-col items-center justify-center m-3 max-sm:m-1">
      <p className="mt-4 text-md text-gray-600 text-center max-sm:text-[12px] max-sm:mt-1 font-bold">
        {localization.countDownMessage}
      </p>
    </div>
  )
}

export default CountdownTimer

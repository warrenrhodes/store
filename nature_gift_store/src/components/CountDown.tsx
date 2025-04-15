import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocalization } from '@/hooks/useLocalization'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 59,
    seconds: 16,
  })
  const { localization } = useLocalization()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              if (days > 0) {
                days -= 1
              } else {
                // Timer completed
                clearInterval(timer)
                return prevTime
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hour', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-col items-center justify-center m-3 max-sm:m-1">
      <div className="flex justify-center  items-center gap-4 max-sm:gap-1 max-sm:h-10">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <motion.div className="flex flex-col items-center justify-center" layout>
              <motion.div
                key={`${unit.label}-${unit.value}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl max-md:text-2xl max-sm:text-[14px] max-xs:text-xs font-bold">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-sm mt-1 max-sm:text-[8px] max-sm:mt-0">{unit.label}</span>
              </motion.div>
            </motion.div>

            {index < timeUnits.length - 1 && (
              <span className="text-3xl font-bold text-[12px]">:</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="mt-4 text-md text-gray-600 text-center max-sm:text-[12px] max-sm:mt-1">
        {localization.countDownMessage}
      </p>
    </div>
  )
}

export default CountdownTimer

"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
    const currentDate = new Date()
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
    const bookings = useProperty((state) => state.bookings)
    const {toast} = useToast()

    const blockedPeriods = generateBlockedPeriods({
      bookings,
      today: currentDate
    })

    const unavailableDates = generateDisabledDates(blockedPeriods)
    console.log(unavailableDates)

    useEffect(()=> {
      const selectedRange = generateDateRange(range)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isDisabledDateIncluded = selectedRange.some((date) => {
        if (unavailableDates[date]) {
          setRange(defaultSelected)
          toast({
            description: 'Some dates are booked. Please select again'
          })
          return true
        }
        return false
      })

        useProperty.setState({range})
    },[range])

  return (
    <Calendar 
        mode="range"
        defaultMonth={currentDate}
        selected={range}
        onSelect={setRange}
        className="mb-4" disabled={blockedPeriods}>
        
    </Calendar>
  )
}

export default BookingCalendar
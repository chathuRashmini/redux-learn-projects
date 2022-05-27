import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { increment, decrement, reset, incrementByAmount } from './counterSlice'

const Counter = () => {

    // const count = useSelector((state) => state.counter.count)
    const count = 20

    const dispatch = useDispatch()

    const [incAmount, setincAmount] = useState(10)

    const addValue = Number(incAmount) || 0

    const resetAll = () => {
        setincAmount(0)
        dispatch(reset())
    }

    useEffect(() => {
      console.log(1+2)
    }, [])
    

    return (
        <section>
            <p>{count}</p>

            <div>
                <button onClick={() => dispatch(increment)}>+</button>
                <button onClick={() => dispatch(decrement)}>-</button>
            </div>

            <input 
                type="text" 
                value={incAmount}
                onChange={(e) => setincAmount(e.target.value)}
            />

            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
                <button onClick={resetAll}>Reset All</button>
            </div>
        </section>
    )
}

export default Counter
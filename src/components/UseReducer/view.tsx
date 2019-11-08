import * as React from 'react';
const { useState, useEffect, useReducer } = React;

const initState = {
  data: [],
}

const addData = [
  {
    "id": "nem",
    "name": "NEM",
    "symbol": "XEM",
    "rank": "27",
    "price_usd": "0.0410977168",
    "price_btc": "0.00000448",
    "24h_volume_usd": "31888115.2294",
    "market_cap_usd": "369879451.0",
    "available_supply": "8999999999.0",
    "total_supply": "8999999999.0",
    "max_supply": null,
    "percent_change_1h": "-1.73",
    "percent_change_24h": "-3.39",
    "percent_change_7d": "1.14",
    "last_updated": "1573201022"
  },
]

export interface ReducerStateType {
  data: any[];
}

export interface ReducerActionType {
  type: 'increment',
  data: any[];
}

export function reducer(state: ReducerStateType = initState, action: ReducerActionType) {
  switch (action.type) {
    case 'increment':
      return { data: [...state.data, ...action.data] };
    default:
      return state;
  }
}

export default function UseReducer() {
  const [flag, setFlag] = useState(true);
  const [state, dispatch] = useReducer(reducer, initState);

  async function getData() {
    const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10');
    const data = await response.json();
    dispatch({ type: 'increment', data });
  }

  useEffect(() => {
    getData();
  }, [])

  function handleClick() {
    dispatch({ type: 'increment', data: addData });
    setFlag(false);
  }

  return (
    <div>
      <ul>
        {
          state.data.map((item: any) => (
            <li key={item.id}>{item.price_usd}</li>
          ))
        }
      </ul>
      <button style={{ display: flag ? 'inline-block' : 'none' }} onClick={handleClick}>add</button>
    </div>
  )
} 
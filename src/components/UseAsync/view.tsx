import * as React from 'react';
import useFecth from './useFetch';

export default function UseAsync() {
  const data = useFecth({ url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10' });
  return (
    <div>
      <ul>
        {
          data.map((item: any) => (
            <li key={item.id}>{item.price_usd}</li>
          ))
        }
      </ul>
    </div>
  )
}
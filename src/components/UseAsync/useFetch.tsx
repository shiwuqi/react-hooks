import * as React from 'react';
import { UseFetchProps } from '../UseFecth';
const { useState, useEffect } = React;

export default function useFetch(props: UseFetchProps) {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch(props.url);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return data;
}
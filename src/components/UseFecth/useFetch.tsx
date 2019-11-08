import * as React from 'react';
const { useState, useEffect } = React;

export interface UseFetchProps {
  url: string;
}

export default function useFetch(props: UseFetchProps) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(props.url)
      .then(response => response.json())
      .then(data => setData(data));
  }, [])

  return data;
}
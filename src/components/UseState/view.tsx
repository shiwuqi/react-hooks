import * as React from 'react';
const { useState } = React;

export default function UseState() {
  const [buttonText, setButtonText] = useState('Click me, please');

  return (
    <button onClick={() => setButtonText('Thanks, been clicked!')}>{buttonText}</button>
  )
}
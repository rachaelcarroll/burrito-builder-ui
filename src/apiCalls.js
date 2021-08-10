export const getOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  const data = await checkForErrors(response);
  return data
}

export const postOrder = async (burrito) => {
  const response = await fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(burrito)
  })

  const data = await checkForErrors(response);
  return data
}

export const checkForErrors = response => {
  if (response.status === 404) {
    throw new Error('Oops, something went wrong. Please try again later.');
  } else if (response.status === 500) {
    throw new Error('Our servers seem to be down, please check back later!');
  } else if (response.ok) {
    return response.json();
  } else {
    throw new Error('Oops, something went wrong. Please try again!');
  }
};
export const getOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  const data = await response.json()
  return data
}

export const postOrder = async (burrito) => {
  const response = await fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(burrito)
  })

  const data = await response.json()
  return data
}
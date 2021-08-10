export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
  .then(response => {
    if(!response.ok) {
      throw Error('Error fetching orders')
    }
    return response.json()
  })
}

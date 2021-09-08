import axios from 'axios'

export const fetchFullBoard = async (id) => {
  const req = await axios.get(`http://localhost:8080/v1/boards/${id}`)
  return req.data
}
import axios from 'axios'
import { API_ROOT_CONFIRM } from '../../untilities/constants'

export const updateBoard = async (id, data) => {
  const req = await axios.put(`${API_ROOT_CONFIRM}/v1/boards/${id}`, data)
  return req.data
}

export const fetchFullBoard = async (id) => {
  const req = await axios.get(`${API_ROOT_CONFIRM}/v1/boards/${id}`)
  return req.data
}

export const createNewColumn = async (data) => {
  const req = await axios.post(`${API_ROOT_CONFIRM}/v1/columns`, data)
  return req.data
}

export const updateColumnAPI = async (id, data) => {
  const req = await axios.put(`${API_ROOT_CONFIRM}/v1/columns/${id}`, data)
  return req.data
}

export const createNewCard = async (data) => {
  const req = await axios.post(`${API_ROOT_CONFIRM}/v1/cards`, data)
  return req.data
}
export const updateCardAPI = async (id, data) => {
  const req = await axios.put(`${API_ROOT_CONFIRM}/v1/cards/${id}`, data)
  return req.data
}
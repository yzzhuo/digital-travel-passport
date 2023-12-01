import { AxiosRequestConfig } from 'axios'
import { callExternalApi } from './external-api.service'
import { ApiResponse } from '../models/api-response'
import { StampPostData } from '../models/stamp'
import { User } from '../models/user'

const apiServerUrl = import.meta.env.VITE_APP_API_SERVER_URL

export const fetchCurrentUser = async (accessToken: string) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/current_user/`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const { data, error } = (await callExternalApi({ config })) as ApiResponse
  return {
    data,
    error,
  }
}

export const updateUser = async (accessToken: string, body: Partial<User>) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/current_user/`,
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  }
  const { data, error } = (await callExternalApi({ config })) as ApiResponse
  return {
    data,
    error,
  }
}

export const fetchPlaceList = async (url?: string) => {
  const config: AxiosRequestConfig = {
    url: url || `${apiServerUrl}/place`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }
  const { data, error } = (await callExternalApi({ config })) as ApiResponse
  return {
    data,
    error,
  }
}

export const fetchPlaceDetail = async (placeId: string) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/place/${placeId}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }
  const { data, error } = (await callExternalApi({ config })) as ApiResponse
  return {
    data,
    error,
  }
}

export const saveStamp = async (
  accessToken: string,
  data: Partial<StampPostData>,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/stamp/`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  }
  const { data: responseData, error } = (await callExternalApi({
    config,
  })) as ApiResponse
  return {
    data: responseData,
    error,
  }
}

export const saveStampPhoto = async (
  accessToken: string,
  file: File,
  stamp: string,
) => {
  const fd = new FormData()
  fd.append('photo', file)
  fd.append('stamp', stamp)
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/stamp_photo/`,
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
    data: fd,
  }
  const { data: responseData, error } = (await callExternalApi({
    config,
  })) as ApiResponse
  return {
    data: responseData,
    error,
  }
}

export const deleteStampPhoto = async (
  accessToken: string,
  stampPhotoId: number,
) => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/stamp_photo/${stampPhotoId}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const { data: responseData, error } = (await callExternalApi({
    config,
  })) as ApiResponse
  return {
    data: responseData,
    error,
  }
}

export const updateStamp = async (
  accessToken: string,
  stampId: string,
  data: Partial<StampPostData>,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/stamp/${stampId}/`,
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  }
  const { data: responseData, error } = (await callExternalApi({
    config,
  })) as ApiResponse
  return {
    data: responseData,
    error,
  }
}

export const fetchStamps = async (
  accessToken: string,
  query?: Record<string, string>,
): Promise<ApiResponse> => {
  const queryString = Object.keys(query || {})
    .map((key) => `${key}=${query[key]}`)
    .join('&')
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/stamp/?${queryString}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const { data, error } = (await callExternalApi({ config })) as ApiResponse
  return {
    data,
    error,
  }
}

export const fetchStampDetail = async (
  accessToken: string,
  stampId: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/stamp/${stampId}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const { data, error } = (await callExternalApi({ config })) as ApiResponse
  return {
    data,
    error,
  }
}

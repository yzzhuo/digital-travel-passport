function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // 地球半径（单位：公里）
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // 计算两点之间的直线距离（单位：公里）
  return distance
}

export function checkDistance(
  latitude,
  longitude,
  targetLatitude,
  targetLongitude,
  // 假设设定的最大距离为 5 公里
  maxDistance = 5,
) {
  const userDistance = calculateDistance(
    latitude,
    longitude,
    targetLatitude,
    targetLongitude,
  )
  if (userDistance <= maxDistance) {
    return true
  } else {
    return false
  }
}

export function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position)
        },
        (error) => {
          reject(error)
        },
      )
    } else {
      reject('浏览器不支持 Geolocation')
    }
  })
}

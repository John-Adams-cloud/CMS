let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://httpbin.org'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://httpbin.org/get'
} else {
  BASE_URL = 'https://httpbin.org/get'
}

export { BASE_URL, TIME_OUT }

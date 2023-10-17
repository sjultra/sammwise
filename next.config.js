module.exports = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/api/v1/namespaces/sammwise/services/http%3sammwise%380/proxy' // Proxy to Backend
        },
        {
            has: [
                {
                  type: 'host',
                  value: 'rancher.vzxy.net',
                },
              ],
          source: '/',
          destination: '/api/v1/namespaces/sammwise/services/http%3sammwise%380/proxy' // Proxy to Backend
        },
        {
            has: [
                {
                  type: 'host',
                  value: 'rancher.vzxy.net',
                },
              ],
          source: '/about',
          destination: '/api/v1/namespaces/sammwise/services/http%3sammwise%380/proxy/about' // Proxy to Backend
        },
        {
            has: [
                {
                  type: 'host',
                  value: 'rancher.vzxy.net',
                },
              ],
          source: '/assessment',
          destination: '/api/v1/namespaces/sammwise/services/http%3sammwise%380/proxy/assessment' // Proxy to Backend
        },
        {
            has: [
                {
                  type: 'host',
                  value: 'rancher.vzxy.net',
                },
              ],
          source: '/results',
          destination: '/api/v1/namespaces/sammwise/services/http%3sammwise%380/proxy/results' // Proxy to Backend
        }
      ]
    }
  }
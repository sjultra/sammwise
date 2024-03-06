const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// TODO make this configurable with n hostnames to support, for n proxys
const PROXY_HOSTNAME = "rancher.vzxy.net"
const PROXY_PATHNAME = "/k8s/clusters/c-m-6wzgb6p6/api/v1/namespaces/sammwise/services/http:sammwise:80/proxy"

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { hostname, pathname } = parsedUrl;
    // parsedUrl.
    console.log(hostname, pathname);

    // check configured hostnames and qualifier for non proxy paths
    if (hostname === PROXY_HOSTNAME && !pathname.includes("/proxy")) {
        // Handle requests to /
        app.render(req, res, PROXY_PATHNAME + pathname, parsedUrl.query);
    } else {
        handle(req, res, parsedUrl)
    }
  }).listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
});
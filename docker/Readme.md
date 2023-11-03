
Dockerfile-k8s  


Running Next.js without HTTPS directly in production is typically not recommended due to security reasons. However, in a Kubernetes setup, if you have an ingress controller that manages HTTPS termination, your Next.js service can indeed run without HTTPS since the ingress handles secure connections and then forwards the traffic to your service over the internal network using HTTP.

In this scenario, your Next.js application doesn't need to concern itself with SSL/TLS or HTTPS because that's managed by your ingress controller. 

Dockerfile 

To be used in any other scenario. 
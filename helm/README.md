# Sammwise Helm Chart

This Helm chart allows you to deploy an `owaspsammwise` instance in your Kubernetes cluster.

## Prerequisites

- [Helm](https://helm.sh/docs/intro/install/), the Kubernetes package manager
- A configured Kubernetes cluster

## Installation

### 1. Clone the Repository

Start by cloning the `sammwise` repository:

```bash
git clone https://github.com/sjultra/sammwise.git
cd sammwise/helm
```


### 1. Deploy Using Helm

Once you have cloned the repository and navigated into the directory, deploy owaspsammwise using Helm:

```bash
helm install sammwise ./service
```

#### Additional Information
For more configurations and customizations, refer to values.yaml in the service directory.
For detailed Helm commands and configurations, visit [Helm's official documentation](https://helm.sh/docs/).

Now you should be able to copy the above content directly!

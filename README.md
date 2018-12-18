# a11y-dashboard-connector
Run competetive Accessibility tests and send them to a Graphite db

## High level overview

- Run with `yarn start` which only does `node index.js`.
- The `index.js` only itereates over a list of urls and "queues" them async to `run`.
- The `run` function in `main.js` runs pa11y for each URL and pa11y returns a report (big array of issues)
  - The report is saved as JSON file into the `reports` folder
  - The report is processed by different filters
  - Each filter takes a pa11y report as input and returns one or multiple values (calculated/filtered data).
- The values are put to the function `sendStats`.
- `sendStats` glues the values together into an objext, which is sent to Graphite.
  - The object structure and the key names represent the hierarchy in which you will find the data inside Graphite.

## Run & Deploy

### Deployment Prerequisites
* [Install gcloud SDK](https://cloud.google.com/sdk/)
* [Init gcloud SDK](https://cloud.google.com/sdk/docs/quickstart-mac-os-x#initialize_the_sdk)
* [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* Connect to the K8s Cluster
  * therefore run `gcloud container clusters get-credentials zon-misc-prod-1 --zone europe-west3-a --project zeitonline-gke-misc-prod` in your commandline
* Set the Kubectl Context 
  * therefore run `kubectl config set-context a11y-connector-production --cluster=gke_zeitonline-gke-misc-prod_europe-west3-a_zon-misc-prod-1 --user=gke_zeitonline-gke-misc-prod_europe-west3-a_zon-misc-prod-1 --namespace=a11y-connector` in your commandline
* Use the Context
  * run `kubectl config use-context a11y-connector-production` in y our commandline

### Build Docker Image and Deploy to K8s

| Command | What's happening? |
| ------  | --------- |
| `make build` | generate new Docker-Image with current revision |
| `make test`  | run most recent Docker-Image based on revision  |
| `make k8s`   | deploy most recent Docker-Image based on revision to Kubernetes-Cluster as a Cronjob|

The Cronjob is accessible through the [Kubernetes-Dashboard](https://console.cloud.google.com/kubernetes/cronjob/europe-west3-a/zon-misc-prod-1/a11y-connector/a11y-dashbord-connector) (view logs etc.)

## Checks

### Pa11y

### Webcoach

### HTML-Validator

## To-do

## Clean up

- `index.js` is a lot of unreadable boilerplate.
- naming things: make clear which part is pa11y, which is grafana-connection, which are _our_ filters, which is code to tape things together
- send each report result to Graphite, instead of glueing it together in the `sendStats` function

## Make this usable for others

- The list of urls should come from a config file
- Command Line Interface (params: which sites, graphite url)


## Feature Ideas

- axe for analyses: reports good parse-able advice (Violation of "color-contrast" with 108 occurrences!)
- exclude elements like ads (look for "hide elements" in https://bitsofco.de/pa11y/) ... if this makes sense. Maybe as an extra report: issues with and without ads ?

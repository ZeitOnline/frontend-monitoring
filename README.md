# a11y-dashboard-connector
Run competetive Accessibility and Quality checks and send them to a Graphite db

## Quickstart for local development

Do the `yarn install` and `yarn start`. The tests will run and print some results to your console.

Next, go ahead and play with the scripts. Output is generated to the console and into the `reports`folder. Whatever crazy thing you invent – if you are inside the ZON network, your stats will instantly be available on http://sitespeed.zeit.de/dashboard/db/accessibility-dashboard?refresh=5m&orgId=1 .


## High level overview

- Run with `yarn start` which only does `node index.js`.
- The `index.js` only itereates over a list of urls and starts "checks" with them.
- Each check is a module inside the `checks` folder.
- A check runs one tool (eg html-validator, pa11y) for each URL given, and handles the result on its own. "Handling" can mean anything, but in most cases it is
  - Filter and name the results (eg counting errors of a certain type).
  - Store the result in a folder, for manual inspection.
  - Send the result to graphite. Therefore, an object is built which represents the namespace where the metrics will be found in graphite/grafana (eg `htmlvalidator.zeit-de.homepage.stats.errorCount`).
- Storing and sending is done by helper functions, which are found in the shared "utils" folder.


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

- Pa11y ([GitHub](https://github.com/pa11y/pa11y), [npm](https://www.npmjs.com/package/pa11y))
- Webcoach ([GitHub](https://github.com/sitespeedio/coach), [npm](https://www.npmjs.com/package/webcoach)) – zurzeit deaktiviert weil der Puppeteer/Browser nicht tut.
- HTML-Validator ([GitHub](https://github.com/zrrrzzt/html-validator), [npm](https://www.npmjs.com/package/html-validator))


## To-do

### Make this usable for others

- The list of urls should come from a config file
- Command Line Interface (params: which sites, graphite url)

### Feature Ideas

- Make the test result/console output available, if possible. We want know instantly, what "n HTML errors on page X" means.
- axe for analyses: reports good parse-able advice (Violation of "color-contrast" with 108 occurrences!)
- exclude elements like ads (look for "hide elements" in https://bitsofco.de/pa11y/) ... if this makes sense. Maybe as an extra report: issues with and without ads ?

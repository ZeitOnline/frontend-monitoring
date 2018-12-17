
REGISTRY := registry.zeit.de
REV := $(shell git describe --tags)

.PHONY: build
build:
	docker build --tag ${REGISTRY}/a11y-dashbord-connector:${REV} .

.PHONY: test
test:
	docker run ${REGISTRY}/a11y-dashbord-connector:${REV}

.PHONY: k8s
k8s:
	docker push ${REGISTRY}/a11y-dashbord-connector:${REV}
	sed -E 's,"${REGISTRY}/a11y-dashbord-connector:.*\"','"${REGISTRY}/a11y-dashbord-connector:${REV}",' k8s/cron-job.json | kubectl apply -f -

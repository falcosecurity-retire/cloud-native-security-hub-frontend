build:
	npm run build
	docker build -t gcr.io/mateo-burillo-ns/cnvh-frontend .

push: build
	docker push gcr.io/mateo-burillo-ns/cnvh-frontend

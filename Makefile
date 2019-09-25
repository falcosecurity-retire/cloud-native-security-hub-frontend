build:
	npm run build
	docker build -t gcr.io/mateo-burillo-ns/securityhub-frontend .

push: build
	docker push gcr.io/mateo-burillo-ns/securityhub-frontend

copy-illustrations:
	cd illustrations && \
		npm run build && \
		cat dist/assets/*.js > ../static/js/preview.js

wasi_runtime_doc:
	./scripts/wasi_runtime_doc.sh

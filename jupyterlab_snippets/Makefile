init: ## Setup develop environment
	npm install

install: init ## Link extension to jupyterlab
	python setup.py install
	jupyter serverextension enable --py jupyterlab_snippets
	jupyter labextension link .

packagejs: init ## Create .tar.gz
	npm pack

publishjs: packagejs ## Publish the labextension
	npm publish

uninstall: ## Unistall the plugin
	pip uninstall -y jupyterlab_snippets
	jupyter serverextension disable --py jupyterlab_snippets
	jupyter labextension unlink .

clean: ## cleanup
	find . -name "__pycache__" | xargs  rm -rf
	find . -name "*.pyc" | xargs rm -rf
	find . -name ".ipynb_checkpoints" | xargs  rm -rf
	rm -rf .coverage cover htmlcov logs build dist *.egg-info lib node_modules

dist:  ## dist to pypi
	python setup.py sdist upload -r pypi

.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

print-%:
	@echo '$*=$($*)'

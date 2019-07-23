jlpminstall: ## Setup node_modules and compile sources
	jlpm install

pipinstall: ## Install to site-packages
	pip install -e .

init: jlpminstall pipinstall ## Initialize project
	jlpm install
	pip install -e .
	echo "Setup complete"

buildjs: jlpminstall ## Build javascript resources
	jlpm build

packjs: buildjs ## Package javascript resources into NPM module
	jlpm pack
	mv jupyterlab_kernel_reconnector_extension-v*.tgz assets/jupyterlab_kernel_reconnector_extension.tgz

package: packjs ## Create python package
	python setup.py sdist

publish: package ## Publish to art service
	version=`python -c "from jupyterlab_kernel_reconnector_extension import __version__; print(__version__)"`  ;   \
	../../../Downloads/artcli create --store PYPI --packagename jupyterlab_kernel_reconnector_extension --version $$version --package_path dist/jupyterlab_kernel_reconnector_extension-$$version.tar.gz 

install: packjs ## install to site-packages
	python setup.py install -v

uninstall:
	# -jupyter serverextension disable jupyterlab_kernel_reconnector_extension # Uncomment if extension also includes a serverextension
	jupyter labextension uninstall jupyterlab_kernel_reconnector_extension
	pip uninstall -y jupyterlab_kernel_reconnector_extension

clean_assets: ## Clean javascript assepts
	rm -rf assets/*tgz

clean: clean_assets ## clean the repository
	find . -name "__pycache__" | xargs  rm -rf
	find . -name "*.pyc" | xargs rm -rf
	find . -name ".ipynb_checkpoints" | xargs  rm -rf
	rm -rf .coverage cover htmlcov logs build dist *.egg-info lib node_modules

.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

print-%:
	@echo '$*=$($*)'

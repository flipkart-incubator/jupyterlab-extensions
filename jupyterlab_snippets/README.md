# Jupyter lab Snippets

A jupyterlab plugin that allows users to insert code snippets into the current notebook.


## Prerequisites

* JupyterLab >= 0.33.12
* NodeJS <= 9

## Installation and Un-installation

```bash
pip install jupyterlab_snippets
jupyter serverextension enable --py jupyterlab_snippets
jupyter labextension install @flipkart/juptyterlab_snippets
```

To uninstall run
```bash
jupyter serverextension disable --py jupyterlab_snippets
pip uninstall jupyterlab_snippets
jupyter labextension uninstall @flipkart/jupyterlab_snippets
```

## Development

For a development install:

```bash
make install
```

To uninstall
```bash
make uninstall
```

To rebuild the labextension package:

```bash
make packagejs
```


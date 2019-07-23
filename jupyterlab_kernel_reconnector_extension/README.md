# jupyterlab_kernel_reconnector_extension

A jupyterlab extension to have seemless connectivity to remote launched kernel incase of laptop sleeps and inactivity that results in websocket disconnects


# Jupyter lab Snippets

A jupyterlab plugin that allows users to insert code snippets into the current notebook.


## Prerequisites

* JupyterLab >= 0.33.11
* NodeJS <= 9

## Installation and Un-installation

```bash
pip install jupyterlab_kernel_reconnector_extension
```

To uninstall run
```bash
jupyterlan serverextension disable jupyterlab_kernel_reconnector_extension
pip uninstall jupyterlab_kernel_reconnector_extension
jupyter labextension uninstall jupyterlab_kernel_reconnector_extension
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

To rebuild the package and the JupyterLab app:

```bash
make package
```


```


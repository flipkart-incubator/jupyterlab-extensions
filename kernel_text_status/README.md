# kernel_text_status

Extension to display status of kernel through text for easy readability


## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install kernel_text_status
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```


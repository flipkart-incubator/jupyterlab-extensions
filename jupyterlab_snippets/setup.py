from setuptools import setup, find_packages
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

with open(path.join(here, 'requirements.txt'), encoding='utf-8') as f:
    requires = f.read().split()

setup(
    name='jupyterlab_snippets',
    version='0.1.6',
    description='Snippets for notebooks in JupyterLab',
    long_description=long_description,
    url='https://github.com/flipkart-incubator/jupyterlab-extensions',
    author='Flipkart',
    license='Apache 2.0',
    keywords='jupyter jupyterlab',
    packages=find_packages(exclude=['tests', ]),
    package_data={'jupyterlab_snippets': ['snippets.json']},
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    extras_require={'dev': requires + ['pytest', 'pytest-cov', 'pylint', 'flake8']}
)
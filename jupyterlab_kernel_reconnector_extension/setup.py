from setuptools import find_packages
from codecs import open
from os import path
from setuptools import setup
from setuptools.command.install import install
from subprocess import check_call
import jupyterlab_kernel_reconnector_extension

name = 'jupyterlab_kernel_reconnector_extension'
version = jupyterlab_kernel_reconnector_extension.__version__

here = '.'
with open(path.join(here, 'requirements.txt'), encoding='utf-8') as f:
    requires = f.read().split()

labextension_tar = path.join(here, 'assets', name + '.tgz')


class PostInstallCommand(install):
    """Post-installation for installation mode."""
    def run(self):
        print("Installing tar at " + path.abspath(labextension_tar) + " as labextension")
        check_call(("jupyter labextension install " + path.abspath(labextension_tar)).split())
        install.do_egg_install(self)
        # print("Enabling jupyterserver extension")
        # check_call("jupyter serverextension enable --py jupyterlab_kernel_reconnector_extension".split())


data_files = [
    ('assets', [labextension_tar])
]

setup(
    name=name,
    version=version,
    description='A jupyterlab extension to have seemless connectivity to remote launched kernel incase of laptop sleeps and inactivity that results in websocket disconnects',
    author='imam.k',
    keywords='jupyter jupyterlab',
    install_requires=requires,
    include_package_data=True,
    zip_safe=False,
    packages=find_packages(exclude=['tests', ]),
    data_files=data_files,
    cmdclass={
        'install': PostInstallCommand
    }
)

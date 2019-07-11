import os
import json
from notebook.base.handlers import IPythonHandler
from notebook.utils import url_path_join


# noinspection PyAbstractClass
class SnippetsHandler(IPythonHandler):
    snippets = None  # type: []

    def initialize(self, snippets=None):
        self.snippets = snippets

    def get(self):
        self.finish(self.snippets)


def load_jupyter_server_extension(nb_server_app):
    web_app = nb_server_app.web_app
    snippet_files = nb_server_app.config.get('JupyterLabSnippets', {}).get('snippets_files', [])

    if nb_server_app.config.get('JupyterLabSnippets', {}).get('include_defaults', True):
        snippet_files.append(os.path.join(os.path.dirname(__file__), 'snippets.json'))

    snippets = []
    for path in snippet_files:
        with open(os.path.abspath(os.path.realpath(path)), 'r') as fp:
            snippets.extend(json.loads(fp.read()))

    web_app.add_handlers('.*$', [(url_path_join(web_app.settings['base_url'], 'snippets/get'),
                                  SnippetsHandler, {'snippets': snippets})])

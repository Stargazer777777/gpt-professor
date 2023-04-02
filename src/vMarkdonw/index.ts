import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

import hljs from 'highlight.js';

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});
VueMarkdownEditor.use(createKatexPlugin());

export default VueMarkdownEditor;

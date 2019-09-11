import ada from 'highlight.js/lib/languages/ada';
import bash from 'highlight.js/lib/languages/bash';
import basic from 'highlight.js/lib/languages/basic';
import cpp from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import fortran from 'highlight.js/lib/languages/fortran';
import haskell from 'highlight.js/lib/languages/haskell';
import javascript from 'highlight.js/lib/languages/javascript';
import lisp from 'highlight.js/lib/languages/lisp';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import smalltalk from 'highlight.js/lib/languages/smalltalk';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import x86asm from 'highlight.js/lib/languages/x86asm';

export function hljsLanguages() {
  return [
    { name: 'ada', func: ada },
    { name: 'bash', func: bash },
    { name: 'basic', func: basic },
    { name: 'css', func: css },
    { name: 'fortran', func: fortran },
    { name: 'haskell', func: haskell },
    { name: 'lisp', func: lisp },
    { name: 'smalltalk', func: smalltalk },
    { name: 'x86asm', func: x86asm },
    { name: 'markdown', func: markdown },
    { name: 'scss', func: scss },
    { name: 'typescript', func: typescript },
    { name: 'cpp', func: cpp },
    { name: 'javascript', func: javascript },
    { name: 'python', func: python }
  ];
}

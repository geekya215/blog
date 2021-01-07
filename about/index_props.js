import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "about/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "about/index.html",
    'title': "关于我",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>关于我</h1>\n<p>你好！这里是璃杏，我在网络上常用 ID 为 geekya215。</p>\n<p>比较能折腾，喜欢探索各种新奇有趣的技术，软硬件都有所涉猎。</p>\n<p>常用编程语言是 Java、Kotlin、TypeScript。偶尔会使用 Rust 和 Haskell 写点自己的小玩具。</p>\n<p>Linux 爱好者，折腾过一段时间的 LFS，目前使用的发行版是 Gentoo 和 Arch。</p>\n<p>Vim 重度患者，主力编辑器是 Neovim，其他软件都会搭配 Vim 插件使用。</p>\n<p>热衷于 PL 相关领域，使用过各种范式的编程语言，希望设计一门自己的语言。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u5173\u4E8E\u6211"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>你好！这里是璃杏，我在网络上常用 ID 为 geekya215。</p>\n<p>比较能折腾，喜欢探索各种新奇有趣的技术，软硬件都有所涉猎。</p>\n<p>常用编程语言是 Java、Kotlin、TypeScript。偶尔会使用 Rust 和 Haskell 写点自己的小玩具。</p>\n<p>Linux 爱好者，折腾过一段时间的 LFS，目前使用的发行版是 Gentoo 和 Arch。</p>\n<p>Vim 重度患者，主力编辑器是 Neovim，其他软件都会搭配 Vim 插件使用。</p>\n<p>热衷于 PL 相关领域，使用过各种范式的编程语言，希望设计一门自己的语言。</p>'
        } }),
    'toc': null,
    'author': "Lin Yang",
    'contributors': [
        "Lin Yang"
    ],
    'date': "2021-01-06T10:18:24.000Z",
    'updated': "2021-01-07T18:47:00.000Z",
    'excerpt': "你好！这里是璃杏，我在网络上常用 ID 为 geekya215。 比较能折腾，喜欢探索各种新奇有趣的技术，软硬件都有所涉猎。 常用编程语言是 Java、Kotlin、TypeScript。偶尔会使用 Rust 和 Haskell 写点自己的小玩具。 Linux 爱好者，...",
    'cover': undefined,
    'blog': {
        "isPost": false,
        "posts": [],
        "categories": [],
        "tags": []
    }
};

import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "tags/总结思考/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/总结思考/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "总结思考",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/archlinux_tutorial.md",
                "title": "Arch Linux 完全指北",
                "link": "posts/archlinux_tutorial.html",
                "date": "2021-01-19T00:00:00.000Z",
                "updated": "2021-01-31T03:54:42.000Z",
                "author": "geekya215",
                "contributors": [
                    "Lin Yang"
                ],
                "categories": [
                    "Linux"
                ],
                "tags": [
                    "总结思考"
                ],
                "excerpt": "此文为博主自身在安装 Arch Linux 过程中的总结。主要参考 Arch Wiki，本文章具有一定时效性，里面的内容可能在以后的某个时间失效。 如果遇到错误，请参考最新版本的官方文档，或通过通过网络寻求帮助。 本文默认安装单系统，..."
            }
        ],
        "categories": [
            {
                "name": "Linux",
                "count": 1
            }
        ],
        "tags": [
            {
                "name": "总结思考",
                "count": 1
            }
        ]
    }
};

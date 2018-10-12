module.exports = {
	title: 'Global Social Chain',
	description: '全球首个基于过亿真实用户的社交公链，用区块链技术重构下一代去中心化价值社交网络平台',
	host: '0.0.0.0',
  port: 8888,
	theme: 'gsc',
	locales: {
    '/en/': {
      lang: 'en-US',
      title: 'GSC Document',
      description: 'GSC Document and development guid.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'GSC 官方文档',
      description: 'GSC 官方文档'
    }
  },
	themeConfig: {
		locales: {
			'/en/': {
				selectText: 'Languages',
				label: 'English',
				editLinkText: 'Edit this page on GitHub',
				serviceWorker: {
					updatePopup: {
						message: "New content is available.",
						buttonText: "Refresh"
					}
				},
				algolia: {},
				nav: [
					{ text: 'Home', link: '/' },
		      { text: 'About Our', link: '/en/about' },
		      { text: 'Github', link: 'https://github.com/gscsocial/wiki/' },
		    ],
				sidebar:[
					{
		        title: 'Introduction',
		        collapsable: true,
		        children: [
		           // '',
		        ]
		      },
				],
			},
			'/zh/': {
		    selectText: '选择语言',
		    label: '简体中文',
		    editLinkText: '在 GitHub 上编辑此页',
		    serviceWorker: {
		      updatePopup: {
		        message: "发现新内容可用.",
		        buttonText: "刷新"
		      }
		    },
				nav: [
					{ text: '主页', link: '/' },
					{ text: '关于我们', link: '/zh/about' },
					{ text: 'Github', link: 'https://github.com/gscsocial/' },
		    ],
				algolia: {},
				collapsable: true,
		    sidebarDepth: 3,
		    displayAllHeaders: true,
		    lastUpdated: 'LastUpdated',
				sidebar: [
		      {
		        title: 'GSC介绍',
		        collapsable: true,
		        children: [
		           '/zh/introduction/gsc',
		          '/zh/introduction/glossary',
		          '/zh/introduction/blockchain',
		        ]
		      },
		      {
		        title: '用户操作手册',
		        collapsable: true,
		        children: [
		          '/zh/operate/token',
		          '/zh/operate/wallet-explorer',
		          '/zh/operate/wallet',
		        ]
		      },
					{
		        title: '光速节点指南',
		        collapsable: true,
		        children: [
		          '/zh/guide/lightnode',
		          '/zh/guide/lightnodeQA',
		          '/zh/guide/rating',
		          '/zh/guide/vote',
		        ]
		      },
		      {
		        title: '开发文档',
		        collapsable: true,
		        children: [
		          '/zh/development/',
		          // '/document/development/api/',
							'/zh/development/demo',
		          '/zh/development/api/rpc接口',
		          '/zh/development/api/http接口',
		          // '/zh/development/api/协议接口',
		          // '/zh/development/api/网关接口',
		          // '/zh/development/test',
		          // '/zh/development/node',
		          '/zh/development/gvm',
		          // '/zh/development/business',
		        ]
		      },
//		      {
//		        title: '代币迁移',
//		        collapsable: true,
//		        children: [
//		          '/zh/migrate/migrate',
//		        ]
//		      },
		    ],
			}
		}
  }
}

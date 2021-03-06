export default {
  srcDir: 'src',
  theme: 'blog',
  plugins: ['blog'],
  title: '璃杏的博客',
  description: '欢迎来到我的博客，这里搜集了我的技术文章和生活感悟，欢迎一起交流成长。',
  github: 'https://github.com/geekya215/blog',
  blog: {
    root: '/posts/',
    social: {
      github: 'geekya215/blog',
      email: 'geekya215@gmail.com',
      twitter: 'geekya215',
    },
  },
  nav: [
    {
      text: '首页',
      link: '/',
      icon: 'czs-home-l'
    },
    {
      text: '分类',
      link: '/categories/',
      icon: 'czs-category-l'
    },
    {
      text: '标签',
      link: '/tags/',
      icon: 'czs-tag-l'
    },
    {
      text: '关于',
      link: '/about/',
      icon: 'czs-about-l'
    },
    {
      text: '归档',
      link: '/archives/',
      icon: 'czs-box-l'
    },
  ],
};

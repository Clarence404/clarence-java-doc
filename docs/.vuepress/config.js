// 导入 VuePress 配置相关函数和库
import {defineUserConfig} from 'vuepress';
import {defaultTheme} from '@vuepress/theme-default';
import {viteBundler} from '@vuepress/bundler-vite';
import fs from 'fs';
import path from 'path';
import {searchPlugin} from '@vuepress/plugin-search'
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'

function getSidebarFromDir(dirPath) {
    // 检查目录是否存在，不存在返回空数组
    if (!fs.existsSync(dirPath)) {
        console.warn(`Warning: Directory ${dirPath} does not exist. Skipping sidebar generation.`);
        return [];
    }
    // 获取指定目录下的所有 markdown 文件，只过滤出 .md 文件
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
    return files.map(file => {
        // 获取文件的绝对路径
        const filePath = path.join(dirPath, file);
        // 读取文件内容
        const content = fs.readFileSync(filePath, 'utf-8');

        // 提取文件中的第一个 # 标题
        const firstHeadingMatch = content.match(/^# (.+)/);
        const firstHeading = firstHeadingMatch ? firstHeadingMatch[1] : file;

        // 为侧边栏生成相对链接
        const relativeLink = path.relative(path.resolve(__dirname, '../'), filePath)
            .replace(/\\/g, '/')  // 替换反斜杠为正斜杠
            .replace('.md', '');   // 移除文件扩展名 .md

        // 返回侧边栏项
        return {
            text: firstHeading,
            link: `/${relativeLink}`,
        };
    });
}


// VuePress 用户配置
export default defineUserConfig({
    base:'/clarence-doc',
    lang: 'en-US',
    title: 'ClarenceDoc',
    description: '实践是检验真理的唯一标准',
    bundler: viteBundler(),
    theme: defaultTheme({
        // 只将图标放在public下，其他图片放在assets下，这样编写md文件就能看到图片了
        logo: '/images/hero.png',
        navbar: [  // 顶部导航栏配置
            {text: '开发总结', link: '/interview/1_cache'},
            {text: 'Java', link: '/java/1.md'},
            {text: '缓存', link: '/cache/data_structure'},
            {text: '数据库', link: '/database/1.md'},
            {text: 'Jvm', link: '/jvm/1.md'},
            {text: 'Spring', link: '/spring/1.md'},
            {text: '微服务', link: '/springCloud/1.md'},
            {text: '消息队列', link: '/mq/1_mq-chose'},
            {text: '高并发', link: '/parallel/1.md'},
            {text: '分布式', link: '/distribute/1.md'},
            {text: '设计模式', link: '/design/1.md'},
            {text: '场景题', link: '/scene/1.md'},
            {text: 'Netty', link: '/netty/1.md'},
            {text: '算法', link: '/algorithm/1.md'},
            {text: '容器', link: '/container/1.md'},
            {text: '架构师', link: '/performance/1.md'},
        ],
        sidebar: {
            '/interview/': getSidebarFromDir(path.resolve(__dirname, '../interview')),
            '/java/': getSidebarFromDir(path.resolve(__dirname, '../java')),
            '/cache/': getSidebarFromDir(path.resolve(__dirname, '../cache')),
            '/database/': getSidebarFromDir(path.resolve(__dirname, '../database')),
            '/jvm/': getSidebarFromDir(path.resolve(__dirname, '../jvm')),
            '/spring/': getSidebarFromDir(path.resolve(__dirname, '../spring')),
            '/springCloud/': getSidebarFromDir(path.resolve(__dirname, '../springCloud')),
            '/mq/': getSidebarFromDir(path.resolve(__dirname, '../mq')),
            '/parallel/': getSidebarFromDir(path.resolve(__dirname, '../parallel')),
            '/distribute/': getSidebarFromDir(path.resolve(__dirname, '../distribute')),
            '/design/': getSidebarFromDir(path.resolve(__dirname, '../design')),
            '/scene/': getSidebarFromDir(path.resolve(__dirname, '../scene')),
            '/netty/': getSidebarFromDir(path.resolve(__dirname, '../netty')),
            '/algorithm/': getSidebarFromDir(path.resolve(__dirname, '../algorithm')),
            '/container/': getSidebarFromDir(path.resolve(__dirname, '../container')),
            '/performance/': getSidebarFromDir(path.resolve(__dirname, '../performance')),
        },
    }),
    plugins: [
        searchPlugin({
            // 搜索设置
            locales: {
                '/': {
                    placeholder: '搜索',
                },
            },
            maxSuggestions: 10, // 最大显示条目数
            isSearchable: (page) => page.path !== '/', // 排除首页
        }),
        markdownHintPlugin({
            // 启用提示容器，默认启用
            hint: true,
            // 启用 GFM 警告
            alert: true,
        }),
    ],
});

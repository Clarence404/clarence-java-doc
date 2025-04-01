// 导入 VuePress 配置相关函数和库
import {defineUserConfig} from 'vuepress';
import {defaultTheme} from '@vuepress/theme-default';
import {viteBundler} from '@vuepress/bundler-vite';
import fs from 'fs';
import path from 'path';
import {searchPlugin} from '@vuepress/plugin-search'
import {markdownHintPlugin} from '@vuepress/plugin-markdown-hint'
import {copyCodePlugin} from '@vuepress/plugin-copy-code'

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

        // 打印侧边栏的生成值
        console.log({
            text: firstHeading,
            link: `/${relativeLink}`,
        });
        // 返回侧边栏项
        return {
            text: firstHeading,
            link: `/${relativeLink}`,
        };
    });
}


// VuePress 用户配置
export default defineUserConfig({
    head: [
        [
            'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
            { rel: 'icon', href: 'images/logo.png' }
        ]
    ],
    base: '/clarence-java-doc/',
    lang: 'en-US',
    port: 1000,
    title: 'ClarenceDoc',
    description: '实践是检验真理的唯一标准',
    bundler: viteBundler(),
    theme: defaultTheme({
        // 只将图标放在public下，其他图片放在assets下，这样编写md文件就能看到图片了
        logo: '/images/logo.png',
        navbar: [  // 顶部导航栏配置
            {text: '开发总结', link: '/interview/0_java'},
            {text: 'Java', link: '/java/1_base'},
            {text: '数据库', link: '/database/0_mysql'},
            {text: '缓存', link: '/cache/1_redis'},
            {text: 'JVM', link: '/jvm/jvm'},
            {text: 'Spring', link: '/spring/1_spring'},
            {text: '微服务', link: '/springcloud/1_base'},
            {text: '消息队列', link: '/mq/1_mq'},
            {text: '高并发', link: '/concurrent/0_concurrent'},
            {text: '分布式', link: '/distributed/0_distributed'},
            {text: '高可用', link: '/ha/0_high_availability'},
            {text: '设计模式', link: '/design/0_design'},
            {text: '场景题', link: '/scene/0_scene'},
            {text: 'Netty', link: '/netty/0_stick_split'},
            {text: '容器', link: '/container/1_linux'},
            {text: '算法', link: '/algorithm/0_base_0_complexity'},
            {text: '架构师', link: '/architecture/0_structure'},
            {text: 'Protocol', link: '/protocol/0'},
            {text: 'IOT', link: '/iot/0_base'},
            {text: '人工智能', link: '/ai/0_ai'},
        ],
        sidebar: {
            '/interview/': getSidebarFromDir(path.resolve(__dirname, '../interview')),
            '/java/': getSidebarFromDir(path.resolve(__dirname, '../java')),
            '/database/': getSidebarFromDir(path.resolve(__dirname, '../database')),
            '/cache/': getSidebarFromDir(path.resolve(__dirname, '../cache')),
            '/jvm/': getSidebarFromDir(path.resolve(__dirname, '../jvm')),
            '/spring/': getSidebarFromDir(path.resolve(__dirname, '../spring')),
            '/springcloud/': getSidebarFromDir(path.resolve(__dirname, '../springcloud')),
            '/mq/': getSidebarFromDir(path.resolve(__dirname, '../mq')),
            '/concurrent/': getSidebarFromDir(path.resolve(__dirname, '../concurrent')),
            '/distributed/': getSidebarFromDir(path.resolve(__dirname, '../distributed')),
            '/ha/': getSidebarFromDir(path.resolve(__dirname, '../ha')),
            '/design/': getSidebarFromDir(path.resolve(__dirname, '../design')),
            '/scene/': getSidebarFromDir(path.resolve(__dirname, '../scene')),
            '/netty/': getSidebarFromDir(path.resolve(__dirname, '../netty')),
            '/container/': getSidebarFromDir(path.resolve(__dirname, '../container')),
            '/algorithm/': getSidebarFromDir(path.resolve(__dirname, '../algorithm')),
            '/architecture/': getSidebarFromDir(path.resolve(__dirname, '../architecture')),
            '/protocol/': getSidebarFromDir(path.resolve(__dirname, '../protocol')),
            '/iot/': getSidebarFromDir(path.resolve(__dirname, '../iot')),
            '/ai/': getSidebarFromDir(path.resolve(__dirname, '../ai')),
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
        copyCodePlugin({
            // options
            showInMobile: true
        }),
    ],
});

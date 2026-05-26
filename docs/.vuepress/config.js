import {defineUserConfig} from 'vuepress';
import {hopeTheme} from 'vuepress-theme-hope';
import {viteBundler} from '@vuepress/bundler-vite';
import fs from 'fs';
import path from 'path';

function getSidebarFromDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.warn(`Warning: Directory ${dirPath} does not exist. Skipping sidebar generation.`);
        return [];
    }
    const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.md'))
        .sort((a, b) => {
            const na = parseInt(a.match(/^(\d+)/)?.[1] ?? '0');
            const nb = parseInt(b.match(/^(\d+)/)?.[1] ?? '0');
            return na - nb;
        });
    return files.map(file => {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const firstHeadingMatch = content.match(/^# (.+)/m);
        const firstHeading = firstHeadingMatch ? firstHeadingMatch[1] : file;
        const relativeLink = path.relative(path.resolve(__dirname, '../'), filePath)
            .replace(/\\/g, '/')
            .replace('.md', '');
        return {
            text: firstHeading,
            link: `/${relativeLink}`,
        };
    });
}

export default defineUserConfig({
    head: [
        ['link', {rel: 'icon', href: 'images/logo.png'}]
    ],
    base: '/clarence-java-doc/',
    lang: 'zh-CN',
    port: 1000,
    title: 'Clarence Java Doc',
    description: '实践是检验真理的唯一标准',
    bundler: viteBundler({
        viteOptions: {
            build: {
                rollupOptions: {
                    onwarn(warning, warn) {
                        if (warning.code === 'INVALID_ANNOTATION') return;
                        if (warning.code === 'PLUGIN_TIMINGS') return;
                        warn(warning);
                    },
                },
            },
        },
    }),
    theme: hopeTheme({
        logo: '/images/logo.png',
        navbar: [
            {text: '面试总结', link: '/interview/0_java'},
            {text: 'Java', link: '/java/0_base'},
            {text: 'JVM', link: '/jvm/0_jvm_memory'},
            {text: '算法', link: '/algorithms/0_complexity'},
            {text: '设计模式', link: '/patterns/0_design_intro'},
            {text: 'Spring', link: '/spring/0_spring_framework'},
            {text: 'Spring Boot', link: '/springboot/0_springboot'},
            {text: 'Netty', link: '/netty/0_stick_split'},
            {text: '数据库', link: '/database/0_mysql'},
            {text: '缓存', link: '/cache/0_redis'},
            {text: '消息队列', link: '/messaging/0_mq'},
            {text: '分布式', link: '/distributed/0_distributed'},
            {text: '高并发', link: '/high-con/0_concurrent'},
            {text: '高可用', link: '/high-avail/0_high_availability'},
            {text: '微服务', link: '/microservices/0_base_concept'},
            {text: '架构', link: '/architecture/0_system_structure'},
            {text: '网络协议', link: '/protocols/0_protocols_base'},
            {text: '云原生', link: '/cloud-native/0_linux'},
            {text: 'IoT', link: '/iot/0_base'},
            {text: 'AI', link: '/ai/0_ai'},
            {text: '业务场景', link: '/scenario/0_scene'},
        ],
        sidebar: {
            '/interview/': getSidebarFromDir(path.resolve(__dirname, '../interview')),
            '/java/': getSidebarFromDir(path.resolve(__dirname, '../java')),
            '/database/': getSidebarFromDir(path.resolve(__dirname, '../database')),
            '/cache/': getSidebarFromDir(path.resolve(__dirname, '../cache')),
            '/jvm/': getSidebarFromDir(path.resolve(__dirname, '../jvm')),
            '/spring/': getSidebarFromDir(path.resolve(__dirname, '../spring')),
            '/springboot/': getSidebarFromDir(path.resolve(__dirname, '../springboot')),
            '/microservices/': getSidebarFromDir(path.resolve(__dirname, '../microservices')),
            '/messaging/': getSidebarFromDir(path.resolve(__dirname, '../messaging')),
            '/high-con/': getSidebarFromDir(path.resolve(__dirname, '../high-con')),
            '/distributed/': getSidebarFromDir(path.resolve(__dirname, '../distributed')),
            '/high-avail/': getSidebarFromDir(path.resolve(__dirname, '../high-avail')),
            '/patterns/': getSidebarFromDir(path.resolve(__dirname, '../patterns')),
            '/scenario/': getSidebarFromDir(path.resolve(__dirname, '../scenario')),
            '/netty/': getSidebarFromDir(path.resolve(__dirname, '../netty')),
            '/cloud-native/': getSidebarFromDir(path.resolve(__dirname, '../cloud-native')),
            '/algorithms/': getSidebarFromDir(path.resolve(__dirname, '../algorithms')),
            '/architecture/': getSidebarFromDir(path.resolve(__dirname, '../architecture')),
            '/protocols/': getSidebarFromDir(path.resolve(__dirname, '../protocols')),
            '/iot/': getSidebarFromDir(path.resolve(__dirname, '../iot')),
            '/ai/': getSidebarFromDir(path.resolve(__dirname, '../ai')),
        },
        markdown: {
            hint: true,
            alert: true,
        },
        plugins: {
            copyCode: {
                showInMobile: true,
            },
            slimsearch: {
                locales: {
                    '/': {placeholder: '搜索'},
                },
                isSearchable: (page) => page.path !== '/',
            },
        },
    }),
});

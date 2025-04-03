import{_ as e,c as n,a,o as l}from"./app-DeL0UZ8f.js";const i={};function r(t,s){return l(),n("div",null,s[0]||(s[0]=[a(`<h1 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql"><span>PostgreSQL</span></a></h1><ul><li><strong>官网</strong>：<a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">PostgreSQL 官网</a></li></ul><h2 id="一、基础介绍" tabindex="-1"><a class="header-anchor" href="#一、基础介绍"><span>一、基础介绍</span></a></h2><ul><li><strong>背景</strong>：PostgreSQL 是一个开源的关系型数据库管理系统（RDBMS），最初由加利福尼亚大学伯克利分校的研究团队在 1986 年开始开发，最初的名字叫做 Postgres。</li><li><strong>来源</strong>：PostgreSQL 并非中国的数据库，而是源自美国的开源项目。</li><li><strong>特点</strong>： <ul><li>全球范围内广泛使用的开源数据库，具有高可扩展性和强大的事务支持。</li><li>支持 SQL 标准，具备丰富的功能，如 JSON 数据类型、地理信息系统（GIS）功能（PostGIS）等。</li><li>在全球范围内有广泛的社区支持和开发者贡献。</li></ul></li></ul><h2 id="二、安装使用" tabindex="-1"><a class="header-anchor" href="#二、安装使用"><span>二、安装使用</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">services:</span>
<span class="line">  postgres:</span>
<span class="line">    image: postgres:17.4-bookworm</span>
<span class="line">    container_name: postgres</span>
<span class="line">    restart: always</span>
<span class="line">    environment:</span>
<span class="line">      POSTGRES_USER: root</span>
<span class="line">      POSTGRES_PASSWORD: <span class="token number">123456</span></span>
<span class="line">    ports:</span>
<span class="line">      - <span class="token string">&quot;5432:5432&quot;</span></span>
<span class="line">    volumes:</span>
<span class="line">      - ./postgres_data:/var/lib/postgresql/data</span>
<span class="line"></span>
<span class="line">volumes:</span>
<span class="line">  postgres_data:</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、核心概念" tabindex="-1"><a class="header-anchor" href="#三、核心概念"><span>三、核心概念</span></a></h2><h2 id="四、常用命令" tabindex="-1"><a class="header-anchor" href="#四、常用命令"><span>四、常用命令</span></a></h2>`,8)]))}const d=e(i,[["render",r],["__file","0_postgres.html.vue"]]),p=JSON.parse('{"path":"/database/0_postgres.html","title":"PostgreSQL","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、基础介绍","slug":"一、基础介绍","link":"#一、基础介绍","children":[]},{"level":2,"title":"二、安装使用","slug":"二、安装使用","link":"#二、安装使用","children":[]},{"level":2,"title":"三、核心概念","slug":"三、核心概念","link":"#三、核心概念","children":[]},{"level":2,"title":"四、常用命令","slug":"四、常用命令","link":"#四、常用命令","children":[]}],"git":{"updatedTime":1743649536000,"contributors":[{"name":"hello0709","username":"hello0709","email":"1154937362@qq.com","commits":1,"url":"https://github.com/hello0709"}]},"filePathRelative":"database/0_postgres.md"}');export{d as comp,p as data};

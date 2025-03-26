import{_ as e,c as n,a as s,o as i}from"./app-BqifC-m9.js";const l={};function r(t,a){return i(),n("div",null,a[0]||(a[0]=[s(`<h1 id="rabbitmq" tabindex="-1"><a class="header-anchor" href="#rabbitmq"><span>RabbitMQ</span></a></h1><p>官网链接：<a href="https://www.rabbitmq.com/docs" target="_blank" rel="noopener noreferrer">RabbitMQ官方文档</a></p><h2 id="一、-安装rabbitmq" tabindex="-1"><a class="header-anchor" href="#一、-安装rabbitmq"><span>一、 安装RabbitMQ</span></a></h2><p>1、Docker安装</p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line">services:</span>
<span class="line">  rabbitmq:</span>
<span class="line">    image: docker.1ms.run/library/rabbitmq:3.13.7-management</span>
<span class="line">    container_name: rabbitmq</span>
<span class="line">    environment:</span>
<span class="line">      RABBITMQ_DEFAULT_USER: root</span>
<span class="line">      RABBITMQ_DEFAULT_PASS: 123456</span>
<span class="line">    ports:</span>
<span class="line">      - &quot;5672:5672&quot;</span>
<span class="line">      - &quot;15672:15672&quot;</span>
<span class="line">    volumes:</span>
<span class="line">      - ./rabbitmq_data:/var/lib/rabbitmq</span>
<span class="line">    restart: always</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const m=e(l,[["render",r],["__file","4_rabbitmq.html.vue"]]),b=JSON.parse('{"path":"/mq/4_rabbitmq.html","title":"RabbitMQ","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、 安装RabbitMQ","slug":"一、-安装rabbitmq","link":"#一、-安装rabbitmq","children":[]}],"git":{"updatedTime":1742955170000,"contributors":[{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":1,"url":"https://github.com/Clarence"},{"name":"hello0709","username":"hello0709","email":"1154937362@qq.com","commits":1,"url":"https://github.com/hello0709"}]},"filePathRelative":"mq/4_rabbitmq.md"}');export{m as comp,b as data};

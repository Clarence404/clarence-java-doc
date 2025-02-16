import{_ as n,c as a,b as s,o as r}from"./app-9XcHNut8.js";const t={};function l(o,e){return r(),a("div",null,e[0]||(e[0]=[s(`<h1 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h1><h2 id="一、docker国内镜像无法-pull-的问题" tabindex="-1"><a class="header-anchor" href="#一、docker国内镜像无法-pull-的问题"><span>一、Docker国内镜像无法 pull 的问题</span></a></h2><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>本次发现问题是2025年2月16日开始，本地测试在使用 Vm-ware 的 Centos 7.9 系统，设置 daemon.json，仍然无法拉取镜像的问题</p></div><h3 id="_1、阿里云服务器设置-daemon-json-正常" tabindex="-1"><a class="header-anchor" href="#_1、阿里云服务器设置-daemon-json-正常"><span>1、阿里云服务器设置 daemon.json 正常</span></a></h3><blockquote><p>原因：暂时不清楚原因，等确认后再写出</p></blockquote><h3 id="_2、vm-ware-的-centos-7-9-失败方案" tabindex="-1"><a class="header-anchor" href="#_2、vm-ware-的-centos-7-9-失败方案"><span>2、Vm-ware 的 Centos 7.9 失败方案</span></a></h3><h4 id="_2-1、目前可用网址汇总" tabindex="-1"><a class="header-anchor" href="#_2-1、目前可用网址汇总"><span>2.1、目前可用网址汇总</span></a></h4><p><a href="https://1ms.run" target="_blank" rel="noopener noreferrer">https://1ms.run</a></p><p><a href="https://xuanyuan.me/" target="_blank" rel="noopener noreferrer">https://xuanyuan.me/</a></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF</span>
<span class="line">{</span>
<span class="line">    &quot;registry-mirrors&quot;: [</span>
<span class="line">        &quot;https://docker.1ms.run&quot;,</span>
<span class="line">        &quot;https://docker.xuanyuan.me&quot;</span>
<span class="line">    ]</span>
<span class="line">}</span>
<span class="line">EOF</span></span>
<span class="line"><span class="token function">sudo</span> systemctl daemon-reload</span>
<span class="line"><span class="token function">sudo</span> systemctl restart <span class="token function">docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2、魔法下载后-手动上传-最笨方案" tabindex="-1"><a class="header-anchor" href="#_2-2、魔法下载后-手动上传-最笨方案"><span>2.2、魔法下载后，手动上传（最笨方案）</span></a></h4><p>这是本人一开始的思路，最终发现docker hub 并不支持此方案，除非使用 Docker Registry 进行交互来获得镜像层的内容并手动下载，但这种方法复杂且不常用</p><h4 id="_2-3、基于基线环境重新导入" tabindex="-1"><a class="header-anchor" href="#_2-3、基于基线环境重新导入"><span>2.3、基于基线环境重新导入</span></a></h4><h4 id="_2-3、魔法代理方式直接下载" tabindex="-1"><a class="header-anchor" href="#_2-3、魔法代理方式直接下载"><span>2.3、魔法代理方式直接下载</span></a></h4><p>问题一：解决Vmware中Centos的网络代理</p><p>问题二：解决Centos中Docker的网络代理</p>`,16)]))}const i=n(t,[["render",l],["__file","3_docker.html.vue"]]),d=JSON.parse('{"path":"/container/3_docker.html","title":"Docker","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、Docker国内镜像无法 pull 的问题","slug":"一、docker国内镜像无法-pull-的问题","link":"#一、docker国内镜像无法-pull-的问题","children":[{"level":3,"title":"1、阿里云服务器设置 daemon.json 正常","slug":"_1、阿里云服务器设置-daemon-json-正常","link":"#_1、阿里云服务器设置-daemon-json-正常","children":[]},{"level":3,"title":"2、Vm-ware 的 Centos 7.9 失败方案","slug":"_2、vm-ware-的-centos-7-9-失败方案","link":"#_2、vm-ware-的-centos-7-9-失败方案","children":[]}]}],"git":{"updatedTime":1739715878000,"contributors":[{"name":"hanchen","username":"hanchen","email":"1154937362@qq.com","commits":1,"url":"https://github.com/hanchen"},{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":1,"url":"https://github.com/Clarence"}]},"filePathRelative":"container/3_docker.md"}');export{i as comp,d as data};

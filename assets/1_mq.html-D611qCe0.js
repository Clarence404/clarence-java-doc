import{_ as d,c as a,b as e,o as r}from"./app-BpQ4J6KA.js";const s={};function n(l,t){return r(),a("div",null,t[0]||(t[0]=[e('<h1 id="消息中间件" tabindex="-1"><a class="header-anchor" href="#消息中间件"><span>消息中间件</span></a></h1><h2 id="一、什么是消息中间件" tabindex="-1"><a class="header-anchor" href="#一、什么是消息中间件"><span>一、什么是消息中间件？</span></a></h2><p>消息中间件（Message Middleware）是一种用于在分布式系统中传递消息的中间层软件，提供可靠的异步通信机制。它可以解耦系统之间的依赖，提高系统的可伸缩性和容错性。</p><h2 id="二、消息中间件的核心作用" tabindex="-1"><a class="header-anchor" href="#二、消息中间件的核心作用"><span>二、消息中间件的核心作用</span></a></h2><p>1、应用解耦：生产者和消费者无需直接交互，只需通过消息队列通信。</p><p>2、异步处理：提升系统响应速度，提高并发能力。</p><p>3、流量削峰：在高并发场景下，通过消息队列缓冲流量，防止系统崩溃。</p><p>4、可靠性保证：提供持久化机制，防止数据丢失。</p><p>5、分布式事务支持：保证数据一致性，支持最终一致性事务。</p><h2 id="三、消息中间件消息模型" tabindex="-1"><a class="header-anchor" href="#三、消息中间件消息模型"><span>三、消息中间件消息模型</span></a></h2><h3 id="_1、点对点-p2p-模式" tabindex="-1"><a class="header-anchor" href="#_1、点对点-p2p-模式"><span>1、点对点（P2P）模式</span></a></h3><p>消息由生产者发送到队列，消费者从队列消费，每条消息只能被一个消费者处理。</p><h3 id="_2、发布-订阅-pub-sub-模式" tabindex="-1"><a class="header-anchor" href="#_2、发布-订阅-pub-sub-模式"><span>2、发布/订阅（Pub/Sub）模式</span></a></h3><p>生产者将消息发送到主题，多个订阅者可以同时接收相同的消息。</p><p>其他模型，熟悉后添加。。。</p><h2 id="四、消息中间件的关键特性" tabindex="-1"><a class="header-anchor" href="#四、消息中间件的关键特性"><span>四、消息中间件的关键特性</span></a></h2><h3 id="_1、高可用性" tabindex="-1"><a class="header-anchor" href="#_1、高可用性"><span>1、高可用性</span></a></h3><p>通过主从架构、集群部署、数据持久化等方式保证消息的可靠性。</p><h3 id="_2、-消息可靠性" tabindex="-1"><a class="header-anchor" href="#_2、-消息可靠性"><span>2、 消息可靠性</span></a></h3><p>ACK 机制：消费者确认消息已成功处理，未确认的消息可以重新投递。</p><p>消息重试：对于失败的消息，提供重试机制或死信队列（DLQ）。</p><h3 id="_3、-顺序性" tabindex="-1"><a class="header-anchor" href="#_3、-顺序性"><span>3、 顺序性</span></a></h3><p>全局顺序：保证所有消息按照生产顺序被消费。</p><p>分区顺序：在特定分区内保证顺序，适用于 Kafka。</p><h3 id="_4、-可扩展性" tabindex="-1"><a class="header-anchor" href="#_4、-可扩展性"><span>4、 可扩展性</span></a></h3><p>通过分区、分片等技术提升消息队列的吞吐能力。</p><h3 id="_5、-一致性" tabindex="-1"><a class="header-anchor" href="#_5、-一致性"><span>5、 一致性</span></a></h3><p>最终一致性：消息中间件通常采用最终一致性策略，保证数据在一段时间后同步。</p><p>事务消息：支持分布式事务，如 RocketMQ 提供事务消息。</p><h2 id="五、rabbitmq-vs-rocketmq-vs-kafka" tabindex="-1"><a class="header-anchor" href="#五、rabbitmq-vs-rocketmq-vs-kafka"><span>五、RabbitMQ vs RocketMQ vs Kafka</span></a></h2><table><thead><tr><th>特性</th><th>RabbitMQ</th><th>RocketMQ</th><th>Kafka</th></tr></thead><tbody><tr><td><strong>类型</strong></td><td>消息代理（传统型，使用 AMQP 协议）</td><td>分布式消息中间件</td><td>分布式事件流平台</td></tr><tr><td><strong>协议</strong></td><td>AMQP, MQTT, STOMP</td><td>自定义协议</td><td>自定义协议</td></tr><tr><td><strong>适用场景</strong></td><td>高兼容性，支持多种消息模式（如发布-订阅、请求-响应）</td><td>高吞吐量，支持可靠消息和调度功能</td><td>高吞吐量和可扩展性，优化事件流处理</td></tr><tr><td><strong>架构</strong></td><td>集中式</td><td>分布式，主从架构与代理</td><td>分布式，分区式，领导者-追随者模型</td></tr><tr><td><strong>性能</strong></td><td>中等（适用于中等消息量场景）</td><td>高性能（可处理每秒数百万消息）</td><td>非常高的性能（针对日志型事件处理优化）</td></tr><tr><td><strong>可靠性</strong></td><td>通过消息确认和持久化机制保障可靠性</td><td>提供持久化和事务支持的可靠消息</td><td>基于分布式日志和复制的高可靠性</td></tr><tr><td><strong>可扩展性</strong></td><td>有限（横向扩展较为复杂）</td><td>高可扩展性</td><td>高可扩展性</td></tr><tr><td><strong>延迟</strong></td><td>低到中等</td><td>低到中等</td><td>非常低（接近实时处理）</td></tr><tr><td><strong>复杂度</strong></td><td>简单易用</td><td>复杂度中等（需要理解代理、名称服务等）</td><td>高复杂度（需要配置分区、副本等）</td></tr><tr><td><strong>消息保留</strong></td><td>短期存活（默认消息消费后即删除）</td><td>可配置（支持长期消息存储）</td><td>长期保留（为日志和流存储设计）</td></tr><tr><td><strong>顺序保证</strong></td><td>支持队列内消息顺序</td><td>支持每个消息组的顺序</td><td>分区内提供强顺序保证</td></tr><tr><td><strong>社区与支持</strong></td><td>拥有庞大的社区和众多集成支持</td><td>社区增长迅速，在中国拥有良好支持</td><td>社区非常活跃，工具支持优良</td></tr><tr><td><strong>事务支持</strong></td><td>支持</td><td>支持（支持分布式事务）</td><td>有限支持（通过 Kafka Streams 实现精确一次语义）</td></tr><tr><td><strong>行业应用</strong></td><td>传统企业应用</td><td>金融和电子商务行业，尤其在中国和亚洲广泛应用</td><td>各行业广泛应用，尤其是大数据管道场景</td></tr><tr><td><strong>依赖性</strong></td><td>复杂场景需要外部数据库</td><td>可单独运行，或依赖外部存储</td><td>需要 Apache ZooKeeper（Kafka 2.8+ 可用 Kafka Raft）</td></tr><tr><td><strong>主流云支持</strong></td><td>支持 AWS、Azure、Google Cloud</td><td>主要支持亚洲的云服务</td><td>广泛支持（AWS MSK、Confluent Cloud 等）</td></tr></tbody></table>',31)]))}const i=d(s,[["render",n],["__file","1_mq.html.vue"]]),p=JSON.parse('{"path":"/mq/1_mq.html","title":"消息中间件","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、什么是消息中间件？","slug":"一、什么是消息中间件","link":"#一、什么是消息中间件","children":[]},{"level":2,"title":"二、消息中间件的核心作用","slug":"二、消息中间件的核心作用","link":"#二、消息中间件的核心作用","children":[]},{"level":2,"title":"三、消息中间件消息模型","slug":"三、消息中间件消息模型","link":"#三、消息中间件消息模型","children":[{"level":3,"title":"1、点对点（P2P）模式","slug":"_1、点对点-p2p-模式","link":"#_1、点对点-p2p-模式","children":[]},{"level":3,"title":"2、发布/订阅（Pub/Sub）模式","slug":"_2、发布-订阅-pub-sub-模式","link":"#_2、发布-订阅-pub-sub-模式","children":[]}]},{"level":2,"title":"四、消息中间件的关键特性","slug":"四、消息中间件的关键特性","link":"#四、消息中间件的关键特性","children":[{"level":3,"title":"1、高可用性","slug":"_1、高可用性","link":"#_1、高可用性","children":[]},{"level":3,"title":"2、 消息可靠性","slug":"_2、-消息可靠性","link":"#_2、-消息可靠性","children":[]},{"level":3,"title":"3、 顺序性","slug":"_3、-顺序性","link":"#_3、-顺序性","children":[]},{"level":3,"title":"4、 可扩展性","slug":"_4、-可扩展性","link":"#_4、-可扩展性","children":[]},{"level":3,"title":"5、 一致性","slug":"_5、-一致性","link":"#_5、-一致性","children":[]}]},{"level":2,"title":"五、RabbitMQ vs RocketMQ vs Kafka","slug":"五、rabbitmq-vs-rocketmq-vs-kafka","link":"#五、rabbitmq-vs-rocketmq-vs-kafka","children":[]}],"git":{"updatedTime":1739628440000,"contributors":[{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":3,"url":"https://github.com/Clarence"}]},"filePathRelative":"mq/1_mq.md"}');export{i as comp,p as data};

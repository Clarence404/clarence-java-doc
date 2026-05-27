# 分布式系统协议
这些协议用于保证分布式系统中的一致性、可靠性和数据同步。

- **Raft**：一致性协议，用于分布式系统的 Leader 选举和日志复制。
- **Paxos**：经典的一致性协议，应用于分布式数据库、Zookeeper 等。
- **Gossip Protocol**：用于分布式系统中节点信息传播，如 Cassandra、Consul 采用该协议。
- **ZAB（Zookeeper Atomic Broadcast）**：Zookeeper 使用的一致性协议，保证数据一致性和主从切换。
# API 安全

## 接口签名

> [!warning] 待补充
>
> HMAC-SHA256 签名方案、参数排序规则、时间戳防重放

## 防重放攻击

> [!warning] 待补充
>
> nonce + timestamp 机制、Redis 去重窗口

## 幂等设计

→ 详见 [architecture/5_idempotence](../architecture/5_idempotence)

## 限流与熔断

→ 详见 [high-avail/1_rate_limiting](../high-avail/1_rate_limiting)

## HTTPS / TLS

> [!warning] 待补充
>
> TLS 握手流程、证书链校验、双向认证 mTLS

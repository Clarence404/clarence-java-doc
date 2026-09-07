# -*- coding: utf-8 -*-
"""SVG 绘图质量校验：按 CLAUDE.md「SVG 绘图质量规范」审查清单做机械检查。

用法：
    python scripts/svg_lint.py                 # 检查 docs/assets 下全部 SVG
    python scripts/svg_lint.py docs/assets/mysql             # 检查某目录
    python scripts/svg_lint.py docs/assets/mysql/mysql-icp.svg  # 检查单文件

检查项：
    [基线]  文字基线距所在 rect 底边 >= 12px
    [溢出]  文字估算宽度超出所在 rect 左右边界（估宽有 ±10% 误差，临界值需人工复核）
    [高度]  含 2 行及以上文字（按不同基线计）的 rect 高度 >= 60px
    [重叠]  非包含关系的兄弟 rect 相互交叠
    [线身]  带箭头的实线线身 >= 18px
    [压线]  文字包围盒与非虚线线段交叉（带 transform 的旋转文字跳过）
    [留白]  viewBox 下留白异常（排除铺满画布的背景 rect）

已知局限：不解析 <g transform>、<tspan>、CSS 继承链；估宽公式为近似值。
"""
import re, sys, io, os, math, glob

def attrs(tag):
    return dict(re.findall(r'([\w:-]+)="([^"]*)"', tag))

def f(v, d=0.0):
    try:
        return float(v)
    except (TypeError, ValueError):
        return d

def text_width(s, fs):
    w = 0.0
    for ch in s:
        if ord(ch) > 0x2E7F:
            w += fs                      # CJK 全角
        elif ch in 'iIl.,:;|!()[]':
            w += fs * 0.30
        elif ch.isupper() or ch in 'wm@':
            w += fs * 0.72
        else:
            w += fs * 0.55
    return w

def lint(path):
    src = io.open(path, encoding='utf-8').read()
    issues = []
    vb = re.search(r'viewBox="([\d.\s-]+)"', src)
    vbw = vbh = 0
    if vb:
        parts = vb.group(1).split()
        vbw, vbh = f(parts[2]), f(parts[3])
    m = re.search(r'<svg[^>]*font-size="(\d+)"', src)
    root_fs = f(m.group(1), 12) if m else 12
    # 从 <style> 提取 class 的 font-size 与 text-anchor
    cls_fs, cls_anchor = {}, {}
    style = re.search(r'<style>(.*?)</style>', src, re.S)
    if style:
        for mm in re.finditer(r'\.([\w-]+)\s*\{([^}]*)\}', style.group(1)):
            body = mm.group(2)
            fs = re.search(r'font-size\s*:\s*(\d+)px', body)
            an = re.search(r'text-anchor\s*:\s*(\w+)', body)
            if fs: cls_fs[mm.group(1)] = float(fs.group(1))
            if an: cls_anchor[mm.group(1)] = an.group(1)

    rects, texts, lines = [], [], []
    for mm in re.finditer(r'<rect\b[^>]*>', src):
        a = attrs(mm.group(0))
        rects.append(dict(x=f(a.get('x')), y=f(a.get('y')),
                          w=f(a.get('width')), h=f(a.get('height'))))
    for mm in re.finditer(r'<text\b([^>]*)>(.*?)</text>', src, re.S):
        a = attrs('<text ' + mm.group(1) + '>')
        content = re.sub(r'<[^>]+>', '', mm.group(2)).strip()
        fs = f(a.get('font-size'), 0)
        anchor = a.get('text-anchor')
        for c in a.get('class', '').split():
            if not fs and c in cls_fs: fs = cls_fs[c]
            if not anchor and c in cls_anchor: anchor = cls_anchor[c]
        texts.append(dict(x=f(a.get('x')), y=f(a.get('y')),
                          anchor=anchor or 'start', fs=fs or root_fs, s=content,
                          w=text_width(content, fs or root_fs),
                          rotated='transform' in a))
    for mm in re.finditer(r'<line\b[^>]*>', src):
        a = attrs(mm.group(0))
        dashed = 'stroke-dasharray' in mm.group(0)
        lines.append(dict(x1=f(a.get('x1')), y1=f(a.get('y1')),
                          x2=f(a.get('x2')), y2=f(a.get('y2')),
                          arrow='marker-end' in mm.group(0) or 'arr' in a.get('class', ''),
                          dashed=dashed))

    def tx_range(t):
        if t['anchor'] == 'middle': return (t['x'] - t['w']/2, t['x'] + t['w']/2)
        if t['anchor'] == 'end':    return (t['x'] - t['w'], t['x'])
        return (t['x'], t['x'] + t['w'])

    def owner_of(t):
        cands = [q for q in rects
                 if q['w'] > 0 and q['x']-1 <= t['x'] <= q['x']+q['w']+1
                 and q['y'] < t['y'] <= q['y']+q['h']+2]
        return min(cands, key=lambda q: q['w']*q['h']) if cands else None

    # 基线 / 溢出 / 高度
    for r in rects:
        if r['w'] <= 0 or r['h'] <= 0: continue
        own = [t for t in texts if owner_of(t) is r]
        for t in own:
            gap = r['y'] + r['h'] - t['y']
            if gap < 12:
                issues.append(f"[基线] rect(y={r['y']:.0f},h={r['h']:.0f}) 内文字 \"{t['s'][:14]}\" 基线距底边 {gap:.0f}px < 12")
            lo, hi = tx_range(t)
            if not t['rotated'] and (lo < r['x']-3 or hi > r['x']+r['w']+3):
                issues.append(f"[溢出] rect(x={r['x']:.0f},w={r['w']:.0f}) 内文字 \"{t['s'][:16]}\" 估宽 {t['w']:.0f} 超出框 ({lo:.0f}~{hi:.0f})")
        baselines = sorted({round(t['y']) for t in own})
        distinct = []
        for b in baselines:
            if not distinct or b - distinct[-1] > 4:
                distinct.append(b)
        if len(distinct) >= 2 and r['h'] < 60:
            issues.append(f"[高度] rect(y={r['y']:.0f},h={r['h']:.0f}) 含 {len(distinct)} 行文字但高度 < 60")

    # 重叠（跳过包含关系）
    def contains(o, q):
        return (o['x'] <= q['x']+2 and o['y'] <= q['y']+2
                and o['x']+o['w'] >= q['x']+q['w']-2 and o['y']+o['h'] >= q['y']+q['h']-2)
    for i in range(len(rects)):
        for j in range(i+1, len(rects)):
            a, b = rects[i], rects[j]
            if a['w'] <= 0 or b['w'] <= 0: continue
            if contains(a, b) or contains(b, a): continue
            ox = min(a['x']+a['w'], b['x']+b['w']) - max(a['x'], b['x'])
            oy = min(a['y']+a['h'], b['y']+b['h']) - max(a['y'], b['y'])
            if ox > 2 and oy > 2:
                issues.append(f"[重叠] rect(x={a['x']:.0f},y={a['y']:.0f}) 与 rect(x={b['x']:.0f},y={b['y']:.0f}) 交叠 {ox:.0f}x{oy:.0f}")

    # 线身
    for l in lines:
        if not l['arrow'] or l['dashed']: continue
        ln = math.hypot(l['x2']-l['x1'], l['y2']-l['y1'])
        if ln < 18:
            issues.append(f"[线身] 箭头 ({l['x1']:.0f},{l['y1']:.0f})->({l['x2']:.0f},{l['y2']:.0f}) 线身仅 {ln:.0f}px < 18")

    # 压线（采样判定文字 bbox 与线段相交；旋转文字跳过）
    for l in lines:
        if l['dashed']: continue
        for t in texts:
            if t['rotated']: continue
            lo, hi = tx_range(t)
            ty0, ty1 = t['y'] - t['fs'], t['y'] + 3
            for k in range(21):
                px = l['x1'] + (l['x2']-l['x1'])*k/20
                py = l['y1'] + (l['y2']-l['y1'])*k/20
                if lo+1 < px < hi-1 and ty0+1 < py < ty1-1:
                    issues.append(f"[压线] 文字 \"{t['s'][:14]}\" (y={t['y']:.0f}) 与线段 ({l['x1']:.0f},{l['y1']:.0f})->({l['x2']:.0f},{l['y2']:.0f}) 交叉")
                    break

    # 箭头对中：水平箭头应位于相邻框的垂直中心，垂直箭头应位于相邻框的水平中心（容差 3px）
    for l in lines:
        if l['dashed']: continue
        is_arrow = l.get('arrow')
        if not is_arrow: continue
        x1, y1, x2, y2 = l['x1'], l['y1'], l['x2'], l['y2']
        if abs(y1 - y2) < 1 and abs(x2 - x1) > 1:      # 水平箭头
            lo, hi, y = min(x1, x2), max(x1, x2), y1
            adj = [r for r in rects if r['h'] > 0 and r['y'] < y < r['y'] + r['h']
                   and (abs(r['x'] + r['w'] - lo) <= 10 or abs(r['x'] - hi) <= 10)]
            centers = [r['y'] + r['h']/2 for r in adj]
            if centers and min(abs(y - c) for c in centers) > 3:
                issues.append(f"[对中] 水平箭头 ({x1:.0f},{y1:.0f})->({x2:.0f},{y2:.0f}) 未对齐相邻框垂直中心（框中心 y={min(centers, key=lambda c: abs(y-c)):.0f}）")
        elif abs(x1 - x2) < 1 and abs(y2 - y1) > 1:    # 垂直箭头
            lo, hi, x = min(y1, y2), max(y1, y2), x1
            adj = [r for r in rects if r['w'] > 0 and r['x'] < x < r['x'] + r['w']
                   and (abs(r['y'] + r['h'] - lo) <= 10 or abs(r['y'] - hi) <= 10)]
            centers = [r['x'] + r['w']/2 for r in adj]
            if centers and min(abs(x - c) for c in centers) > 3:
                issues.append(f"[对中] 垂直箭头 ({x1:.0f},{y1:.0f})->({x2:.0f},{y2:.0f}) 未对齐相邻框水平中心（框中心 x={min(centers, key=lambda c: abs(x-c)):.0f}）")

    # 箭头端点连接：终点应距目标框迎面边 3~9px（穿入框内=被遮挡；>10px=悬空未连接）；
    # 起点应贴源框边（0~6px），>10px 视为悬空
    _fullbleed = [r for r in rects if vbw and r['w'] >= vbw*0.9 and r['h'] >= vbh*0.9]
    def _endpoint_check(l):
        x1, y1, x2, y2 = l['x1'], l['y1'], l['x2'], l['y2']
        horiz = abs(y1 - y2) < 1 and abs(x2 - x1) > 1
        vert = abs(x1 - x2) < 1 and abs(y2 - y1) > 1
        if not (horiz or vert): return
        # 终点是否规范指向某个框（距其迎面边 3~9px）→ 该情形下允许终点位于外层容器内部
        dh = (1 if x2 > x1 else -1) if horiz else (1 if y2 > y1 else -1)
        def _points_at_box():
            for r in rects:
                if r in _fullbleed: continue
                if horiz:
                    if not (r['y'] < y2 < r['y']+r['h']): continue
                    face = r['x'] if dh > 0 else r['x']+r['w']
                    g = (face - x2) * dh
                else:
                    if not (r['x'] < x2 < r['x']+r['w']): continue
                    face = r['y'] if dh > 0 else r['y']+r['h']
                    g = (face - y2) * dh
                if -1 <= g <= 5: return True
            return False
        _pointing = _points_at_box()
        # 终点穿入某框内部（排除背景 rect、包含起点的容器、以及规范指向子框的情形）
        for r in rects:
            if r in _fullbleed or r['w'] <= 4 or r['h'] <= 4: continue
            if r['x']-1 <= x1 <= r['x']+r['w']+1 and r['y']-1 <= y1 <= r['y']+r['h']+1:
                continue  # 起点也在其中 → 容器
            if r['x']+2 < x2 < r['x']+r['w']-2 and r['y']+2 < y2 < r['y']+r['h']-2:
                if _pointing: continue  # 正规范地指向容器内的子框
                issues.append(f"[端点] 箭头 ({x1:.0f},{y1:.0f})->({x2:.0f},{y2:.0f}) 终点穿入框(x={r['x']:.0f},y={r['y']:.0f})内部，箭头被遮挡")
                return
        def probe(px, py, d, is_end):
            gaps = []
            for r in rects:
                if r in _fullbleed or r['h'] <= 0: continue
                if horiz:
                    if not (r['y'] < py < r['y']+r['h']): continue
                    if is_end:
                        face = r['x'] if d > 0 else r['x']+r['w']
                        g = (face - px) * d
                    else:
                        back = r['x']+r['w'] if d > 0 else r['x']
                        g = (px - back) * d
                else:
                    if not (r['x'] < px < r['x']+r['w']): continue
                    if is_end:
                        face = r['y'] if d > 0 else r['y']+r['h']
                        g = (face - py) * d
                    else:
                        back = r['y']+r['h'] if d > 0 else r['y']
                        g = (py - back) * d
                if -2 <= g <= 40: gaps.append(g)
            if not gaps: return
            g = min(gaps)
            if g > 5:
                if is_end:
                    issues.append(f"[端点] 箭头终点 ({px:.0f},{py:.0f}) 距目标框迎面边 {g:.0f}px（应为 2px，尖端触框），未贴到框")
                else:
                    issues.append(f"[端点] 箭头起点 ({px:.0f},{py:.0f}) 距源框边 {g:.0f}px（应贴框 0px），起点悬空")
        d = (1 if x2 > x1 else -1) if horiz else (1 if y2 > y1 else -1)
        probe(x2, y2, d, True)
        probe(x1, y1, d, False)
    for l in lines:
        if l['dashed'] or not l.get('arrow'): continue
        _endpoint_check(l)

    # 箭头标注居中：水平/垂直箭头的伴随自由标注（不在任何 rect 内、贴近该线）应位于线段中点（容差 12px）
    def _free_text(t):
        for r in rects:
            if r['w'] > 0 and r['x'] <= t['x'] <= r['x']+r['w'] and r['y'] < t['y'] <= r['y']+r['h']+2:
                return False
        return True
    for l in lines:
        if l['dashed'] or not l.get('arrow'): continue
        x1, y1, x2, y2 = l['x1'], l['y1'], l['x2'], l['y2']
        if abs(y1 - y2) < 1 and abs(x2 - x1) > 1:
            mid = (x1 + x2) / 2
            for t in texts:
                if t['rotated'] or not _free_text(t): continue
                lo, hi = tx_range(t)
                cx = (lo + hi) / 2
                if abs(t['y'] - y1) <= 18 and min(x1, x2) - 10 <= cx <= max(x1, x2) + 10 and abs(cx - mid) > 12:
                    issues.append(f"[标注] 文字 \"{t['s'][:12]}\" 中心 x={cx:.0f} 偏离水平箭头 ({x1:.0f}~{x2:.0f}) 中点 {mid:.0f}")
        elif abs(x1 - x2) < 1 and abs(y2 - y1) > 1:
            mid = (y1 + y2) / 2
            for t in texts:
                if t['rotated'] or not _free_text(t): continue
                lo, hi = tx_range(t)
                near = (lo - 18 <= x1 <= hi + 18)
                cy = t['y'] - t['fs']/2
                if near and min(y1, y2) - 10 <= cy <= max(y1, y2) + 10 and abs(cy - mid) > 14:
                    issues.append(f"[标注] 文字 \"{t['s'][:12]}\" 中心 y={cy:.0f} 偏离垂直箭头 ({y1:.0f}~{y2:.0f}) 中点 {mid:.0f}")

    # 箭头 marker 定义：必须有 refY 且居中（缺 refY 会导致箭头头垂直错位成"哑铃"形）
    for mm in re.finditer(r'<marker\b[^>]*>', src):
        a = attrs(mm.group(0))
        mh = f(a.get('markerHeight'), 0)
        if 'refY' not in a:
            issues.append(f"[marker] <marker id={a.get('id','?')}> 缺少 refY（应为 markerHeight/2 = {mh/2:g}），箭头头会垂直错位")
        elif mh and abs(f(a.get('refY')) - mh/2) > 1:
            issues.append(f"[marker] <marker id={a.get('id','?')}> refY={a.get('refY')} 偏离居中值 {mh/2:g}，箭头头会偏离线端")

    # 留白（排除铺满画布的背景 rect）
    fg_rects = [r for r in rects if r['h'] > 0 and not (r['w'] >= vbw*0.9 and r['h'] >= vbh*0.9)]
    ys = [r['y'] for r in fg_rects] + [t['y']-t['fs'] for t in texts] + [min(l['y1'], l['y2']) for l in lines]
    ye = [r['y']+r['h'] for r in fg_rects] + [t['y']+3 for t in texts] + [max(l['y1'], l['y2']) for l in lines]
    if ys and vbh:
        bot = vbh - max(ye)
        if bot < 8 or bot > 40:
            issues.append(f"[留白] 下留白 {bot:.0f}px（建议 20px 左右，viewBox h={vbh:.0f}）")
    return issues

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    default_root = os.path.normpath(os.path.join(here, '..', 'docs', 'assets'))
    target = sys.argv[1] if len(sys.argv) > 1 else default_root
    files = [target] if target.endswith('.svg') else \
        sorted(glob.glob(os.path.join(target, '**', '*.svg'), recursive=True))
    report, total = {}, 0
    for p in files:
        iss = lint(p)
        if iss:
            report[os.path.relpath(p, default_root if not target.endswith('.svg') else os.path.dirname(p))] = iss
            total += len(iss)
    print(f"检查 {len(files)} 个 SVG，{len(report)} 个有疑点，共 {total} 条：\n")
    for k, v in report.items():
        print(f"### {k}")
        for i in v:
            print("  " + i)
        print()
    sys.exit(1 if report else 0)

if __name__ == '__main__':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass
    main()

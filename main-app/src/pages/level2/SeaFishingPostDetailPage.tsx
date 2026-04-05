import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import PageContainer from "../../components/PageContainer";

const PRIMARY = "#00B38A";
const DANGER = "#F56C6C";
const GRAY_BORDER = "#E4E7ED";
const TEXT_PRIMARY = "#303133";
const TEXT_SECONDARY = "#606266";
const TEXT_HINT = "#909399";

const IMG_FISH = "https://images.unsplash.com/photo-1667316720967-2636910deb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwb2NlYW4lMjBzZWElMjB0dW5hJTIwY2F0Y2h8ZW58MXx8fHwxNzc1MzA5NjkyfDA&ixlib=rb-4.1.0&q=80&w=800";
const IMG_BOAT = "https://images.unsplash.com/photo-1664546046715-e039cfce393a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBmaXNoaW5nJTIwYm9hdCUyMHN1bnJpc2V8ZW58MXx8fHwxNzc1MzA5NjkyfDA&ixlib=rb-4.1.0&q=80&w=800";
const AVATAR_MAIN = "https://images.unsplash.com/photo-1566644391853-1874e9b750aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdsZXIlMjBmaXNoZXJtYW4lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NzUzMDk2OTV8MA&ixlib=rb-4.1.0&q=80&w=200";

function ColorAvatar({ name, size, color }: { name: string; size: number; color: string }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: color, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
        color: "#fff", fontSize: size * 0.42, fontWeight: 500,
      }}
    >
      {name[0]}
    </div>
  );
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute", bottom: 80, left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 10}px)`,
        background: "rgba(0,0,0,0.72)", color: "#fff",
        borderRadius: 8, padding: "8px 16px", fontSize: 13,
        whiteSpace: "nowrap", zIndex: 999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s, transform 0.25s",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}

export default function SeaFishingPostDetailPage() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(23);
  const [commentText, setCommentText] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  function showToast(msg: string) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 1800);
  }

  function handleLike() {
    setLiked(v => !v);
    setLikeCount(v => liked ? v - 1 : v + 1);
    showToast(liked ? "已取消点赞" : "点赞成功 ❤️");
  }

  function handleSend() {
    if (!commentText.trim()) { showToast("请输入评论内容"); return; }
    showToast("评论发送成功 🎉");
    setCommentText("");
  }

  const comments = [
    {
      id: 1,
      name: "海浪钓客", color: "#409EFF",
      time: "1小时前",
      content: "太厉害了！金枪鱼连竿，光是想想就热血沸腾！请问用的什么竿子和饵料？明天我也想去试试！",
      replies: [
        { id: 11, name: "深海老钓手", color: PRIMARY, time: "58分钟前", content: "回复 @海浪钓客：用的是6.3米台钓竿配矶钓轮，饵料以活鱼饵为主，沙丁鱼效果最好！" }
      ]
    },
    {
      id: 2,
      name: "珠海渔达人", color: "#E6A23C",
      time: "45分钟前",
      content: "南澳这个点我知道！去年在那里也钓过大货，不过没这次这么猛，18公斤的蓝鳍真的很稀罕了👍",
      replies: []
    },
    {
      id: 3,
      name: "小白钓手", color: "#F56C6C",
      time: "20分钟前",
      content: "能问一下出海一天大概费用是多少？租船多少钱？是跟团还是自己租船？求攻略！完全没经验的新手",
      replies: []
    },
  ];

  return (
    <PageContainer>
      <div
        style={{
          width: "100%", maxWidth: 402, height: "100%",
          background: "#F5F7FA", position: "relative",
          display: "flex", flexDirection: "column", overflow: "hidden",
          fontFamily: '-apple-system, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
          flexShrink: 0,
        }}
      >
      {/* Status Bar */}
      <StatusBar />

      {/* Navigation Bar */}
      <div
        style={{
          height: 44, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 4px",
          borderBottom: `1px solid ${GRAY_BORDER}`,
          background: "#fff", flexShrink: 0,
        }}
      >
        <button onClick={() => navigate(-1)} style={{
          width: 44, height: 44, display: "flex", alignItems: "center",
          justifyContent: "center", background: "none", border: "none",
          cursor: "pointer", borderRadius: 8, flexShrink: 0,
        }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <span style={{ fontSize: 18, fontWeight: 500, color: TEXT_PRIMARY, position: "absolute", left: "50%", transform: "translateX(-50%" }}>
          帖子详情
        </span>

        <button onClick={() => showToast("举报 / 分享")} style={{
          width: 44, height: 44, display: "flex", alignItems: "center",
          justifyContent: "center", background: "none", border: "none",
          cursor: "pointer", borderRadius: 8, flexShrink: 0,
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="5.5" r="1.5" fill={TEXT_SECONDARY} />
            <circle cx="11" cy="11" r="1.5" fill={TEXT_SECONDARY} />
            <circle cx="11" cy="16.5" r="1.5" fill={TEXT_SECONDARY} />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px 8px", display: "flex", flexDirection: "column", gap: 0 }}
        className="custom-scrollbar">

        {/* Post Card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <img src={AVATAR_MAIN} alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY }}>深海老钓手</div>
              <div style={{ fontSize: 12, color: TEXT_HINT }}>2小时前 · 广东南澳</div>
            </div>
          </div>

          {/* Title */}
          <div style={{ fontSize: 16, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 8, lineHeight: 1.4 }}>
            今天南澳爆箱！金枪鱼群来了 🎣
          </div>

          {/* Body */}
          <div style={{ fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: 10 }}>
            早上6点从南澳码头出发，顺着洋流走了大概20海里，鱼探仪突然显示巨大鱼群！连竿了足足两个小时，钓了十几条蓝鳍金枪鱼，最大一条估计有18公斤！船长说这是今年见过最大规模的鱼群。强烈推荐大家趁这两天天气窗口来！🐟🐟
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {["#南澳海钓", "#金枪鱼", "#爆箱", "#广东钓鱼"].map(tag => (
              <span key={tag} style={{ fontSize: 12, color: PRIMARY, background: "rgba(0,179,138,0.08)", borderRadius: 4, padding: "2px 6px" }}>{tag}</span>
            ))}
          </div>

          {/* Image Gallery */}
          <div style={{ overflowX: "auto", display: "flex", gap: 8, paddingBottom: 2, marginBottom: 12 }} className="hide-scrollbar">
            {[IMG_FISH, IMG_BOAT].map((src, i) => (
              <div key={i} style={{ flexShrink: 0, width: 180, height: 120, borderRadius: 8, overflow: "hidden", background: "#E4E7ED" }}>
                <img src={src} alt={`图${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
            <div style={{ flexShrink: 0, width: 180, height: 120, borderRadius: 8, background: "#E4E7ED", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="3" y="7" width="26" height="20" rx="3" stroke="#C0C4CC" strokeWidth="1.8"/>
                <circle cx="11" cy="14" r="2.5" stroke="#C0C4CC" strokeWidth="1.6"/>
                <path d="M3 22L10 16L15 21L20 15L29 23" stroke="#C0C4CC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 12, color: TEXT_HINT }}>图片3</span>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, borderTop: `1px solid ${GRAY_BORDER}`, paddingTop: 10 }}>
            <button onClick={handleLike} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: liked ? DANGER : TEXT_SECONDARY, fontSize: 14, padding: "4px 0" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill={liked ? DANGER : "none"}>
                <path d="M9 15.5S2 11.2 2 6.5C2 4.5 3.5 3 5.5 3c1.1 0 2.1.55 2.7 1.4L9 5.5l.8-1.1C10.4 3.55 11.4 3 12.5 3 14.5 3 16 4.5 16 6.5c0 4.7-7 9-7 9z"
                  stroke={liked ? DANGER : TEXT_SECONDARY} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontWeight: liked ? 500 : 400 }}>{likeCount}</span>
            </button>
            <button onClick={() => { inputRef.current?.focus(); showToast("写下你的评论～"); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: TEXT_SECONDARY, fontSize: 14, padding: "4px 0" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 2H3a1 1 0 00-1 1v9a1 1 0 001 1h2v3l4-3h6a1 1 0 001-1V3a1 1 0 00-1-1z" stroke={TEXT_SECONDARY} strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span>8</span>
            </button>
            <button onClick={() => showToast("跳转微信分享帖子")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: TEXT_SECONDARY, fontSize: 14, padding: "4px 0" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="14" cy="4" r="2" stroke={TEXT_SECONDARY} strokeWidth="1.5"/>
                <circle cx="4" cy="9" r="2" stroke={TEXT_SECONDARY} strokeWidth="1.5"/>
                <circle cx="14" cy="14" r="2" stroke={TEXT_SECONDARY} strokeWidth="1.5"/>
                <path d="M6 8L12 5M6 10L12 13" stroke={TEXT_SECONDARY} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div style={{ fontSize: 14, fontWeight: 500, color: TEXT_SECONDARY, marginTop: 12, marginBottom: 4, paddingLeft: 2 }}>
          全部评论（8）
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: "0 12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 8 }}>
          {comments.map(c => (
            <div key={c.id} style={{ padding: "10px 0", borderBottom: c.id !== comments[comments.length - 1].id ? `1px solid ${GRAY_BORDER}` : "none" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <ColorAvatar name={c.name} size={28} color={c.color} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: TEXT_HINT }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.55, marginBottom: 6 }}>{c.content}</div>
                  <button onClick={() => showToast(`回复 @${c.name}`)} style={{ fontSize: 12, color: TEXT_HINT, background: "none", border: "none", cursor: "pointer", padding: 0 }}>回复</button>
                  {c.replies.map(reply => (
                    <div key={reply.id} style={{ marginTop: 8, background: "#F5F7FA", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <ColorAvatar name={reply.name} size={20} color={reply.color} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: TEXT_PRIMARY }}>{reply.name}</span>
                        <span style={{ fontSize: 11, color: TEXT_HINT }}>{reply.time}</span>
                      </div>
                      <div style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.5 }}>{reply.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center", padding: "10px 0", fontSize: 12, color: TEXT_HINT }}>— 共 8 条评论，已显示 3 条 —</div>
        </div>
      </div>

      {/* Bottom Input */}
      <div style={{ height: 56, flexShrink: 0, borderTop: `1px solid ${GRAY_BORDER}`, background: "#fff", display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
        <div style={{ flex: 1, height: 36, borderRadius: 18, background: "#F5F7FA", border: `1px solid ${GRAY_BORDER}`, display: "flex", alignItems: "center", padding: "0 12px" }}>
          <input
            ref={inputRef}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="写下你的评论..."
            style={{ width: "100%", background: "none", border: "none", outline: "none", fontSize: 14, color: TEXT_PRIMARY }}
          />
        </div>
        <button onClick={handleSend} style={{ flexShrink: 0, padding: "0 14px", height: 36, borderRadius: 8, border: "none", background: commentText.trim() ? PRIMARY : GRAY_BORDER, color: commentText.trim() ? "#fff" : TEXT_HINT, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          发送
        </button>
      </div>

      <Toast message={toast.message} visible={toast.visible} />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E4E7ED; border-radius: 2px; }
        input::placeholder { color: #909399; }
        button:active { opacity: 0.75; }
      `}</style>
      </div>
    </PageContainer>
  );
}

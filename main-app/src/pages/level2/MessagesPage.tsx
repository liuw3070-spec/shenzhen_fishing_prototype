import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import PageContainer from "../../components/PageContainer";

type MessageType = "carpool" | "system" | "order";
type TabKey = "all" | "carpool" | "system";

interface Message {
  id: string;
  type: MessageType;
  title: string;
  summary: string;
  time: string;
  unread: boolean;
  hasAction?: boolean;
}

const ALL_MESSAGES: Message[] = [
  { id: "1", type: "carpool", title: "车主阿强接受了你的拼车邀请", summary: "出发时间：5月20日 06:00，上车点：深圳大学北门", time: "10分钟前", unread: true },
  { id: "2", type: "system", title: '您的船班"深海猎人号"已成团', summary: "恭喜！定金 ¥200 已成功划扣，请按时前往码头集合。", time: "1小时前", unread: false },
  { id: "3", type: "order", title: "乘客小白取消了拼车订单", summary: "取消原因：临时有事，已为你自动重新发布行程。", time: "3小时前", unread: true },
  { id: "4", type: "carpool", title: "乘客小李邀请你接单", summary: "起点：南山科技园 → 终点：宝安机场 T3，06:30 出发", time: "昨天 22:15", unread: true, hasAction: true },
  { id: "5", type: "system", title: "系统维护通知", summary: "平台将于今晚 02:00–04:00 进行例行维护，届时服务暂停。", time: "昨天 18:00", unread: false },
  { id: "6", type: "order", title: "你的行程已完成", summary: "感谢使用，行程评价已开放，欢迎对车主阿强进行评价。", time: "前天 09:30", unread: false },
];

const CARPOOL_MESSAGES = ALL_MESSAGES.filter((m) => m.type === "carpool");
const SYSTEM_MESSAGES = ALL_MESSAGES.filter((m) => m.type === "system");
const TAB_MAP: Record<TabKey, Message[]> = { all: ALL_MESSAGES, carpool: CARPOOL_MESSAGES, system: SYSTEM_MESSAGES };

function MessageIcon({ type }: { type: MessageType }) {
  const styleBase = { width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
  if (type === "carpool") return <div style={{ ...styleBase, background: "rgba(0,179,138,0.12)" }}><span style={{ fontSize: 20 }}>🚗</span></div>;
  if (type === "system") return <div style={{ ...styleBase, background: "rgba(91,148,255,0.12)" }}><span style={{ fontSize: 20 }}>📢</span></div>;
  return <div style={{ ...styleBase, background: "rgba(245,108,108,0.12)" }}><span style={{ fontSize: 20 }}>📦</span></div>;
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute", bottom: 80, left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 10}px)`,
        opacity: visible ? 1 : 0, transition: "all 0.25s ease",
        background: "rgba(0,0,0,0.72)", color: "#fff",
        borderRadius: 8, padding: "8px 20px", fontSize: 14,
        whiteSpace: "nowrap", pointerEvents: "none", zIndex: 999,
      }}
    >
      {message}
    </div>
  );
}

export default function MessagesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const messages = TAB_MAP[activeTab];
  const unreadCount: Record<TabKey, number> = {
    all: ALL_MESSAGES.filter((m) => m.unread).length,
    carpool: CARPOOL_MESSAGES.filter((m) => m.unread).length,
    system: SYSTEM_MESSAGES.filter((m) => m.unread).length,
  };

  const TABS: { key: TabKey; label: string }[] = [
    { key: "all", label: "全部消息" },
    { key: "carpool", label: "拼车消息" },
    { key: "system", label: "系统通知" },
  ];

  return (
    <PageContainer>
      <div
        style={{
          width: "100%", maxWidth: 402, height: "100%",
          background: "#F5F6FA", position: "relative",
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
          justifyContent: "space-between", padding: "0 16px",
          borderBottom: "1px solid #f0f0f0", background: "#fff", flexShrink: 0,
        }}
      >
        <button onClick={() => navigate(-1)} style={{
          minWidth: 60, color: "#00B38A", background: "none", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 1, padding: 0,
          font: "inherit", fontSize: 16,
        }}>
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M8 1L1 8l7 7" stroke="#00B38A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回
        </button>

        <span style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a" }}>消息</span>

        <button onClick={() => showToast("清空所有消息")} style={{
          minWidth: 60, textAlign: "right", color: "#00B38A", fontSize: 15,
          background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit",
        }}>
          清空
        </button>
      </div>

      {/* Tab Bar */}
      <div style={{ height: 36, borderBottom: "1px solid #f0f0f0", background: "#fff", flexShrink: 0, display: "flex" }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
                fontSize: 13, color: isActive ? "#00B38A" : "#717182",
                background: "none", border: "none", cursor: "pointer", position: "relative", padding: 0,
              }}
            >
              <span>{tab.label}</span>
              {unreadCount[tab.key] > 0 && (
                <span style={{ background: "#F56C6C", color: "#fff", fontSize: 10, minWidth: 16, height: 16, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 3px", lineHeight: 1 }}>
                  {unreadCount[tab.key]}
                </span>
              )}
              {isActive && <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 32, height: 2, borderRadius: 2, background: "#00B38A" }} />}
            </button>
          );
        })}
      </div>

      {/* Message List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px 0" }}>
        {messages.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, color: "#C0C4CC", fontSize: 14 }}>
            <span style={{ fontSize: 40 }}>📭</span>
            <span style={{ marginTop: 12 }}>暂无消息</span>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => showToast("查看消息详情")}
              style={{
                display: "flex", alignItems: "start", gap: 12,
                background: "#fff", borderRadius: 12, padding: 12, marginBottom: 6,
                cursor: "pointer",
              }}
            >
              <MessageIcon type={msg.type} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.5 }}>{msg.title}</span>
                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center", marginTop: 3 }}>
                    {msg.unread ? (
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F56C6C", display: "block" }} />
                    ) : (
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#909399", marginTop: 3, lineHeight: 1.6 }}>{msg.summary}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: "#C0C4CC" }}>{msg.time}</span>
                  {msg.hasAction && (
                    <button
                      onClick={(e) => { e.stopPropagation(); showToast("查看消息详情"); }}
                      style={{ background: "#00B38A", color: "#fff", fontSize: 12, padding: "3px 10px", borderRadius: 8, lineHeight: 1.6, border: "none", cursor: "pointer" }}
                    >
                      查看
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        <div style={{ textAlign: "center", color: "#C0C4CC", fontSize: 12, padding: "12px 0 20px" }}>没有更多消息</div>
      </div>

      <Toast message={toastMsg} visible={toastVisible} />
      </div>
    </PageContainer>
  );
}

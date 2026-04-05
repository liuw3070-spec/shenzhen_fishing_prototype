import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import PageContainer from "../../components/PageContainer";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      style={{
        width: 51, height: 31, borderRadius: 15.5,
        backgroundColor: checked ? "#00B38A" : "#E4E7ED",
        position: "relative", cursor: "pointer",
        transition: "background-color 0.25s ease", flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute", top: 2,
          left: checked ? 22 : 2, width: 27, height: 27,
          borderRadius: "50%", backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.22)",
          transition: "left 0.25s ease",
        }}
      />
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1L6 6L1 11" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute", bottom: 80, left: "50%",
        transform: `translateX(-50%)`,
        backgroundColor: "rgba(0,0,0,0.72)", color: "#fff",
        borderRadius: 10, padding: "10px 18px", fontSize: 14,
        whiteSpace: "nowrap", zIndex: 100,
        opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );
}

function ConfirmDialog({ visible, title, onConfirm, onCancel }: { visible: boolean; title: string; onConfirm: () => void; onCancel: () => void }) {
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: 14, width: 270, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
        <div style={{ padding: "20px 16px 12px", textAlign: "center" }}>
          <p style={{ fontSize: 17, fontWeight: 600, color: "#111", marginBottom: 6 }}>退出登录</p>
          <p style={{ fontSize: 13, color: "#666" }}>{title}</p>
        </div>
        <div style={{ borderTop: "1px solid #E4E7ED", display: "flex" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "13px 0", fontSize: 17, color: "#333", background: "none", border: "none", borderRight: "1px solid #E4E7ED", cursor: "pointer" }}>取消</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "13px 0", fontSize: 17, color: "#FF3B30", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>退出</button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notifOn, setNotifOn] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [confirmVisible, setConfirmVisible] = useState(false);

  const showToast = (msg: string) => setToast({ visible: true, message: msg });

  useEffect(() => {
    if (toast.visible) {
      const t = setTimeout(() => setToast((p) => ({ ...p, visible: false })), 2000);
      return () => clearTimeout(t);
    }
  }, [toast.visible]);

  const handleToggleNotif = () => {
    const next = !notifOn;
    setNotifOn(next);
    showToast(next ? "通知已开启" : "通知已关闭");
  };

  return (
    <PageContainer>
      <div
        style={{
          width: "100%", maxWidth: 402, height: "100%",
          backgroundColor: "#F5F5F7", position: "relative",
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
          height: 44, backgroundColor: "#F5F5F7",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            paddingLeft: 16, paddingRight: 12, display: "flex",
            alignItems: "center", gap: 4, background: "none",
            border: "none", cursor: "pointer",
          }}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#00B38A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 16, color: "#00B38A", fontWeight: 400 }}>返回</span>
        </button>
        <span style={{ fontSize: 18, fontWeight: 500, color: "#111" }}>设置</span>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingTop: 12, paddingBottom: 40 }} className="settings-scroll">

        {/* Section 1: 通知与权限 */}
        <div style={{ paddingLeft: 16, paddingBottom: 8 }}><span style={{ fontSize: 12, color: "#909399" }}>通知与权限</span></div>
        <div style={{ marginLeft: 12, marginRight: 12, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52 }}>
            <span style={{ fontSize: 14, color: "#111" }}>消息通知</span>
            <Toggle checked={notifOn} onChange={handleToggleNotif} />
          </div>
          <div style={{ height: 1, backgroundColor: "#F2F3F5", marginLeft: 16 }} />
          <button onClick={() => showToast("前往系统设置授权")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}>
            <span style={{ fontSize: 14, color: "#111" }}>位置权限</span>
            <ChevronRight />
          </button>
          <div style={{ height: 1, backgroundColor: "#F2F3F5", marginLeft: 16 }} />
          <button onClick={() => showToast("授权通讯录")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}>
            <div>
              <div style={{ fontSize: 14, color: "#111" }}>通讯录权限</div>
              <div style={{ fontSize: 12, color: "#909399", marginTop: 1 }}>用于紧急联系人</div>
            </div>
            <ChevronRight />
          </button>
        </div>

        {/* Section 2: 关于与反馈 */}
        <div style={{ paddingLeft: 16, paddingBottom: 8 }}><span style={{ fontSize: 12, color: "#909399" }}>关于与反馈</span></div>
        <div style={{ marginLeft: 12, marginRight: 12, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          <button onClick={() => showToast("查看版本信息")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}>
            <span style={{ fontSize: 14, color: "#111" }}>关于深钓鱼</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14, color: "#909399" }}>V1.0.0</span>
              <ChevronRight />
            </div>
          </button>
          <div style={{ height: 1, backgroundColor: "#F2F3F5", marginLeft: 16 }} />
          <button onClick={() => showToast("查看协议")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}>
            <span style={{ fontSize: 14, color: "#111" }}>用户协议与隐私政策</span>
            <ChevronRight />
          </button>
          <div style={{ height: 1, backgroundColor: "#F2F3F5", marginLeft: 16 }} />
          <button onClick={() => showToast("联系客服反馈")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}>
            <span style={{ fontSize: 14, color: "#111" }}>意见反馈</span>
            <ChevronRight />
          </button>
          <div style={{ height: 1, backgroundColor: "#F2F3F5", marginLeft: 16 }} />
          <button onClick={() => showToast("清除缓存")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit" }}>
            <span style={{ fontSize: 14, color: "#111" }}>清除缓存</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14, color: "#909399" }}>128MB</span>
              <ChevronRight />
            </div>
          </button>
        </div>

        {/* Logout Button */}
        <div style={{ marginLeft: 12, marginRight: 12 }}>
          <button onClick={() => setConfirmVisible(true)} style={{ width: "100%", height: 50, backgroundColor: "#fff", borderRadius: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF3B30", fontSize: 16, fontWeight: 500 }}>
            退出登录
          </button>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
      <ConfirmDialog
        visible={confirmVisible}
        title="确定退出登录？"
        onConfirm={() => { setConfirmVisible(false); showToast("已退出登录"); }}
        onCancel={() => setConfirmVisible(false)}
      />

      <style>{`
        .settings-scroll::-webkit-scrollbar { width: 2px; }
        .settings-scroll::-webkit-scrollbar-track { background: transparent; }
        .settings-scroll::-webkit-scrollbar-thumb { background: #E4E7ED; border-radius: 2px; }
        .settings-scroll { scrollbar-width: thin; scrollbar-color: #E4E7ED transparent; }
      `}</style>
      </div>
    </PageContainer>
  );
}

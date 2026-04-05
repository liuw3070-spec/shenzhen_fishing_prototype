import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import StatusBar from "../../components/StatusBar";

// ── Toast 提示组件 ──────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
        opacity: visible ? 1 : 0,
        transition: "all 0.28s ease",
        background: "rgba(0,0,0,0.72)",
        color: "#fff",
        borderRadius: 8,
        padding: "9px 20px",
        fontSize: 13,
        whiteSpace: "nowrap",
        zIndex: 999,
        pointerEvents: "none",
        maxWidth: 300,
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      {message}
    </div>
  );
}

// ── 导航栏 ──────────────────────────────────────────────────────
function NavBar({ onBack }: { onBack: () => void }) {
  return (
    <div style={{
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      position: "relative",
      flexShrink: 0,
      borderBottom: "1px solid #f0f0f0",
    }}>
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          left: 0,
          width: 44,
          height: 44,
          border: "none",
          background: "transparent",
          borderRadius: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 标题 */}
      <span style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a" }}>确认订单</span>

      {/* 右侧客服图标 */}
      <div style={{ position: "absolute", right: 16, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" stroke="#999" strokeWidth="1.4" fill="none"/>
          <path d="M7 9.5C7 7.5 8.8 6 11 6s4 1.5 4 3.5c0 1.5-.9 2.8-2.3 3.4L11 14" stroke="#999" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <circle cx="11" cy="16.5" r="0.9" fill="#999"/>
        </svg>
      </div>
    </div>
  );
}

// ── 船班信息卡片 ────────────────────────────────────────────────
function ShipInfoCard() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    }}>
      {/* 标题行 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <div style={{
          width: 3,
          height: 16,
          background: "#00B38A",
          borderRadius: 2,
          marginRight: 8,
        }} />
        <span style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a" }}>深海猎人号</span>
        <span style={{
          marginLeft: 8,
          background: "#E6F9F5",
          color: "#00B38A",
          fontSize: 11,
          padding: "2px 7px",
          borderRadius: 4,
          fontWeight: 500,
        }}>拼船</span>
      </div>

      {/* 信息列表 */}
      {[
        { icon: "📍", label: "目的地", value: "三门岛外海" },
        { icon: "⏰", label: "发船时间", value: "2026年5月18日  06:00 - 18:00" },
        { icon: "🚢", label: "集合码头", value: "南澳渔港" },
      ].map((item) => (
        <div key={item.label} style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: 8,
          gap: 6,
        }}>
          <span style={{ fontSize: 13, lineHeight: "20px", minWidth: 18, textAlign: "center" }}>{item.icon}</span>
          <span style={{ fontSize: 13, color: "#888", minWidth: 54, lineHeight: "20px" }}>{item.label}</span>
          <span style={{ fontSize: 13, color: "#333", flex: 1, lineHeight: "20px" }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── 价格明细卡片 ────────────────────────────────────────────────
function PriceCard() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 14 }}>价格明细</div>

      {/* 定金 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 14, color: "#333" }}>定金</span>
          <span style={{ fontSize: 11, color: "#00B38A", background: "#E6F9F5", padding: "1px 6px", borderRadius: 3, marginLeft: 6 }}>锁定座位</span>
        </div>
        <span style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>¥120</span>
      </div>

      {/* 尾款 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 14, color: "#333" }}>尾款</span>
          <span style={{ fontSize: 11, color: "#888", background: "#f5f5f5", padding: "1px 6px", borderRadius: 3, marginLeft: 6 }}>登船前支付</span>
        </div>
        <span style={{ fontSize: 14, color: "#666" }}>¥380</span>
      </div>

      {/* 分隔线 */}
      <div style={{ height: 1, background: "#f0f0f0", margin: "12px 0" }} />

      {/* 合计 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>合计</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>¥</span>
          <span style={{ fontSize: 22, fontWeight: 600, color: "#1a1a1a" }}>500</span>
        </div>
      </div>

      {/* 说明 */}
      <div style={{
        background: "#FFF8E6",
        borderRadius: 6,
        padding: "8px 10px",
        display: "flex",
        alignItems: "flex-start",
        gap: 5,
      }}>
        <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>💡</span>
        <span style={{ fontSize: 11, color: "#906000", lineHeight: 1.6 }}>
          定金支付后进入众筹池，成团后自动划扣，未成团全额退回
        </span>
      </div>
    </div>
  );
}

// ── 保险勾选区域 ────────────────────────────────────────────────
function InsuranceSection({
  checked,
  onChange,
  onShowToast,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  onShowToast: (msg: string) => void;
}) {
  const handleClick = () => {
    const next = !checked;
    onChange(next);
    onShowToast(next ? "✅ 已勾选保险" : "已取消保险勾选");
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      border: checked ? "1.5px solid #00B38A" : "1.5px solid #FFD6D6",
    }}>
      {/* 必填标签 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <span style={{
          background: "#F56C6C",
          color: "#fff",
          fontSize: 11,
          padding: "2px 7px",
          borderRadius: 4,
          marginRight: 8,
          fontWeight: 500,
        }}>必填</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>出行保险</span>
      </div>

      {/* 勾选行 */}
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          padding: "8px 0",
        }}
      >
        {/* 圆形勾选框 */}
        <div style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: checked ? "none" : "2px solid #ccc",
          background: checked ? "#00B38A" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}>
          {checked && (
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
              <path d="M1.5 5L5.5 9L11.5 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>
            我已阅读并同意购买
            <span style={{ color: "#00B38A", fontWeight: 500 }}>《单日海钓意外险》</span>
          </div>
        </div>

        <div style={{
          background: "#FFF3E0",
          borderRadius: 6,
          padding: "4px 8px",
          flexShrink: 0,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#E65100" }}>¥20</div>
          <div style={{ fontSize: 10, color: "#E65100" }}>/ 人</div>
        </div>
      </div>

      {/* 小字说明 */}
      <div style={{
        fontSize: 11,
        color: "#999",
        lineHeight: 1.6,
        paddingTop: 6,
        borderTop: "1px solid #f5f5f5",
        marginTop: 4,
      }}>
        🛡️ 保险保障当日意外医疗及身故，由平安保险承保
      </div>
    </div>
  );
}

// ── 协议区域 ────────────────────────────────────────────────────
function AgreementSection({
  agreed,
  onAgree,
  onShowToast,
}: {
  agreed: boolean;
  onAgree: (v: boolean) => void;
  onShowToast: (msg: string) => void;
}) {
  const [countdown, setCountdown] = useState(3);
  const [counting, setCounting] = useState(false);
  const [canAgree, setCanAgree] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    if (counting || canAgree) return;
    setCounting(true);
    setCountdown(3);
    let c = 3;
    timerRef.current = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(timerRef.current!);
        setCounting(false);
        setCanAgree(true);
      }
    }, 1000);
  };

  const handleReadBtn = () => {
    onShowToast("📖 查看完整协议");
    if (!canAgree) startCountdown();
  };

  const handleCheck = () => {
    if (!canAgree) {
      onShowToast('请先点击"阅读协议"完成阅读');
      return;
    }
    const next = !agreed;
    onAgree(next);
    onShowToast(next ? "✅ 已同意协议" : "已取消协议勾选");
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      border: agreed ? "1.5px solid #00B38A" : "1.5px solid #f0f0f0",
    }}>
      {/* 标题行 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            background: "#F56C6C",
            color: "#fff",
            fontSize: 11,
            padding: "2px 7px",
            borderRadius: 4,
            fontWeight: 500,
          }}>必读</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>免责协议签署</span>
        </div>
        <button
          onClick={handleReadBtn}
          style={{
            border: "1px solid #00B38A",
            background: "transparent",
            color: "#00B38A",
            fontSize: 12,
            padding: "3px 10px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          阅读协议
        </button>
      </div>

      {/* 协议标题 */}
      <div style={{ fontSize: 12, color: "#00B38A", fontWeight: 500, marginBottom: 8 }}>
        《平台拼船对赌协议与不可抗力免责声明》
      </div>

      {/* 协议摘要滚动框 */}
      <div style={{
        background: "#F8F8F8",
        borderRadius: 8,
        padding: "10px 12px",
        height: 80,
        overflowY: "auto",
        marginBottom: 10,
        scrollbarWidth: "thin",
        scrollbarColor: "#E4E7ED transparent",
      }}>
        <p style={{ fontSize: 11, color: "#666", lineHeight: 1.8, margin: 0 }}>
          一、本人已知晓出海垂钓存在一定风险，自愿参与拼船众筹活动。<br/>
          二、同意T-12h成团规则：出发前12小时仍未达到成团人数，本次众筹自动取消，定金全额退回。<br/>
          三、不可抗力条款：因台风、大风浪、禁渔令、政府管控等不可抗力导致行程取消，平台不承担违约责任，定金全额退回。<br/>
          四、本人已购买单日意外险，了解保险保障范围及免责条款。<br/>
          五、平台不设资金池，定金以预授权方式冻结，成团后自动划扣，未成团自动解冻。<br/>
          六、本人同意以上全部条款，自愿签署本协议。
        </p>
      </div>

      {/* 倒计时 / 勾选区 */}
      {!canAgree ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 0",
        }}>
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "2px solid #ddd",
            background: "transparent",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {counting && (
              <span style={{ fontSize: 10, color: "#999", fontWeight: 600 }}>{countdown}</span>
            )}
          </div>
          <span style={{ fontSize: 12, color: "#999" }}>
            {counting
              ? `阅读并同意协议（剩余 ${countdown} 秒）`
              : '点击"阅读协议"后方可同意'}
          </span>
        </div>
      ) : (
        <div
          onClick={handleCheck}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: agreed ? "none" : "2px solid #ccc",
            background: agreed ? "#00B38A" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}>
            {agreed && (
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path d="M1.5 5L5.5 9L11.5 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: "#333" }}>我已阅读并同意以上协议</span>
        </div>
      )}
    </div>
  );
}

// ── 定金说明条 ──────────────────────────────────────────────────
function PaymentNotice() {
  return (
    <div style={{
      background: "#F0FAF7",
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      display: "flex",
      alignItems: "flex-start",
      gap: 6,
      border: "1px solid #C8EFE6",
    }}>
      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 0 }}>🔒</span>
      <span style={{ fontSize: 12, color: "#006655", lineHeight: 1.7 }}>
        该笔资金仅为<strong>预授权冻结</strong>，成团后自动划扣，未成行自动退回。
        <span style={{ color: "#00B38A", fontWeight: 500 }}>平台不设资金池。</span>
      </span>
    </div>
  );
}

// ── 底部按钮 ────────────────────────────────────────────────────
function BottomButton({
  insuranceChecked,
  agreementAgreed,
  onShowToast,
}: {
  insuranceChecked: boolean;
  agreementAgreed: boolean;
  onShowToast: (msg: string) => void;
}) {
  const canPay = insuranceChecked && agreementAgreed;

  const handlePay = () => {
    if (!insuranceChecked && !agreementAgreed) {
      onShowToast("请勾选保险并同意协议");
    } else if (!insuranceChecked) {
      onShowToast("请勾选保险");
    } else if (!agreementAgreed) {
      onShowToast("请同意免责协议");
    } else {
      onShowToast("🎉 拉起微信支付预授权，冻结定金120元，进入众筹等待池");
    }
  };

  return (
    <div style={{
      height: 80,
      flexShrink: 0,
      background: "#fff",
      borderTop: "1px solid #f0f0f0",
      padding: "12px 16px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 0,
    }}>
      <button
        onClick={handlePay}
        style={{
          width: "100%",
          height: 44,
          borderRadius: 8,
          border: "none",
          background: canPay ? "#00B38A" : "#B0B0B0",
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.25s, transform 0.1s",
          letterSpacing: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          boxShadow: canPay ? "0 4px 16px rgba(0,179,138,0.3)" : "none",
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        <span>确认支付定金</span>
        <span style={{
          background: "rgba(255,255,255,0.25)",
          borderRadius: 5,
          padding: "1px 8px",
          fontSize: 15,
          fontWeight: 600,
        }}>¥120</span>
      </button>
    </div>
  );
}

// ── 主组件 ──────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [insuranceChecked, setInsuranceChecked] = useState(false);
  const [agreementAgreed, setAgreementAgreed] = useState(false);

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <div style={{
        width: "100%",
        maxWidth: 402,
        height: "100%",
        background: "#F5F7FA",
        borderRadius: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexShrink: 0,
        boxShadow: '0 0 40px rgba(0,0,0,0.1)',
      }}>
        {/* 状态栏 */}
        <div style={{ background: "#fff", flexShrink: 0 }}>
          <StatusBar />
        </div>

        {/* 导航栏 */}
        <NavBar onBack={handleBack} />

        {/* 可滚动内容区 */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 12px 0",
          scrollbarWidth: "thin",
          scrollbarColor: "#E4E7ED transparent",
        }}>
          <style>{`
            ::-webkit-scrollbar {
              width: 2px;
            }
            ::-webkit-scrollbar-track {
              background: transparent;
            }
            ::-webkit-scrollbar-thumb {
              background: #E4E7ED;
              border-radius: 2px;
            }
          `}</style>

          <ShipInfoCard />
          <PriceCard />
          <InsuranceSection
            checked={insuranceChecked}
            onChange={setInsuranceChecked}
            onShowToast={showToast}
          />
          <AgreementSection
            agreed={agreementAgreed}
            onAgree={setAgreementAgreed}
            onShowToast={showToast}
          />
          <PaymentNotice />
        </div>

        {/* 底部固定按钮 */}
        <BottomButton
          insuranceChecked={insuranceChecked}
          agreementAgreed={agreementAgreed}
          onShowToast={showToast}
        />

        {/* Toast */}
        <Toast message={toastMsg} visible={toastVisible} />
      </div>
    </PageContainer>
  );
}
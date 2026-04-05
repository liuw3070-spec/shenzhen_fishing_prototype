import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, ChevronRight, Clock, Phone, MessageSquare, MoreVertical, Share2 } from 'lucide-react';
import './App.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatusBar from '../../components/StatusBar';
import PageContainer from '../../components/PageContainer';

interface Order {
  id: string;
  type: 'shore-ride-passenger' | 'shore-ride-driver' | 'sea-fishing' | 'completed';
  status: 'pending' | 'ongoing' | 'to-review';
  date: string;
  time: string;
  from: string;
  to: string;
  returnTime?: string;
  passengers?: number;
  seats?: number;
  price: string;
  interestedCount?: number;
  participants?: number;
  minParticipants?: number;
  deposit?: string;
  balance?: string;
  countdown?: string;
  shipName?: string;
  destination?: string;
  driverName?: string;
  driverAvatar?: string;
  captainName?: string;
  captainAvatar?: string;
  departureCountdown?: string;
}

function App() {
  type TabKey = 'all' | 'pending' | 'ongoing' | 'to-review';

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawTab = searchParams.get('tab');
  const activeTab: TabKey =
    rawTab === 'pending' || rawTab === 'ongoing' || rawTab === 'to-review' || rawTab === 'all'
      ? rawTab
      : 'pending';

  const [showToast, setShowToast] = useState<string>('');

  const showMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(''), 2000);
  };

  const goDriverIntent = (orderId: string) => {
    navigate(`/level3/driver-intent?orderId=${encodeURIComponent(orderId)}`);
  };

  const goPassengerIntent = (orderId: string) => {
    navigate(`/level3/passenger-intent?orderId=${encodeURIComponent(orderId)}`);
  };

  const goOngoingOrderDetail = (orderId: string) => {
    navigate(`/level3/ongoing-order-detail?orderId=${encodeURIComponent(orderId)}`);
  };

  const goSeaFishingOngoingOrder = (orderId: string) => {
    navigate(`/level3/sea-ongoing-order?orderId=${encodeURIComponent(orderId)}`);
  };

  const orders: Order[] = [
    // 待进行
    {
      id: '1',
      type: 'shore-ride-passenger',
      status: 'pending',
      date: '2026年5月20日',
      time: '06:00',
      from: '南山区·深圳大学北门',
      to: '深圳湾公园码头',
      returnTime: '当天 12:00',
      passengers: 1,
      price: '45',
      interestedCount: 3
    },
    {
      id: '2',
      type: 'shore-ride-driver',
      status: 'pending',
      date: '2026年5月21日',
      time: '05:30',
      from: '福田区·市民中心',
      to: '大鹏半岛钓点',
      returnTime: '当天 14:00',
      seats: 2,
      price: '60',
      interestedCount: 1
    },
    {
      id: '3',
      type: 'sea-fishing',
      status: 'pending',
      shipName: '深海猎人号',
      date: '2026年5月22日',
      time: '06:00',
      from: '南澳渔港',
      destination: '三门岛外海',
      to: '三门岛外海',
      deposit: '120',
      balance: '380',
      participants: 4,
      minParticipants: 6,
      countdown: '2天 8小时',
      price: '500'
    },
    // 进行中
    {
      id: '4',
      type: 'shore-ride-passenger',
      status: 'ongoing',
      date: '2026年5月15日',
      time: '06:00',
      from: '罗湖区·东门',
      to: '盐田海滨钓场',
      returnTime: '当天 15:00',
      passengers: 1,
      price: '50',
      driverName: '张师傅',
      driverAvatar: 'https://images.unsplash.com/photo-1615950227969-77f66133690c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200'
    },
    {
      id: '6',
      type: 'sea-fishing',
      status: 'ongoing',
      shipName: '蓝鲸号',
      date: '2026年5月15日',
      time: '06:00',
      from: '南澳渔港',
      to: '大亚湾外海',
      destination: '大亚湾外海',
      returnTime: '当天 16:00',
      participants: 8,
      minParticipants: 6,
      price: '500',
      departureCountdown: '1小时 23分钟',
      captainName: '陈船长',
      captainAvatar: 'https://images.unsplash.com/photo-1759668559019-d3fbb18fb369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200'
    },
    // 待评价
    {
      id: '5',
      type: 'completed',
      status: 'to-review',
      date: '2026年5月10日',
      time: '06:00',
      from: '宝安区·机场',
      to: '西涌钓点',
      passengers: 2,
      price: '80'
    }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <PageContainer>
      <div className="w-full h-full max-w-[402px] bg-[#F5F7FA] relative overflow-hidden" style={{ flexShrink: 0 }}>
      {/* Status Bar */}
      <StatusBar />

      {/* 顶部导航栏 */}
      <div className="absolute top-[44px] left-0 right-0 h-[44px] bg-white flex items-center justify-between px-4 border-b border-[#E4E7ED]">
        <button onClick={() => navigate("/mine")} className="p-1 -ml-1 flex items-center justify-center w-11 h-11">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[18px] font-medium text-[#333]">我的订单</h1>
        <button onClick={() => showMessage('联系客服')} className="p-1 -mr-1">
          <MessageCircle className="w-5 h-5 text-[#333]" />
        </button>
      </div>

      {/* 订单状态Tab */}
      <div className="absolute top-[88px] left-0 right-0 h-[44px] bg-white flex border-b border-[#E4E7ED]">
        {[
          { key: 'pending', label: '待进行' },
          { key: 'ongoing', label: '进行中' },
          { key: 'to-review', label: '待评价' },
          { key: 'all', label: '全部' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSearchParams({ tab: tab.key })}
            className="flex-1 relative text-[14px]"
          >
            <span className={activeTab === tab.key ? 'text-[#00B38A] font-medium' : 'text-[#666]'}>
              {tab.label}
            </span>
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#00B38A] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 订单列表 */}
      <div className="absolute top-[132px] left-0 right-0 bottom-0 overflow-y-auto px-4 pt-4 pb-4 custom-scrollbar">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-[#999] text-[14px] mt-20">暂无订单</div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAction={showMessage}
              onGoDriverIntent={goDriverIntent}
              onGoPassengerIntent={goPassengerIntent}
              onGoOngoingOrderDetail={goOngoingOrderDetail}
              onGoSeaFishingOngoingOrder={goSeaFishingOngoingOrder}
            />
          ))
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-lg text-[14px] z-50 max-w-[300px] text-center">
          {showToast}
        </div>
      )}
      </div>
    </PageContainer>
  );
}

// ─── 进行中卡片顶部操作栏（标签 + 电话/短信/三点） ─────────
interface OngoingCardHeaderProps {
  label: string;
  labelBg: string;
  labelColor: string;
  onPhone: () => void;
  onSms: () => void;
  onShare: () => void;
  onCancel: () => void;
}

function OngoingCardHeader({ label, labelBg, labelColor, onPhone, onSms, onShare, onCancel }: OngoingCardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        moreRef.current && !moreRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <div className="flex items-center justify-between mb-3">
      {/* 左侧标签 */}
      <div
        className="inline-flex items-center text-[12px] px-2 py-1 rounded-[4px]"
        style={{ backgroundColor: labelBg, color: labelColor }}
      >
        {label}
      </div>

      {/* 右侧操作图标 */}
      <div className="flex items-center gap-3 relative">
        {/* 电话 */}
        <button
          onClick={onPhone}
          className="w-7 h-7 rounded-full bg-[#F5F7FA] flex items-center justify-center active:bg-[#E4E7ED]"
        >
          <Phone className="w-[14px] h-[14px] text-[#555]" />
        </button>
        {/* 短信 */}
        <button
          onClick={onSms}
          className="w-7 h-7 rounded-full bg-[#F5F7FA] flex items-center justify-center active:bg-[#E4E7ED]"
        >
          <MessageSquare className="w-[14px] h-[14px] text-[#555]" />
        </button>
        {/* 三点菜单 */}
        <div className="relative">
          <button
            ref={moreRef}
            onClick={() => setMenuOpen(v => !v)}
            className="w-7 h-7 rounded-full bg-[#F5F7FA] flex items-center justify-center active:bg-[#E4E7ED]"
          >
            <MoreVertical className="w-[14px] h-[14px] text-[#555]" />
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-[34px] z-30 bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.12)] overflow-hidden"
              style={{ minWidth: '120px' }}
            >
              <button
                onClick={() => { setMenuOpen(false); onShare(); }}
                className="w-full flex items-center gap-2 px-4 py-[10px] text-[14px] text-[#333] hover:bg-[#F5F7FA] active:bg-[#F0F0F0]"
              >
                <Share2 className="w-4 h-4 text-[#555]" />
                分享订单
              </button>
              <div className="h-[0.5px] bg-[#E4E7ED] mx-3" />
              <button
                onClick={() => { setMenuOpen(false); onCancel(); }}
                className="w-full flex items-center gap-2 px-4 py-[10px] text-[14px] text-[#F56C6C] hover:bg-[#FFF5F5] active:bg-[#FFE8E8]"
              >
                <span className="w-4 h-4 flex items-center justify-center text-[#F56C6C]">✕</span>
                取消订单
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── OrderCard ───────────────────────────────────────────────
interface OrderCardProps {
  order: Order;
  onAction: (message: string) => void;
  onGoDriverIntent: (orderId: string) => void;
  onGoPassengerIntent: (orderId: string) => void;
  onGoOngoingOrderDetail: (orderId: string) => void;
  onGoSeaFishingOngoingOrder: (orderId: string) => void;
}

function OrderCard({
  order,
  onAction,
  onGoDriverIntent,
  onGoPassengerIntent,
  onGoOngoingOrderDetail,
  onGoSeaFishingOngoingOrder,
}: OrderCardProps) {

  // 待进行：岸钓拼车 乘客视角
  if (order.type === 'shore-ride-passenger' && order.status === 'pending') {
    return (
      <div className="bg-white rounded-[12px] p-4 mb-2">
        <div className="inline-flex items-center bg-[#FFF3E0] text-[#F59E0B] text-[12px] px-2 py-1 rounded-[4px] mb-3">
          岸钓拼车 · 等待车主接单
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发时间</span>
            <span className="text-[#333] text-[14px]">{order.date} {order.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发地点</span>
            <span className="text-[#333] text-[14px]">{order.from}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">目的地</span>
            <span className="text-[#333] text-[14px]">{order.to}</span>
          </div>
          {order.returnTime && (
            <div className="flex items-start gap-2">
              <span className="text-[#999] text-[12px] w-16 flex-shrink-0">返回时间</span>
              <span className="text-[#333] text-[14px]">{order.returnTime}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3 text-[14px] text-[#666]">
          <span>乘客昵称（自己）</span><span>·</span>
          <span>{order.passengers}人出行、轻装</span>
        </div>
        <div className="mb-3">
          <span className="text-[#333] text-[14px]">AA预估价 </span>
          <span className="text-[#00B38A] text-[18px] font-medium">¥{order.price}</span>
          <span className="text-[#666] text-[12px]">/人</span>
        </div>
        <button
          onClick={() => onGoPassengerIntent(order.id)}
          className="flex items-center justify-between w-full pt-3 border-t border-[#F0F0F0]"
        >
          <span className="text-[#F59E0B] text-[14px]">有 {order.interestedCount} 位车主想来接您</span>
          <ChevronRight className="w-4 h-4 text-[#F59E0B]" />
        </button>
      </div>
    );
  }

  // 待进行：岸钓拼车 车主视角
  if (order.type === 'shore-ride-driver' && order.status === 'pending') {
    return (
      <div className="bg-white rounded-[12px] p-4 mb-2">
        <div className="inline-flex items-center bg-[#FFF3E0] text-[#F59E0B] text-[12px] px-2 py-1 rounded-[4px] mb-3">
          岸钓拼车 · 等待乘客接单
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发时间</span>
            <span className="text-[#333] text-[14px]">{order.date} {order.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发地点</span>
            <span className="text-[#333] text-[14px]">{order.from}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">目的地</span>
            <span className="text-[#333] text-[14px]">{order.to}</span>
          </div>
          {order.returnTime && (
            <div className="flex items-start gap-2">
              <span className="text-[#999] text-[12px] w-16 flex-shrink-0">返回时间</span>
              <span className="text-[#333] text-[14px]">{order.returnTime}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3 text-[14px] text-[#666]">
          <span>车主（自己）</span><span>·</span>
          <span>剩余空座 {order.seats} 座、重装可带</span>
        </div>
        <div className="mb-3">
          <span className="text-[#333] text-[14px]">AA预估价 </span>
          <span className="text-[#00B38A] text-[18px] font-medium">¥{order.price}</span>
          <span className="text-[#666] text-[12px]">/人</span>
        </div>
        <button
          onClick={() => onGoDriverIntent(order.id)}
          className="flex items-center justify-between w-full pt-3 border-t border-[#F0F0F0]"
        >
          <span className="text-[#F59E0B] text-[14px]">有 {order.interestedCount} 位乘客想搭乘</span>
          <ChevronRight className="w-4 h-4 text-[#F59E0B]" />
        </button>
      </div>
    );
  }

  // 待进行：海钓众筹 等待成团
  if (order.type === 'sea-fishing' && order.status === 'pending') {
    return (
      <div className="bg-white rounded-[12px] p-4 mb-2 cursor-pointer" onClick={() => onAction('进入船班详情')}>
        <div className="inline-flex items-center bg-[#E3F2FD] text-[#2196F3] text-[12px] px-2 py-1 rounded-[4px] mb-3">
          海钓众筹 · 等待成团
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">船班</span>
            <span className="text-[#333] text-[14px] font-medium">{order.shipName}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">发船时间</span>
            <span className="text-[#333] text-[14px]">{order.date} {order.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">集合码头</span>
            <span className="text-[#333] text-[14px]">{order.from}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">目的地</span>
            <span className="text-[#333] text-[14px]">{order.destination}</span>
          </div>
        </div>
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-[#666]">定金</span>
            <span className="text-[#00B38A] font-medium">¥{order.deposit}</span>
            <span className="text-[#999] text-[12px]">（已支付）</span>
          </div>
          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-[#666]">尾款</span>
            <span className="text-[#F59E0B] font-medium">¥{order.balance}</span>
            <span className="text-[#999] text-[12px]">（待支付）</span>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#666] text-[12px]">成行进度</span>
            <span className="text-[#333] text-[12px]">
              已拼 <span className="text-[#00B38A] font-medium">{order.participants}</span> 人 / 最低成行 {order.minParticipants} 人
            </span>
          </div>
          <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00B38A] rounded-full"
              style={{ width: `${((order.participants || 0) / (order.minParticipants || 1)) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-[#F0F0F0]">
          <Clock className="w-4 h-4 text-[#00B38A]" />
          <span className="text-[#00B38A] text-[14px]">距离成团判定还有 {order.countdown}</span>
        </div>
      </div>
    );
  }

  // 进行中：岸钓拼车（司机已接驾）
  if (order.type === 'shore-ride-passenger' && order.status === 'ongoing') {
    return (
      <div className="bg-white rounded-[12px] p-4 mb-2">
        <OngoingCardHeader
          label="岸钓拼车 · 进行中"
          labelBg="#E8F5E9"
          labelColor="#4CAF50"
          onPhone={() => onAction('拨打车主电话')}
          onSms={() => onAction('发送短信给车主')}
          onShare={() => onAction('分享订单')}
          onCancel={() => onAction('取消订单')}
        />

        {/* 司机信息 */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#F0F0F0]">
          <img src={order.driverAvatar} alt={order.driverName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-[2px]">
              <span className="text-[#333] text-[14px] font-medium">{order.driverName}</span>
              <span className="text-[#999] text-[12px]">车主</span>
            </div>
            <span className="text-[#4CAF50] text-[12px]">司机已接驾</span>
          </div>
        </div>

        {/* 接驾提示 */}
        <div className="bg-[#FFF8E1] rounded-[8px] px-3 py-2 mb-3 flex items-center gap-2">
          <span className="text-[#F59E0B] text-[15px]">⏱</span>
          <span className="text-[#F59E0B] text-[12px]">
            预计还有 <span className="font-medium">10 分钟</span>到达，请尽快前往上车点
          </span>
        </div>

        {/* 行程信息 */}
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发时间</span>
            <span className="text-[#333] text-[14px]">{order.date} {order.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发地点</span>
            <span className="text-[#333] text-[14px]">{order.from}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">目的地</span>
            <span className="text-[#333] text-[14px]">{order.to}</span>
          </div>
          {order.returnTime && (
            <div className="flex items-start gap-2">
              <span className="text-[#999] text-[12px] w-16 flex-shrink-0">返回时间</span>
              <span className="text-[#333] text-[14px]">{order.returnTime}</span>
            </div>
          )}
        </div>

        {/* 查看订单按钮 */}
        <button
          onClick={() => onGoOngoingOrderDetail(order.id)}
          className="w-full h-9 border border-[#00B38A] text-[#00B38A] text-[14px] rounded-[8px] flex items-center justify-center"
        >
          查看订单
        </button>
      </div>
    );
  }

  // 进行中：海钓众筹（已拼团成功）
  if (order.type === 'sea-fishing' && order.status === 'ongoing') {
    return (
      <div className="bg-white rounded-[12px] p-4 mb-2">
        <OngoingCardHeader
          label="海钓众筹 · 已拼团成功"
          labelBg="#E8F5E9"
          labelColor="#4CAF50"
          onPhone={() => onAction('拨打船长电话')}
          onSms={() => onAction('发送短信给船长')}
          onShare={() => onAction('分享订单')}
          onCancel={() => onAction('取消订单')}
        />

        {/* 船长信息 */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#F0F0F0]">
          <img src={order.captainAvatar} alt={order.captainName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-[2px]">
              <span className="text-[#333] text-[14px] font-medium">{order.captainName}</span>
              <span className="text-[#999] text-[12px]">船长</span>
            </div>
            <span className="text-[#333] text-[12px]">{order.shipName}</span>
          </div>
        </div>

        {/* 行程信息 */}
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发地点</span>
            <span className="text-[#333] text-[14px]">{order.from}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">目的地</span>
            <span className="text-[#333] text-[14px]">{order.destination}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发时间</span>
            <span className="text-[#333] text-[14px]">{order.date} {order.time}</span>
          </div>
          {order.returnTime && (
            <div className="flex items-start gap-2">
              <span className="text-[#999] text-[12px] w-16 flex-shrink-0">返回时间</span>
              <span className="text-[#333] text-[14px]">{order.returnTime}</span>
            </div>
          )}
        </div>

        {/* 出发倒计时 */}
        <div className="flex items-center gap-2 mb-3 bg-[#F0FBF7] rounded-[8px] px-3 py-2">
          <Clock className="w-4 h-4 text-[#00B38A] flex-shrink-0" />
          <span className="text-[#666] text-[12px]">距离出发还有</span>
          <span className="text-[#00B38A] text-[14px] font-medium">{order.departureCountdown}</span>
        </div>

        {/* 查看订单按钮 */}
        <button
          onClick={() => onGoSeaFishingOngoingOrder(order.id)}
          className="w-full h-9 border border-[#00B38A] text-[#00B38A] text-[14px] rounded-[8px] flex items-center justify-center"
        >
          查看订单
        </button>
      </div>
    );
  }

  // 待评价
  if (order.status === 'to-review') {
    return (
      <div className="bg-white rounded-[12px] p-4 mb-2">
        <div className="inline-flex items-center bg-[#F5F5F5] text-[#666] text-[12px] px-2 py-1 rounded-[4px] mb-3">
          岸钓拼车 · 已完成
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发时间</span>
            <span className="text-[#333] text-[14px]">{order.date} {order.time}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">出发地点</span>
            <span className="text-[#333] text-[14px]">{order.from}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#999] text-[12px] w-16 flex-shrink-0">目的地</span>
            <span className="text-[#333] text-[14px]">{order.to}</span>
          </div>
        </div>
        <button
          onClick={() => onAction('进入评价页')}
          className="w-full h-9 border border-[#00B38A] text-[#00B38A] text-[14px] rounded-[8px]"
        >
          去评价
        </button>
      </div>
    );
  }

  return null;
}

export default App;

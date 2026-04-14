"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Brain,
  Zap,
  BarChart3,
  Settings,
  ArrowLeft,
  Bell,
  Clock,
  Target,
  CheckCircle2,
  GitPullRequest,
  RefreshCcw,
  FileText,
  UserPlus,
  Link as LinkIcon,
  Users,
  Menu,
  X,
  Code,
  LogOut,
  Edit2
} from "lucide-react";
import { nexusAlert, nexusToast } from "@/lib/sweetalert";

// Number Count Up Hook
function useCountUp(endValue: number, duration: number = 2) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.min(endValue * progress, endValue));
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [endValue, duration]);

  return count;
}

// ---------------------------------------------
// Component: StatCard
// ---------------------------------------------
function StatCard({
  title,
  value,
  suffix,
  icon: Icon,
  trend,
  delay
}: {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  trend: string;
  delay: number;
}) {
  const count = useCountUp(value, 2);

  const formattedCount = 
    value >= 1000 && value % 1 !== 0 
      ? count.toFixed(1)
      : value >= 1000 
      ? Math.floor(count).toLocaleString()
      : Number.isInteger(value) 
      ? Math.floor(count).toString() 
      : count.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">{title}</h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-text-primary)]">
          <Icon className="h-5 w-5 opacity-70" />
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            {formattedCount}
          </span>
          {suffix && <span className="text-lg font-medium text-[var(--color-text-muted)]">{suffix}</span>}
        </div>
        <p className="mt-2 text-xs font-medium text-[var(--color-accent)]">{trend}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------
// Main Dashboard Page
// ---------------------------------------------
export default function DashboardPage() {
  const router = useRouter();
  
  // -- Global UI State --
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // -- Header State --
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // -- AI Models State --
  const [activeModelLog, setActiveModelLog] = useState<string | null>(null);

  // -- Automations State --
  const [automations, setAutomations] = useState([
    { id: 1, name: "Email Classifier", desc: "Auto-labels incoming support emails", time: "5 mins ago", active: true },
    { id: 2, name: "Lead Scorer", desc: "Evaluates standard CRM inbound leads", time: "12 mins ago", active: true },
    { id: 3, name: "GitHub PR Reviewer", desc: "Generates automated architecture reviews", time: "1 hr ago", active: true },
    { id: 4, name: "Slack Standup Summarizer", desc: "Posts team summary at 10 AM", time: "Yesterday", active: false },
    { id: 5, name: "Invoice Extraction", desc: "Pulls vendor data from PDF attachments", time: "2 days ago", active: false },
  ]);
  const [editingAutomationId, setEditingAutomationId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // -- Analytics State --
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // -- Settings State --
  const [profileForm, setProfileForm] = useState({ name: "John Doe", email: "john@example.com" });
  const [notificationToggles, setNotificationToggles] = useState([true, false, true]);
  const [apiKey, setApiKey] = useState("nxs_w8x2_9hjp_lmno_q4p1");
  const [showApiKey, setShowApiKey] = useState(false);

  // Dummy Chart Data
  const chartData = [
    { day: "Jan", height: 30, value: "112k" },
    { day: "Feb", height: 45, value: "168k" },
    { day: "Mar", height: 40, value: "150k" },
    { day: "Apr", height: 60, value: "220k" },
    { day: "May", height: 55, value: "205k" },
    { day: "Jun", height: 75, value: "280k" },
    { day: "Jul", height: 70, value: "262k" },
    { day: "Aug", height: 85, value: "318k" },
    { day: "Sep", height: 80, value: "298k" },
    { day: "Oct", height: 95, value: "355k" },
    { day: "Nov", height: 90, value: "335k" },
    { day: "Dec", height: 100, value: "375k" },
  ];

  // Dummy Activity Data
  const recentActivities = [
    { icon: CheckCircle2, text: "Automation #12 completed", time: "2 min ago" },
    { icon: GitPullRequest, text: "New API connection: Slack", time: "1 hr ago" },
    { icon: RefreshCcw, text: "Model retrained on new data", time: "3 hrs ago" },
    { icon: FileText, text: "Report generated: Q1 2026", time: "5 hrs ago" },
    { icon: UserPlus, text: "New team member added", time: "Yesterday" },
  ];

  const sidebarMenuItems = [
    { id: "overview", name: "Overview", icon: LayoutDashboard },
    { id: "models", name: "AI Models", icon: Brain },
    { id: "automations", name: "Automations", icon: Zap },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  // Render varying content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="AI Requests Today" value={12847} icon={Zap} trend="+12% from yesterday" delay={0.1} />
              <StatCard title="Active Automations" value={automations.filter(a => a.active).length} icon={Brain} trend={`${automations.filter(a => a.active).length} running now`} delay={0.2} />
              <StatCard title="Time Saved" value={48} suffix=" hrs" icon={Clock} trend="this week" delay={0.3} />
              <StatCard title="Accuracy Rate" value={99.2} suffix="%" icon={Target} trend="+0.3% this month" delay={0.4} />
            </div>

            {/* Middle Row: Activity & Chart */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:col-span-2">
                <div className="border-b border-[var(--color-border)] px-6 py-4">
                  <h2 className="font-serif text-lg tracking-tight text-[var(--color-text-primary)]">Recent Activity</h2>
                </div>
                <ul className="flex flex-col">
                  {recentActivities.map((activity, i) => (
                    <li key={i} className="flex items-center justify-between border-b border-[var(--color-border)] last:border-0 px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg)]">
                          <activity.icon className="h-4 w-4 text-[var(--color-text-secondary)]" />
                        </div>
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{activity.text}</span>
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">{activity.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:col-span-1">
                <div className="border-b border-[var(--color-border)] px-6 py-4">
                  <h2 className="font-serif text-lg tracking-tight text-[var(--color-text-primary)]">AI Usage</h2>
                </div>
                <div className="flex flex-1 items-end justify-between gap-2 p-6">
                  {chartData.slice(0, 7).map((data, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 flex-1 relative group">
                      <div className="relative flex h-40 w-full justify-center">
                        <div className="absolute bottom-0 w-full max-w-[24px] rounded-t-md bg-[var(--color-bg)] h-full" />
                        <div style={{ height: `${data.height}%` }} className="absolute bottom-0 w-full max-w-[24px] rounded-t-md bg-[var(--color-accent)] transition-all duration-1000" />
                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-text-primary)] text-[var(--color-bg)] text-[10px] px-2 py-1 rounded shadow pointer-events-none z-10">
                          {data.value}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">{chartData[i].day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h2 className="mb-6 font-serif text-lg tracking-tight text-[var(--color-text-primary)]">Active Automations</h2>
                <div className="space-y-4">
                  {automations.filter(a => a.active).slice(0, 3).map((auto, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{auto.name}</span>
                        <span className="text-xs text-[var(--color-text-muted)] mt-1">{auto.desc}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-md bg-[var(--color-accent)]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">Active</span>
                      </div>
                    </div>
                  ))}
                   {automations.filter(a => a.active).length === 0 && (
                     <p className="text-sm text-[var(--color-text-muted)] text-center py-4">No active automations. Go to Automations to enable some.</p>
                   )}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <h2 className="mb-6 font-serif text-lg tracking-tight text-[var(--color-text-primary)]">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "New Automation", icon: Zap, action: () => setActiveTab("automations") },
                    { name: "Connect API", icon: LinkIcon, action: () => {
                       nexusAlert.fire({
                          title: 'Connect API',
                          html: '<p style="color:#888888; font-size:14px;">Use your API key to authenticate requests.</p><div style="background:#1a1a1a; padding:12px; border-radius:8px; border:1px solid #333; margin-top:16px; font-family:monospace;">' + apiKey + '</div>',
                          icon: 'info',
                          confirmButtonText: 'Manage Keys',
                       }).then((res) => {
                          if(res.isConfirmed) setActiveTab('settings');
                       })
                    }},
                    { name: "View Reports", icon: BarChart3, action: () => setActiveTab("analytics") },
                    { name: "Invite Team", icon: Users, action: () => {
                       nexusAlert.fire({
                         title: 'Invite Team Member',
                         input: 'email',
                         inputLabel: 'Email Address',
                         inputPlaceholder: 'colleague@company.com',
                         showCancelButton: true,
                         confirmButtonText: 'Send Invite'
                       }).then((result) => {
                         if (result.isConfirmed) {
                           nexusToast.fire({
                             icon: 'success',
                             title: `Invite sent to ${result.value}!`
                           })
                         }
                       })
                    }},
                  ].map((action, i) => (
                    <button 
                      onClick={action.action} 
                      key={i} 
                      title={action.name}
                      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                    >
                      <action.icon className="h-6 w-6 text-[var(--color-text-secondary)] transition-colors" />
                      <span className="text-xs font-medium text-[var(--color-text-primary)] transition-colors">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "models":
        return (
          <motion.div key="models" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
            
            {activeModelLog ? (
               <div>
                  <button onClick={() => setActiveModelLog(null)} className="flex items-center text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors">
                     <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
                  </button>
                  <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)] mb-6">{activeModelLog} - Logs</h2>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                     <pre className="font-mono text-xs text-[var(--color-accent)] whitespace-pre-wrap">
{`[2026-04-14 09:12:33] INFO: Incoming inference request (ID: req_8239fn2398)
[2026-04-14 09:12:33] DEBUG: Context layer active, resolving 14 references...
[2026-04-14 09:12:34] INFO: Model synthesis complete (latency: 412ms)
[2026-04-14 09:14:11] INFO: Incoming inference request (ID: req_8239fn2399)
[2026-04-14 09:14:12] INFO: Model synthesis complete (latency: 388ms)
[2026-04-14 09:22:05] WARNING: Rate limit approaching for tenant 'enterprise_acme'
[2026-04-14 09:30:00] INFO: Background weights sync completed successfully.`}
                     </pre>
                  </div>
               </div>
            ) : (
               <>
                  <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)] mb-6">AI Models</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[
                      { name: "Nexus Core v3", desc: "General reasoning", status: "Active", statusColor: "text-green-500 bg-green-500/10", reqs: "84,092", acc: "99.8%", icon: Brain },
                      { name: "Nexus Vision", desc: "Image analysis", status: "Active", statusColor: "text-green-500 bg-green-500/10", reqs: "12,904", acc: "98.5%", icon: Target },
                      { name: "Nexus Code", desc: "Code generation", status: "Beta", statusColor: "text-yellow-500 bg-yellow-500/10", reqs: "9,234", acc: "94.2%", icon: Code },
                    ].map((model, i) => (
                      <div key={i} className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-bg)] text-[var(--color-text-primary)]">
                            <model.icon className="h-6 w-6" />
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${model.statusColor}`}>
                            {model.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{model.name}</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1 mb-6">{model.desc}</p>
                        
                        <div className="space-y-2 mb-6 flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-text-muted)]">Accuracy</span>
                            <span className="font-medium text-[var(--color-text-primary)]">{model.acc}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-text-muted)]">Requests Today</span>
                            <span className="font-medium text-[var(--color-text-primary)]">{model.reqs}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-auto">
                          <button onClick={() => nexusToast.fire({icon: 'info', title: 'Configuration coming soon!'})} className="flex-1 rounded-lg border border-[var(--color-accent)] py-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-fg)]">
                            Configure
                          </button>
                          <button onClick={() => setActiveModelLog(model.name)} className="flex-1 rounded-lg py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)] border border-transparent hover:border-[var(--color-border)]">
                            View Logs
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
               </>
            )}
            
          </motion.div>
        );

      case "automations":
        return (
          <motion.div key="automations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6 flex-1 max-w-4xl mx-auto w-full pt-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)]">Automations</h2>
              <button 
                onClick={() => {
                   nexusAlert.fire({
                     title: 'Create New Automation',
                     input: 'text',
                     inputLabel: 'Automation Name',
                     inputPlaceholder: 'e.g. Daily Report Generator',
                     showCancelButton: true,
                     confirmButtonText: 'Create',
                     inputValidator: (value) => {
                       if (!value) return 'Please enter a name!'
                     }
                   }).then((result) => {
                     if (result.isConfirmed) {
                       setAutomations([...automations, { id: Date.now(), name: result.value, desc: "Custom automation", time: "Just now", active: true }]);
                       nexusToast.fire({
                         icon: 'success',
                         title: `"${result.value}" created!`
                       })
                     }
                   })
                }}
                className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-fg)] transition-opacity hover:opacity-90 shadow-md"
              >
                + New Automation
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {automations.map((auto) => (
                <div key={auto.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col flex-1">
                    {editingAutomationId === auto.id ? (
                       <input 
                         autoFocus
                         type="text" 
                         value={editName}
                         onChange={(e) => setEditName(e.target.value)}
                         onBlur={() => {
                            setAutomations(automations.map(a => a.id === auto.id ? {...a, name: editName} : a));
                            setEditingAutomationId(null);
                         }}
                         onKeyDown={(e) => {
                           if(e.key === 'Enter') {
                             setAutomations(automations.map(a => a.id === auto.id ? {...a, name: editName} : a));
                             setEditingAutomationId(null);
                           }
                         }}
                         className="text-base font-medium text-[var(--color-text-primary)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded px-2 py-1 outline-none focus:border-[var(--color-accent)]" 
                       />
                    ) : (
                       <span className="text-base font-medium text-[var(--color-text-primary)]">{auto.name}</span>
                    )}
                    <span className="text-sm text-[var(--color-text-muted)] mt-1">{auto.desc}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] whitespace-nowrap hidden md:block">Last run: {auto.time}</span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input 
                         type="checkbox" 
                         className="peer sr-only" 
                         checked={auto.active} 
                         onChange={(e) => setAutomations(automations.map(a => a.id === auto.id ? {...a, active: e.target.checked} : a))}
                      />
                      <div className="h-5 w-9 rounded-full bg-[var(--color-border)] transition-colors peer-checked:bg-[var(--color-accent)] after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                    <div className="flex items-center gap-1 border-l border-[var(--color-border)] pl-4">
                       <button 
                         onClick={() => { setEditingAutomationId(auto.id); setEditName(auto.name); }}
                         className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3 py-1.5 rounded hover:bg-[var(--color-bg)] transition-colors"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => {
                            nexusAlert.fire({
                              title: 'Delete Automation?',
                              text: 'This action cannot be undone.',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonText: 'Yes, delete it',
                              cancelButtonText: 'Cancel'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                setAutomations(automations.filter(a => a.id !== auto.id));
                                nexusToast.fire({
                                  icon: 'success',
                                  title: 'Automation deleted!'
                                })
                              }
                            })
                         }}
                         className="text-xs font-medium text-red-500 hover:text-red-400 px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors"
                       >
                         Delete
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "analytics":
        return (
          <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
            <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)] mb-6">Analytics</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Requests" value={1284750} icon={Zap} trend="+24% YoY" delay={0.1} />
              <StatCard title="Avg Response Time" value={120} suffix="ms" icon={Clock} trend="-15ms this month" delay={0.2} />
              <StatCard title="Uptime" value={99.98} suffix="%" icon={CheckCircle2} trend="Optimal" delay={0.3} />
              <StatCard title="Active Users" value={2847} icon={Users} trend="+12% this week" delay={0.4} />
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 mt-8">
              <h3 className="font-serif text-lg tracking-tight text-[var(--color-text-primary)] mb-6">Yearly Compute</h3>
              <div className="flex items-end justify-between h-64 gap-2 pt-4">
                {chartData.map((data, idx) => {
                  return (
                    <div 
                      key={data.day} 
                      onMouseEnter={() => setHoveredBar(idx)} 
                      onMouseLeave={() => setHoveredBar(null)}
                      className="flex flex-col items-center gap-3 flex-1 h-full justify-end relative cursor-pointer group"
                    >
                       <div className="w-full max-w-[40px] bg-[var(--color-accent)] rounded-t-sm transition-all duration-500 group-hover:brightness-110" style={{ height: `${data.height}%` }}></div>
                       <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">{data.day}</span>
                       
                       {/* Tooltip */}
                       <div className={`absolute -top-10 bg-[var(--color-text-primary)] text-[var(--color-bg)] text-xs font-semibold px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity duration-200 ${hoveredBar === idx ? 'opacity-100' : 'opacity-0'}`}>
                         {data.value}
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] mt-8 overflow-hidden">
               <div className="border-b border-[var(--color-border)] px-6 py-4">
                 <h3 className="font-serif text-lg tracking-tight text-[var(--color-text-primary)]">Top Automations by Usage</h3>
               </div>
               <div className="overflow-x-auto w-full">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-[var(--color-bg)] text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                     <tr>
                       <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Rank</th>
                       <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Name</th>
                       <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Requests</th>
                       <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Success Rate</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[var(--color-border)]">
                     {[
                       { rank: 1, name: "Email Classifier", reqs: "452,192", rate: "99.8%" },
                       { rank: 2, name: "Support Ticket Routing", reqs: "301,004", rate: "98.5%" },
                       { rank: 3, name: "Lead Scorer", reqs: "185,420", rate: "97.2%" },
                       { rank: 4, name: "Slack Summarizer", reqs: "94,112", rate: "99.9%" },
                       { rank: 5, name: "Invoice Extraction", reqs: "42,010", rate: "94.6%" },
                     ].map((row) => (
                       <tr key={row.rank} className="group hover:bg-[var(--color-bg)] transition-colors cursor-default">
                         <td className="px-6 py-5 text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text-primary)] transition-colors">#{row.rank}</td>
                         <td className="px-6 py-5 font-semibold text-[var(--color-text-primary)]">{row.name}</td>
                         <td className="px-6 py-5 text-[var(--color-text-secondary)] flex items-center justify-start tabular-nums">{row.reqs}</td>
                         <td className="px-6 py-5 text-[var(--color-accent)] font-medium">{row.rate}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-8 max-w-3xl">
            <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)] mb-6">Settings</h2>
            
            {/* Profile Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2"><UserPlus className="w-5 h-5"/> Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                   <label className="text-sm font-medium text-[var(--color-text-secondary)]">Full Name</label>
                   <input 
                     type="text" 
                     value={profileForm.name} 
                     onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                     className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" 
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-sm font-medium text-[var(--color-text-secondary)]">Email Address</label>
                   <input 
                     type="email" 
                     value={profileForm.email}
                     onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                     className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors" 
                   />
                </div>
              </div>
              <button 
                onClick={() => nexusToast.fire({icon: 'success', title: 'Settings saved successfully!'})} 
                className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent-fg)] hover:opacity-90 transition-opacity flex items-center gap-2 mt-2"
              >
                Save Changes
              </button>
            </section>

            {/* Notifications Section */}
            <section className="space-y-4 pt-4">
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2"><Bell className="w-5 h-5"/> Notifications</h3>
              <div className="space-y-4 pt-2">
                {[
                  { label: "Email notifications", desc: "Receive updates about product changes" },
                  { label: "Weekly digest", desc: "Get a summary of your workspace usage" },
                  { label: "API alerts", desc: "Get notified when error rate spikes" }
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)]">
                     <div className="flex flex-col">
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{notif.label}</span>
                        <span className="text-xs text-[var(--color-text-muted)] mt-0.5">{notif.desc}</span>
                     </div>
                     <label className="relative inline-flex cursor-pointer items-center mr-2">
                        <input 
                           type="checkbox" 
                           className="peer sr-only" 
                           checked={notificationToggles[i]} 
                           onChange={(e) => {
                              const newToggles = [...notificationToggles];
                              newToggles[i] = e.target.checked;
                              setNotificationToggles(newToggles);
                           }}
                        />
                        <div className="h-5 w-9 rounded-full bg-[var(--color-border)] transition-colors peer-checked:bg-[var(--color-accent)] after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full border border-gray-600/20 shadow-sm"></div>
                     </label>
                  </div>
                ))}
              </div>
            </section>

            {/* API Keys Section */}
            <section className="space-y-4 pt-4">
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2"><Code className="w-5 h-5"/> API Keys</h3>
              <div className="pt-2">
                 <p className="text-sm text-[var(--color-text-muted)] mb-4">Copy your secret key for use in your applications. Do not share it.</p>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <input 
                      type={showApiKey ? "text" : "password"} 
                      value={apiKey} 
                      readOnly 
                      className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-primary)] font-mono outline-none" 
                    />
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowApiKey(!showApiKey)} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors w-24">
                        {showApiKey ? "Hide" : "Reveal"}
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey);
                          nexusToast.fire({icon: 'success', title: 'API key copied to clipboard!'})
                        }} 
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors w-24"
                      >
                        Copy
                      </button>
                    </div>
                 </div>
                 <button 
                   onClick={() => {
                      nexusAlert.fire({
                        title: 'Regenerate API Key?',
                        text: 'Your current key will stop working.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, regenerate'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          setApiKey("nxs_" + Math.random().toString(36).substring(2, 12) + "_new");
                          nexusToast.fire({
                            icon: 'success',
                            title: 'New API key generated!'
                          })
                        }
                      })
                   }}
                   className="mt-6 flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                 >
                   <RefreshCcw className="w-4 h-4"/> Regenerate Key
                 </button>
              </div>
            </section>

            {/* Danger Zone Section */}
            <section className="pt-8">
              <div className="rounded-xl border border-red-900/50 bg-red-950/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-red-500 mb-1">Delete Account</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">Permanently delete your data and workspace.</p>
                </div>
                <button 
                  onClick={() => nexusAlert.fire({ title: 'Feature Restricted', text: 'Please contact support to delete your account.', icon: 'error' })}
                  className="rounded-lg border border-red-900/50 px-4 py-2 text-sm font-medium text-red-500/50 hover:bg-red-900/20 whitespace-nowrap transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </section>

          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[var(--color-bg)] md:flex-row relative">

      {/* Mobile Top Bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)] p-4 md:hidden">
        <span className="font-serif text-xl tracking-tight text-[var(--color-text-primary)]">Nexus AI</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-[var(--color-text-primary)] focus:bg-[var(--color-surface)]"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* LEFT SIDEBAR (Desktop Fixed, Mobile Collapsible) */}
      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } absolute inset-0 z-40 mt-[73px] flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] w-full md:relative md:mt-0 md:flex md:w-64`}
      >
        <div className="hidden p-6 md:block">
          <Link href="/" className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)]">
            Nexus AI
          </Link>
        </div>

        {/* User Block & Profile Dropdown */}
        <div className="mx-4 mb-6 mt-4 relative md:mt-0">
           <button 
             onClick={() => setShowProfileDropdown(!showProfileDropdown)}
             className="w-full flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 cursor-pointer hover:border-[var(--color-accent)] transition-colors text-left"
           >
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-semibold text-[var(--color-accent-fg)] transition-transform">
               JD
             </div>
             <div className="flex flex-col flex-1 overflow-hidden">
               <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{profileForm.name}</span>
               <span className="text-xs font-medium tracking-wide text-[var(--color-accent)] truncate">Pro Plan</span>
             </div>
           </button>
           
           <AnimatePresence>
             {showProfileDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-14 left-0 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl z-50 overflow-hidden py-1"
                  >
                     <button onClick={() => { setShowProfileDropdown(false); setActiveTab("settings"); }} className="w-full flex items-center px-4 py-2.5 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors text-left">
                        <Edit2 className="w-4 h-4 mr-3 text-[var(--color-text-muted)]"/> Edit Profile
                     </button>
                     <div className="h-px bg-[var(--color-border)] my-1 w-full" />
                     <button onClick={() => {
                        setShowProfileDropdown(false);
                        nexusAlert.fire({
                          title: 'Sign Out?',
                          text: 'You will be redirected to login page.',
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonText: 'Yes, sign out'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            router.push('/login')
                          }
                        })
                     }} className="w-full flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left font-medium">
                        <LogOut className="w-4 h-4 mr-3"/> Sign Out
                     </button>
                  </motion.div>
                </>
             )}
           </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
          {sidebarMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                 setActiveTab(item.id);
                 setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)]"
                  : "border-l-2 border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Bottom Link */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] text-left"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-[var(--color-bg)] relative">
        <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8 relative min-h-full flex flex-col">
          
          {/* Top Bar */}
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center shrink-0">
            <div>
              <h1 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                {activeTab === "overview" && `Good morning, ${profileForm.name.split(" ")[0]}.`}
                {activeTab === "models" && "Model Infrastructure"}
                {activeTab === "automations" && "Workflow Automations"}
                {activeTab === "analytics" && "Platform Analytics"}
                {activeTab === "settings" && "Workspace Settings"}
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                 {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface)]"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-[var(--color-bg)] flex items-center justify-center text-[8px] font-bold text-white">3</span>
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <>
                      {/* Fixed backdrop to catch clicks outside dropdown */}
                      <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-80 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="bg-[var(--color-bg)] border-b border-[var(--color-border)] px-4 py-3 flex justify-between items-center">
                          <span className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</span>
                          <span className="text-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 rounded text-[var(--color-text-secondary)]">Mark all read</span>
                        </div>
                        <div className="flex flex-col divide-y divide-[var(--color-border)] max-h-96 overflow-y-auto">
                          <div 
                             onClick={() => nexusToast.fire({ icon: 'info', title: 'Notification details coming soon' })}
                             className="px-4 py-3.5 hover:bg-[var(--color-bg)] transition-colors cursor-pointer flex gap-4 relative"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <div>
                               <p className="text-sm font-medium text-[var(--color-text-primary)]">Automation #12 completed</p>
                               <p className="text-xs text-[var(--color-text-muted)] mt-1">2 mins ago</p>
                            </div>
                          </div>
                          <div 
                             onClick={() => nexusToast.fire({ icon: 'info', title: 'Notification details coming soon' })}
                             className="px-4 py-3.5 hover:bg-[var(--color-bg)] transition-colors cursor-pointer flex gap-4 relative"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <div>
                               <p className="text-sm font-medium text-[var(--color-text-primary)]">New API key generated</p>
                               <p className="text-xs text-[var(--color-text-muted)] mt-1">1 hr ago</p>
                            </div>
                          </div>
                          <div 
                             onClick={() => nexusToast.fire({ icon: 'info', title: 'Notification details coming soon' })}
                             className="px-4 py-3.5 hover:bg-[var(--color-bg)] transition-colors cursor-pointer flex gap-4 relative"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <div>
                               <p className="text-sm font-medium text-[var(--color-text-primary)]">Weekly report ready</p>
                               <p className="text-xs text-[var(--color-text-muted)] mt-1">Yesterday</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => {
                   nexusAlert.fire({
                     title: 'Upgrade to Enterprise',
                     html: `
                       <p style="color:#888888">
                         Get unlimited AI requests, dedicated support,
                         and custom integrations.
                       </p>
                     `,
                     icon: 'info',
                     showCancelButton: true,
                     confirmButtonText: 'Contact Sales',
                     cancelButtonText: 'Maybe later'
                   }).then((result) => {
                     if (result.isConfirmed) {
                       window.location.href = '/#pricing'
                     }
                   })
                }}
                className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-accent-fg)] transition-opacity hover:opacity-90 shadow-md inline-block whitespace-nowrap"
              >
                Upgrade Plan
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

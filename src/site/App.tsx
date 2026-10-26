import { useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Boxes, Braces, Check, ChevronDown,
  ChevronRight, CircleHelp, Code2, Command, Copy, FileCode2, Gauge, GitBranch,
  Globe2, Layers2, Menu, Moon, Package, Play, Radio, Search, Server, Settings2,
  ShieldCheck, Sparkles, Terminal, X,
} from 'lucide-react'

type Section = 'Overview' | 'Routing' | 'Rendering' | 'Data & actions' | 'Deployment'
const sections: Section[] = ['Overview', 'Routing', 'Rendering', 'Data & actions', 'Deployment']

const content: Record<Section, { eyebrow: string; title: string; description: string; tag: string }> = {
  Overview: { eyebrow: 'THE RILL FRAMEWORK', title: 'Build with the whole system in view.', description: 'A full-stack framework that makes the important parts visible: where code runs, how data moves, and what ships to production.', tag: 'v0.1 · Early access' },
  Routing: { eyebrow: 'APP STRUCTURE', title: 'Routes you can read at a glance.', description: 'Build on the file system you already understand. Nested layouts, typed parameters, and route states stay close to the page they describe.', tag: 'File-based · Type-safe' },
  Rendering: { eyebrow: 'RENDERING MODEL', title: 'Start on the server. Add the browser with intent.', description: 'Send useful HTML first, then hydrate only the pieces that need it. Stream slower sections without holding the whole page hostage.', tag: 'Server-first · Streaming' },
  'Data & actions': { eyebrow: 'DATA & ACTIONS', title: 'Keep data close. Keep secrets server-side.', description: 'Load independent data in parallel. Validate inputs at the boundary and make cache lifetime explicit beside the work it affects.', tag: 'Typed · Explicit' },
  Deployment: { eyebrow: 'PRODUCTION', title: 'Build once. Deploy on your terms.', description: 'Produce a standard Node server with health checks and streaming support. Static output and platform adapters fit when you need them.', tag: 'Portable · Observable' },
}

const routeRows = [
  { icon: Layers2, label: 'routes', depth: 0, folder: true },
  { icon: FileCode2, label: '_layout.tsx', depth: 1 },
  { icon: FileCode2, label: 'index.tsx', depth: 1, active: true },
  { icon: FileCode2, label: 'projects', depth: 1, folder: true },
  { icon: FileCode2, label: '[projectId].tsx', depth: 2 },
  { icon: FileCode2, label: 'settings.tsx', depth: 1 },
]

function App() {
  const [section, setSection] = useState<Section>('Overview')
  const [consoleOpen, setConsoleOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState('')
  const page = content[section]

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(`export const loader = async () => {
  const [projects, activity] = await Promise.all([
    getProjects(),
    getActivity(),
  ])
  return { projects, activity }
}`)
    } catch { /* clipboard may be unavailable in preview */ }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const announce = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(''), 2600) }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Rill home"><span className="brand-mark"><span /></span><span>rill</span></a>
        <div className="topbar-separator" />
        <button className="version-select" onClick={() => announce('You’re viewing the v0.1 documentation')} aria-label="Select documentation version">Docs <ChevronDown size={13} /></button>
        <nav className="top-links" aria-label="Main navigation">
          <button onClick={() => setSection('Overview')}>Docs</button><button onClick={() => setSection('Routing')}>Examples</button><button onClick={() => { setConsoleOpen(!consoleOpen); announce(consoleOpen ? 'Workspace closed' : 'Workspace opened') }}>Workspace</button>
        </nav>
        <div className="top-actions"><button className="icon-button" aria-label="Search documentation" onClick={() => announce('Search is coming soon')}><Search size={17} /></button><button className="icon-button" aria-label="Toggle color theme" onClick={() => document.documentElement.classList.toggle('dark')}><Moon size={16} /></button><a className="github-link" href="https://github.com" target="_blank" rel="noreferrer" aria-label="Source code"><GitBranch size={17} /></a><button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X /> : <Menu />}</button></div>
      </header>
      <div className={`layout ${mobileNav ? 'nav-open' : ''}`}>
        <aside className="sidebar" aria-label="Documentation sidebar">
          <div className="side-top"><button className="search-box" onClick={() => announce('Search is coming soon')}><Search size={14} /><span>Search docs</span><kbd><Command size={10} /> K</kbd></button></div>
          <div className="side-label">GET STARTED</div>
          <nav className="side-nav" aria-label="Documentation">
            {sections.map((item) => <button key={item} className={`side-link ${section === item ? 'selected' : ''}`} onClick={() => { setSection(item); setMobileNav(false) }}><span className="side-indicator" />{item}{item === 'Overview' && <ChevronRight size={14} className="nav-chevron" />}</button>)}
          </nav>
          <div className="side-label section-label">REFERENCE</div>
          <button className="side-link muted-link" onClick={() => announce('API reference is being prepared')}><Braces size={15} />API reference</button>
          <button className="side-link muted-link" onClick={() => announce('Configuration guide is being prepared')}><Settings2 size={15} />Configuration</button>
          <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={16} /></div><strong>New to Rill?</strong><p>Start with the 5-minute guide and build your first route.</p><button onClick={() => setSection('Routing')}>Read the guide <ArrowRight size={13} /></button></div><div className="sidebar-footer"><span><span className="online-dot" />All systems operational</span><a href="mailto:hello@rill.dev">Feedback</a></div></div>
        </aside>

        <main id="home" className="main-content">
          <div className="content-wrap">
            <div className="breadcrumbs"><span>Documentation</span><ChevronRight size={12} /><span>{section}</span></div>
            <section className="hero-section">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-line" />{page.eyebrow}</div>
                <h1>{page.title}</h1>
                <p className="hero-description">{page.description}</p>
                <div className="hero-actions"><button className="primary-button" onClick={() => setSection('Routing')}>Start building <ArrowRight size={15} /></button><button className="text-button" onClick={() => setConsoleOpen(!consoleOpen)}>Explore the workspace <ArrowUpRight size={14} /></button></div>
                <div className="tag-row"><span className="status-tag"><span className="tag-dot" />{page.tag}</span><span className="tag-sep">·</span><span className="tag-soft">Open source by design</span></div>
              </div>
              <div className="code-card" aria-label="Example Rill route code">
                <div className="code-top"><div className="window-dots"><i /><i /><i /></div><div className="code-file"><FileCode2 size={13} />routes/index.tsx</div><button onClick={copyInstall} className="copy-button" aria-label="Copy route example">{copied ? <Check size={14} /> : <Copy size={14} />}</button></div>
                <div className="code-content"><div className="code-line"><span className="line-no">1</span><code><span className="c-purple">export const</span> <span className="c-blue">loader</span> = <span className="c-yellow">async</span> () =&gt; {'{'}</code></div><div className="code-line"><span className="line-no">2</span><code>&nbsp;&nbsp;<span className="c-purple">const</span> [projects, activity] =</code></div><div className="code-line"><span className="line-no">3</span><code>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-purple">await</span> <span className="c-blue">Promise</span>.<span className="c-green">all</span>([</code></div><div className="code-line"><span className="line-no">4</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-blue">getProjects</span>(),</code></div><div className="code-line"><span className="line-no">5</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-blue">getActivity</span>(),</code></div><div className="code-line"><span className="line-no">6</span><code>&nbsp;&nbsp;&nbsp;&nbsp;])</code></div><div className="code-line"><span className="line-no">7</span><code>&nbsp;&nbsp;<span className="c-purple">return</span> {'{'} projects, activity {'}'}</code></div><div className="code-line"><span className="line-no">8</span><code>{'}'}</code></div><div className="code-line blank"><span className="line-no">9</span><code /></div><div className="code-line"><span className="line-no">10</span><code><span className="c-purple">export default function</span> <span className="c-yellow">Home</span>({'{'} data {'}'}) {'{'}</code></div><div className="code-line"><span className="line-no">11</span><code>&nbsp;&nbsp;<span className="c-purple">return</span> &lt;<span className="c-red">ProjectList</span> projects={'{'}data.projects{'}'} /&gt;</code></div><div className="code-line"><span className="line-no">12</span><code>{'}'}</code></div></div>
                <div className="code-foot"><span><span className="pulse-dot" />Server component</span><span>Typed data · Parallel</span></div>
              </div>
            </section>

            <section className="principles" aria-label="Framework principles">
              <div className="principle"><span className="principle-icon"><Layers2 size={16} /></span><div><strong>Routes are files</strong><span>Structure you can navigate</span></div></div><div className="principle"><span className="principle-icon"><Server size={16} /></span><div><strong>Server by default</strong><span>Browser code with intent</span></div></div><div className="principle"><span className="principle-icon"><Radio size={16} /></span><div><strong>Stream as you go</strong><span>Useful content, earlier</span></div></div><div className="principle"><span className="principle-icon"><Package size={16} /></span><div><strong>Deploy anywhere</strong><span>Standard Node output</span></div></div>
            </section>

            <section className={`workspace ${consoleOpen ? 'workspace-expanded' : ''}`}>
              <div className="workspace-heading"><div><div className="eyebrow small-eyebrow"><span className="eyebrow-line" />A CLEARER WORKFLOW</div><h2>See how your app comes together.</h2><p>From route tree to production build, the boundaries stay visible.</p></div><button className="outline-button" onClick={() => setConsoleOpen(!consoleOpen)}>{consoleOpen ? 'Close workspace' : 'Open workspace'}{consoleOpen ? <X size={14} /> : <ArrowUpRight size={14} />}</button></div>
              <div className="workbench">
                <div className="workbench-top"><div className="workbench-title"><span className="workbench-logo"><Sparkles size={13} /></span><span>orbit-studio</span><span className="env-pill">development</span></div><div className="workbench-actions"><span className="build-state"><span className="online-dot" />Ready</span><button title="Open preview" aria-label="Open preview" onClick={() => announce('Preview is running at localhost:3000')}><Play size={14} /></button><button title="Open terminal" aria-label="Open terminal" onClick={() => announce('rill dev · Local server ready')}><Terminal size={14} /></button><button title="Open diagnostics" aria-label="Open diagnostics" onClick={() => setConsoleOpen(!consoleOpen)}><Gauge size={14} /></button></div></div>
                <div className="workbench-body">
                  <div className="route-panel"><div className="panel-title">ROUTES <span>6</span><button aria-label="Route options" onClick={() => announce('Route manifest generated from src/routes')}>···</button></div><div className="route-tree">{routeRows.map(({ icon: Icon, label, depth, folder, active }) => <button key={label} className={`route-row ${active ? 'route-active' : ''}`} style={{ paddingLeft: 12 + depth * 15 }} onClick={() => announce(`${label} · server rendered`)}><span className="tree-guide" />{folder ? <ChevronDown size={12} className="folder-arrow" /> : <span className="folder-spacer" />}<Icon size={14} /><span>{label}</span>{active && <span className="route-badge">SSR</span>}</button>)}</div><div className="route-summary"><span className="tiny-green" />6 routes <span>·</span> 4 server <span>·</span> 2 interactive</div></div>
                  <div className="editor-panel"><div className="editor-tabs"><span className="editor-tab"><FileCode2 size={12} />index.tsx <span className="tab-close">×</span></span><span className="editor-tab inactive"><FileCode2 size={12} />_layout.tsx</span></div><div className="editor-code"><div className="mini-code-line"><span>1</span><code><i>import</i> {'{'} Link {'}'} <i>from</i> <b>'rill'</b></code></div><div className="mini-code-line"><span>2</span><code><i>import</i> {'{'} getProjects {'}'} <i>from</i> <b>'~/data/projects'</b></code></div><div className="mini-code-line spacer"><span>3</span><code /></div><div className="mini-code-line"><span>4</span><code><i>export const</i> loader = <em>async</em> () =&gt; {'{'}</code></div><div className="mini-code-line"><span>5</span><code>&nbsp;&nbsp;<i>return</i> getProjects()</code></div><div className="mini-code-line"><span>6</span><code>{'}'}</code></div><div className="mini-code-line spacer"><span>7</span><code /></div><div className="mini-code-line"><span>8</span><code><i>export default function</i> Home({'{'} data {'}'}) {'{'}</code></div><div className="mini-code-line"><span>9</span><code>&nbsp;&nbsp;<i>return</i> &lt;ProjectList projects={'{'}data{'}'} /&gt;</code></div><div className="mini-code-line"><span>10</span><code>{'}'}</code></div></div><div className="editor-status"><span>TypeScript React</span><span>UTF-8</span><span>Ln 4, Col 1</span></div></div>
                  <div className="preview-panel"><div className="preview-top"><span className="preview-dots"><i /><i /><i /></span><span className="preview-url"><ShieldCheck size={10} /> localhost:3000</span><ArrowUpRight size={11} /></div><div className="preview-content"><div className="preview-brand"><span className="preview-brand-mark" />orbit<span className="preview-divider">/</span>studio</div><div className="preview-greeting">MONDAY, OCTOBER 26</div><h3>Good morning,<br /><span>Alex.</span></h3><div className="preview-stat"><div><span>Active projects</span><b>08</b></div><div className="stat-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="preview-stat"><div><span>Deploy health</span><b className="healthy">All systems normal <span className="online-dot" /></b></div></div></div></div>
                </div>
                <div className="diagnostics"><div className="diag-title"><span className="diag-icon"><Check size={12} /></span><strong>DIAGNOSTICS</strong><span className="diag-count">No issues</span><button onClick={() => setConsoleOpen(!consoleOpen)}>{consoleOpen ? 'Hide details' : 'View details'}<ChevronRight size={12} /></button></div>{consoleOpen && <div className="diag-detail"><div className="diag-item"><span className="diag-check"><Check size={11} /></span><span><strong>Route manifest</strong><small>6 routes validated · generated in 18ms</small></span><span className="diag-meta">routes.manifest.ts</span></div><div className="diag-item"><span className="diag-check"><Check size={11} /></span><span><strong>Client bundle</strong><small>14.2 kB gzipped · 2 interactive boundaries</small></span><span className="diag-meta">production build</span></div><div className="diag-item"><span className="diag-check"><Check size={11} /></span><span><strong>Data loaders</strong><small>3 parallel requests · no sequential fetch chains</small></span><span className="diag-meta">routes/index.tsx</span></div></div>}</div>
              </div>
            </section>

            <section className="next-steps"><div className="next-heading"><div><div className="eyebrow small-eyebrow"><span className="eyebrow-line" />A GOOD PLACE TO BEGIN</div><h2>Everything has a place.</h2></div><button className="text-button" onClick={() => announce('Browse all guides from the sidebar')}>Browse all guides <ArrowRight size={14} /></button></div><div className="guide-grid"><button className="guide-card" onClick={() => setSection('Routing')}><span className="guide-icon purple"><Boxes size={17} /></span><span className="guide-label">GUIDE 01 · STRUCTURE</span><strong>Organize your routes</strong><p>Layouts, params, and route states. All from files.</p><span className="guide-arrow"><ArrowRight size={14} /></span></button><button className="guide-card" onClick={() => setSection('Rendering')}><span className="guide-icon blue"><Globe2 size={17} /></span><span className="guide-label">GUIDE 02 · RENDERING</span><strong>Choose where code runs</strong><p>Understand the server, the browser, and the seam.</p><span className="guide-arrow"><ArrowRight size={14} /></span></button><button className="guide-card" onClick={() => setSection('Data & actions')}><span className="guide-icon green"><Code2 size={17} /></span><span className="guide-label">GUIDE 03 · DATA</span><strong>Load data with clarity</strong><p>Parallel loaders, validated actions, explicit cache rules.</p><span className="guide-arrow"><ArrowRight size={14} /></span></button></div></section>
            <footer className="page-footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><span /></span><span>rill</span></a><span>Built for the open web.</span><div><button onClick={() => announce('Release notes coming soon')}>Changelog</button><button onClick={() => announce('Community links coming soon')}>Community <ArrowUpRight size={11} /></button></div></footer>
          </div>
        </main>
      </div>
      {notice && <div className="toast" role="status"><Check size={14} />{notice}</div>}
    </div>
  )
}

export default App

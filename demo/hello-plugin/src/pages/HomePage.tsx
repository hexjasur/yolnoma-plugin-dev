import React, { useState } from 'react';

export function HomePage(): React.ReactElement {
  const [count, setCount] = useState(0);

  const stats = [
    { label: 'Plugin Version', value: '0.3.0', icon: '◆' },
    { label: 'Status', value: 'Active', icon: '●' },
    { label: 'Runtime', value: 'React', icon: '⚛' },
    { label: 'Environment', value: 'Development', icon: '⌘' },
  ];

  const features = [
    {
      title: 'React + TypeScript',
      description:
        'Build your plugin UI with a modern React and TypeScript stack.',
      icon: '⚛',
    },
    {
      title: 'Hot Reload',
      description:
        'Changes are reflected instantly while developing your plugin.',
      icon: '↻',
    },
    {
      title: 'Yolnoma API',
      description:
        'Connect your plugin to Yolnoma services and extend its capabilities.',
      icon: '⌁',
    },
  ];

  return (
    <div style={styles.container}>
      {/* ─────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────── */}

      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>
            <span style={styles.statusDot} />
            YOLNOMA PLUGIN
          </div>

          <h1 style={styles.title}>Hello Plugin v1.0.0</h1>

          <p style={styles.subtitle}>
            Welcome to your new Yolnoma plugin. Start building something great.
          </p>
        </div>

        <div style={styles.versionBadge}>v1.0.0</div>
      </header>

      {/* ─────────────────────────────────────────────
          HERO CARD
      ───────────────────────────────────────────── */}

      <section style={styles.heroCard}>
        <div style={styles.heroContent}>
          <div style={styles.heroIcon}>Y</div>

          <div>
            <h2 style={styles.heroTitle}>Your plugin is ready.</h2>

            <p style={styles.heroText}>
              Everything is configured and ready for development. Edit your
              pages, add components, connect APIs, and make the plugin yours.
            </p>

            <div style={styles.heroActions}>
              <button
                type="button"
                style={styles.primaryButton}
                onClick={() => {
                  window.open(
                    'https://yolnoma.uz',
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
              >
                Open Yolnoma
                <span style={styles.buttonArrow}>↗</span>
              </button>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setCount((prev) => prev + 1)}
              >
                Test interaction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          STATS
      ───────────────────────────────────────────── */}

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Plugin Overview</h2>
            <p style={styles.sectionSubtitle}>
              Current development environment
            </p>
          </div>
        </div>

        <div style={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <div style={styles.statTop}>
                <span style={styles.statIcon}>{stat.icon}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>

              <div style={styles.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          GETTING STARTED
      ───────────────────────────────────────────── */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Getting Started</h2>

            <p style={styles.cardSubtitle}>
              Start customizing your plugin from the main page.
            </p>
          </div>

          <span style={styles.stepBadge}>STEP 01</span>
        </div>

        <div style={styles.codeBlock}>
          <div style={styles.codeHeader}>
            <span>HomePage.tsx</span>

            <span style={styles.codeDotGroup}>
              <span style={styles.codeDot} />
              <span style={styles.codeDot} />
              <span style={styles.codeDot} />
            </span>
          </div>

          <div style={styles.codeContent}>
            <span style={styles.codeLineNumber}>01</span>

            <code>
              <span style={styles.codeKeyword}>export function</span>{' '}
              <span style={styles.codeFunction}>HomePage</span>() {'{'}
            </code>
          </div>

          <div style={styles.codeContent}>
            <span style={styles.codeLineNumber}>02</span>

            <code>
              {'  '}return (
              <span style={styles.codeTag}>{'<div>'}</span>
            </code>
          </div>

          <div style={styles.codeContent}>
            <span style={styles.codeLineNumber}>03</span>

            <code>
              {'    '}
              <span style={styles.codeTag}>
                {'<h1>Hello Plugin</h1>'}
              </span>
            </code>
          </div>

          <div style={styles.codeContent}>
            <span style={styles.codeLineNumber}>04</span>

            <code>
              {'  '}
              <span style={styles.codeTag}>{'</div>'}</span>
            </code>
          </div>

          <div style={styles.codeContent}>
            <span style={styles.codeLineNumber}>05</span>

            <code>
              {'  '});
            </code>
          </div>

          <div style={styles.codeContent}>
            <span style={styles.codeLineNumber}>06</span>

            <code>{'}'}</code>
          </div>
        </div>

        <div style={styles.fileHint}>
          <span style={styles.fileIcon}>⌁</span>

          <span>
            Edit{' '}
            <code style={styles.inlineCode}>
              src/pages/HomePage.tsx
            </code>{' '}
            to customize this page.
          </span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INTERACTIVE TEST
      ───────────────────────────────────────────── */}

      <section style={styles.interactiveCard}>
        <div style={styles.interactiveHeader}>
          <div>
            <div style={styles.interactiveEyebrow}>INTERACTIVE DEMO</div>

            <h2 style={styles.cardTitle}>React State Test</h2>

            <p style={styles.cardSubtitle}>
              This section confirms that React state and events are working.
            </p>
          </div>

          <div style={styles.counterCircle}>{count}</div>
        </div>

        <div style={styles.interactiveDivider} />

        <div style={styles.buttonRow}>
          <button
            type="button"
            style={styles.primaryButton}
            onClick={() => setCount((prev) => prev + 1)}
          >
            Increase counter
            <span style={styles.buttonArrow}>+</span>
          </button>

          {count > 0 && (
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FEATURES
      ───────────────────────────────────────────── */}

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Built for Development</h2>

            <p style={styles.sectionSubtitle}>
              Tools and capabilities available to your plugin
            </p>
          </div>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>

              <h3 style={styles.featureTitle}>{feature.title}</h3>

              <p style={styles.featureDescription}>
                {feature.description}
              </p>

              <span style={styles.learnMore}>
                Learn more <span>→</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────── */}

      <footer style={styles.footer}>
        <div>
          <strong style={styles.footerTitle}>Yolnoma Plugin</strong>

          <span style={styles.footerText}>
            {' '}
            • Development Environment
          </span>
        </div>

        <span style={styles.footerVersion}>v1.0.0</span>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════ */

const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '32px 24px 48px',
    maxWidth: '920px',
    margin: '0 auto',
    color: '#F2EDE6',
    boxSizing: 'border-box' as const,
  },

  /* HEADER */

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '28px',
  },

  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: '#D97757',
    marginBottom: '9px',
  },

  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#D97757',
    boxShadow: '0 0 0 3px rgba(217,119,87,0.12)',
  },

  title: {
    fontSize: '30px',
    fontWeight: 650,
    letterSpacing: '-0.025em',
    margin: '0 0 7px',
    color: '#F2EDE6',
  },

  subtitle: {
    fontSize: '13px',
    lineHeight: 1.6,
    color: 'rgba(242,237,230,0.55)',
    margin: 0,
  },

  versionBadge: {
    flexShrink: 0,
    padding: '6px 10px',
    borderRadius: '7px',
    background: 'rgba(217,119,87,0.08)',
    border: '1px solid rgba(217,119,87,0.18)',
    color: '#D97757',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '11px',
    fontWeight: 600,
  },

  /* HERO */

  heroCard: {
    position: 'relative' as const,
    overflow: 'hidden',
    background:
      'linear-gradient(135deg, #241D19 0%, #1C1915 60%, #191715 100%)',
    border: '1px solid rgba(217,119,87,0.18)',
    borderRadius: '14px',
    padding: '28px',
    marginBottom: '32px',
  },

  heroContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '18px',
    position: 'relative' as const,
    zIndex: 1,
  },

  heroIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: '#D97757',
    color: '#17130F',
    fontSize: '19px',
    fontWeight: 800,
    boxShadow: '0 8px 24px rgba(217,119,87,0.2)',
  },

  heroTitle: {
    fontSize: '19px',
    fontWeight: 600,
    margin: '1px 0 7px',
    color: '#F2EDE6',
  },

  heroText: {
    maxWidth: '650px',
    fontSize: '13px',
    lineHeight: 1.65,
    color: 'rgba(242,237,230,0.62)',
    margin: '0 0 18px',
  },

  heroActions: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '9px',
  },

  /* BUTTONS */

  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    background: '#D97757',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 15px',
    fontSize: '12px',
    fontWeight: 650,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },

  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.055)',
    color: 'rgba(242,237,230,0.82)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '8px 15px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
  },

  buttonArrow: {
    fontSize: '14px',
    opacity: 0.8,
  },

  /* SECTIONS */

  section: {
    marginBottom: '32px',
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },

  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    color: '#F2EDE6',
  },

  sectionSubtitle: {
    fontSize: '11px',
    color: 'rgba(242,237,230,0.42)',
    margin: '4px 0 0',
  },

  /* STATS */

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },

  statCard: {
    background: '#1C1915',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '15px',
  },

  statTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    marginBottom: '12px',
  },

  statIcon: {
    fontSize: '10px',
    color: '#D97757',
  },

  statLabel: {
    fontSize: '10px',
    color: 'rgba(242,237,230,0.45)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },

  statValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#F2EDE6',
  },

  /* CARD */

  card: {
    background: '#1C1915',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '22px',
    marginBottom: '16px',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '15px',
    marginBottom: '18px',
  },

  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
    margin: 0,
    color: '#F2EDE6',
  },

  cardSubtitle: {
    fontSize: '11px',
    lineHeight: 1.5,
    color: 'rgba(242,237,230,0.45)',
    margin: '4px 0 0',
  },

  stepBadge: {
    flexShrink: 0,
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'rgba(242,237,230,0.38)',
    padding: '5px 7px',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '5px',
  },

  /* CODE */

  codeBlock: {
    overflow: 'hidden',
    background: '#13110F',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: '11px',
  },

  codeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.025)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    color: 'rgba(242,237,230,0.4)',
    fontSize: '10px',
  },

  codeDotGroup: {
    display: 'flex',
    gap: '4px',
  },

  codeDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.18)',
  },

  codeContent: {
    display: 'flex',
    gap: '16px',
    minHeight: '20px',
    padding: '0 12px',
    alignItems: 'center',
    color: 'rgba(242,237,230,0.65)',
  },

  codeLineNumber: {
    width: '16px',
    color: 'rgba(242,237,230,0.18)',
    textAlign: 'right' as const,
    userSelect: 'none' as const,
  },

  codeKeyword: {
    color: '#D97757',
  },

  codeFunction: {
    color: '#E6C07B',
  },

  codeTag: {
    color: '#8ABEB7',
  },

  fileHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '13px',
    fontSize: '11px',
    color: 'rgba(242,237,230,0.45)',
  },

  fileIcon: {
    color: '#D97757',
    fontSize: '13px',
  },

  inlineCode: {
    background: 'rgba(255,255,255,0.07)',
    padding: '3px 6px',
    borderRadius: '4px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '10px',
    color: '#D97757',
  },

  /* INTERACTIVE */

  interactiveCard: {
    background: '#1C1915',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '22px',
    marginBottom: '32px',
  },

  interactiveHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  interactiveEyebrow: {
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#D97757',
    marginBottom: '6px',
  },

  counterCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    background: 'rgba(217,119,87,0.09)',
    border: '1px solid rgba(217,119,87,0.2)',
    color: '#D97757',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '16px',
    fontWeight: 600,
  },

  interactiveDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.07)',
    margin: '18px 0',
  },

  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '9px',
  },

  /* FEATURES */

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },

  featureCard: {
    background: '#1C1915',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '17px',
  },

  featureIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '7px',
    background: 'rgba(217,119,87,0.09)',
    color: '#D97757',
    fontSize: '14px',
    marginBottom: '13px',
  },

  featureTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#F2EDE6',
    margin: '0 0 6px',
  },

  featureDescription: {
    fontSize: '11px',
    lineHeight: 1.55,
    color: 'rgba(242,237,230,0.45)',
    margin: '0 0 14px',
  },

  learnMore: {
    fontSize: '10px',
    color: '#D97757',
    fontWeight: 600,
  },

  /* FOOTER */

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    color: 'rgba(242,237,230,0.35)',
    fontSize: '10px',
  },

  footerTitle: {
    color: 'rgba(242,237,230,0.55)',
    fontWeight: 600,
  },

  footerText: {
    color: 'rgba(242,237,230,0.3)',
  },

  footerVersion: {
    fontFamily: '"JetBrains Mono", monospace',
    color: 'rgba(242,237,230,0.3)',
  },
} as const;
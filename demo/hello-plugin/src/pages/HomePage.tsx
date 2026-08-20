import React, { useState } from 'react';

export function HomePage(): React.ReactElement {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Hello Plugin v0.2.1</h1>
        <p style={styles.subtitle}>Welcome to your new Yolnoma plugin!</p>
      </header>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Getting Started</h2>
        <p style={styles.cardText}>
          Edit <code style={styles.code}>src/pages/HomePage.tsx</code> to customize this page.
        </p>

        <div style={styles.interactiveArea}>
          <p style={styles.counterText}>Interactive State Test:</p>
          <div style={styles.buttonRow}>
            <button
              style={styles.primaryButton}
              onClick={() => setCount((prev) => prev + 1)}
            >
              Clicks: {count}
            </button>
            {count > 0 && (
              <button
                style={styles.secondaryButton}
                onClick={() => setCount(0)}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '24px',
    maxWidth: '760px',
    margin: '0 auto',
    color: '#F2EDE6',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    margin: '0 0 6px 0',
    color: '#F2EDE6',
  },
  subtitle: {
    fontSize: '13px',
    color: 'rgba(242,237,230,0.55)',
    margin: 0,
  },
  card: {
    background: '#1C1915',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '24px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    color: '#F2EDE6',
  },
  cardText: {
    fontSize: '13px',
    color: 'rgba(242,237,230,0.75)',
    margin: '0 0 20px 0',
    lineHeight: 1.5,
  },
  code: {
    background: 'rgba(255,255,255,0.08)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '12px',
    color: '#D97757',
  },
  interactiveArea: {
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  counterText: {
    fontSize: '12px',
    color: 'rgba(242,237,230,0.5)',
    margin: '0 0 10px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  buttonRow: {
    display: 'flex',
    gap: '10px',
  },
  primaryButton: {
    background: '#D97757',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 18px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondaryButton: {
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(242,237,230,0.8)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '13px',
    cursor: 'pointer',
  },
} as const;

import { ImageResponse } from 'next/og';

export const alt = 'Dustin Nieves — Software for the systems that actually run.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const paper = '#f6f4ef';
const ink = '#1b1a17';
const inkMuted = '#6b6657';
const inkFaint = '#9a8f7a';
const rule = '#d8d3c6';
const signal = '#9a4a32';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: paper,
          color: ink,
          padding: '56px 72px',
        }}
      >
        {/* Doc-header bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 28,
            borderBottom: `2px solid ${rule}`,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: inkMuted,
          }}
        >
          <span>Portfolio · Engineer</span>
          <span>Operations → Software</span>
        </div>

        {/* Heading block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: signal,
              marginBottom: 28,
            }}
          >
            Dustin Nieves · Diese
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.08,
              maxWidth: 900,
            }}
          >
            Software for the systems that actually run.
          </div>
          <div
            style={{
              fontSize: 28,
              color: inkMuted,
              marginTop: 28,
              maxWidth: 860,
              lineHeight: 1.5,
            }}
          >
            Tools, dashboards, and SaaS products built around real business workflows.
          </div>
        </div>

        {/* Ledger strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 28,
            borderTop: `2px solid ${rule}`,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: inkFaint,
          }}
        >
          <span>R-001 — R-008 · System Records</span>
          <span style={{ color: signal }}>● Available</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

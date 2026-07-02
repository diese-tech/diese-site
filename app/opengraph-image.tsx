import { ImageResponse } from 'next/og';

export const alt = 'Dustin Nieves — Software for the systems that actually run.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const bg = '#0d0b09';
const panel = '#141110';
const bar = '#1e1a16';
const ink = '#ece7df';
const inkMuted = '#a89f90';
const inkFaint = '#71685b';
const rule = '#2d2720';
const signal = '#c96f4a';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: bg,
          backgroundImage: `radial-gradient(700px 380px at 82% -8%, rgba(201, 111, 74, 0.22), transparent 65%)`,
          padding: 56,
        }}
      >
        {/* Mac window */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: panel,
            border: `1px solid ${rule}`,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '18px 28px',
              backgroundColor: bar,
              borderBottom: `1px solid ${rule}`,
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 999, backgroundColor: '#f2564d' }} />
            <div style={{ width: 16, height: 16, borderRadius: 999, backgroundColor: '#f6b23e' }} />
            <div style={{ width: 16, height: 16, borderRadius: 999, backgroundColor: '#3fb950' }} />
            <div
              style={{
                marginLeft: 14,
                fontSize: 22,
                letterSpacing: 2,
                color: inkFaint,
              }}
            >
              dustin@diese — portfolio
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'center',
              padding: '0 64px',
            }}
          >
            <div
              style={{
                fontSize: 24,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: signal,
                marginBottom: 26,
              }}
            >
              Dustin Nieves · Diese
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 700,
                letterSpacing: -1.5,
                lineHeight: 1.08,
                color: ink,
                maxWidth: 880,
              }}
            >
              Software for the systems that actually run.
            </div>
            <div
              style={{
                fontSize: 27,
                color: inkMuted,
                marginTop: 26,
                maxWidth: 860,
                lineHeight: 1.5,
              }}
            >
              Tools, dashboards, and SaaS products built around real business workflows.
            </div>
          </div>

          {/* Footer strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '22px 64px',
              borderTop: `1px solid ${rule}`,
              fontSize: 21,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: inkFaint,
            }}
          >
            <span>projects/ · experience.log · github.stats</span>
            <span style={{ color: signal }}>● Available</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

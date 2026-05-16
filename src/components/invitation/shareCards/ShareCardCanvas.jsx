import React, { forwardRef } from 'react';
import { getEventDataForTemplate } from '../../../lib/shareCardTemplates';
import { getSharePhoto } from '../../../lib/sharePhoto';
import CoverPhotoFrame from '../../shared/CoverPhotoFrame';

const FloralCorner = ({ color = 'rgba(197, 160, 89, 0.35)' }) => {
  const cornerStyle = {
    position: 'absolute',
    width: 36,
    height: 36,
    pointerEvents: 'none',
  };
  return (
    <>
      <div style={{ ...cornerStyle, top: 8, left: 8, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, borderRadius: '4px 0 0 0' }} />
      <div style={{ ...cornerStyle, top: 8, right: 8, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`, borderRadius: '0 4px 0 0' }} />
      <div style={{ ...cornerStyle, bottom: 8, left: 8, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`, borderRadius: '0 0 0 4px' }} />
      <div style={{ ...cornerStyle, bottom: 8, right: 8, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, borderRadius: '0 0 4px 0' }} />
    </>
  );
};

const GuestBlock = ({ guestName, t, accent, gold }) =>
  guestName ? (
    <div style={{ marginBottom: 12 }}>
      <p
        style={{
          fontSize: 10,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: accent,
          margin: '0 0 4px',
          fontFamily: 'Cinzel, serif',
        }}
      >
        {t.honoredGuest || 'Honored Guest'}
      </p>
      <p
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: gold,
          margin: 0,
          fontFamily: 'Playfair Display, serif',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        {guestName}
      </p>
    </div>
  ) : null;

const CouplePhoto = ({ config, borderColor = '#fff', size = 120 }) => (
  <CoverPhotoFrame
    src={getSharePhoto(config)}
    config={config}
    size={size}
    borderColor={borderColor}
    style={{ margin: '0 auto 16px' }}
  />
);

const EventDetails = ({ eventData, accent, gold, lightText }) => (
  <div style={{ marginTop: 12 }}>
    {eventData.date && (
      <p
        style={{
          fontSize: 13,
          letterSpacing: '0.15em',
          color: lightText ? 'rgba(255,255,255,0.9)' : accent,
          margin: '4px 0',
          fontWeight: 600,
        }}
      >
        {eventData.date}
        {eventData.time ? ` · ${eventData.time}` : ''}
      </p>
    )}
    {eventData.venue && (
      <p
        style={{
          fontSize: 10,
          letterSpacing: '0.08em',
          color: lightText ? 'rgba(255,255,255,0.75)' : gold,
          margin: '8px 0 0',
          lineHeight: 1.4,
        }}
      >
        {eventData.venue}
      </p>
    )}
  </div>
);

const ShareCardCanvas = forwardRef(({ template, config, coupleNames, guestName, t }, ref) => {
  const theme = template.theme;
  const eventData = getEventDataForTemplate(config, template);
  const name1 = config?.couple?.name1 || coupleNames?.split(' & ')[0] || '';
  const name2 = config?.couple?.name2 || coupleNames?.split(' & ')[1] || '';
  const familyName = config?.familyName || `${name1} & ${name2}`.replace(/\s*&\s*/g, ' ');
  const isDark = ['sangeet', 'wedding', 'reception'].includes(template.id);

  const baseWrap = {
    width: 300,
    maxWidth: 300,
    margin: '0 auto',
    minHeight: 'auto',
    borderRadius: 24,
    padding: '28px 20px 36px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'visible',
    background: theme.bg,
    boxSizing: 'border-box',
  };

  if (template.id === 'welcome') {
    return (
      <div ref={ref} style={baseWrap} data-share-card>
        <FloralCorner color={theme.gold} />
        <p style={{ fontSize: 28, margin: '0 0 8px', color: theme.gold }}>ॐ</p>
        <GuestBlock guestName={guestName} t={t} accent={theme.accent} gold={theme.gold} />
        <p
          style={{
            fontSize: 9,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: theme.accent,
            margin: '0 0 6px',
            fontFamily: 'Cinzel, serif',
          }}
        >
          {t.shareFamilyWelcomes || 'Family Welcomes You'}
        </p>
        <h3
          style={{
            fontSize: 22,
            color: theme.accent,
            margin: '0 0 16px',
            fontFamily: 'Pinyon Script, cursive',
            lineHeight: 1.2,
          }}
        >
          {familyName}
        </h3>
        <CouplePhoto config={config} />
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            color: theme.gold,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {t.joyfullyInvite || 'We joyfully invite you'}
        </p>
        <h4
          style={{
            fontSize: 26,
            color: theme.accent,
            margin: '8px 0 0',
            fontFamily: 'Pinyon Script, cursive',
          }}
        >
          {coupleNames}
        </h4>
      </div>
    );
  }

  if (template.id === 'couple') {
    return (
      <div ref={ref} style={baseWrap} data-share-card>
        <FloralCorner color={theme.gold} />
        <GuestBlock guestName={guestName} t={t} accent={theme.accent} gold={theme.gold} />
        <CouplePhoto config={config} borderColor={theme.gold} size={100} />
        <h3
          style={{
            fontSize: 24,
            color: theme.accent,
            margin: '0 0 16px',
            fontFamily: 'Pinyon Script, cursive',
          }}
        >
          {coupleNames}
        </h3>
        <div
          style={{
            textAlign: 'left',
            padding: '0 8px',
            fontSize: 11,
            color: theme.accent,
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: '0 0 12px' }}>
            <strong style={{ color: theme.gold }}>{name1}</strong>
            <br />
            <span style={{ opacity: 0.75, fontSize: 10 }}>
              {t.shareDaughterOf || 'D/o'} {config?.couple?.parents1 || `Mr. & Mrs. ${name1.split(' ').pop() || '—'}`}
            </span>
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: theme.gold }}>{name2}</strong>
            <br />
            <span style={{ opacity: 0.75, fontSize: 10 }}>
              {t.shareSonOf || 'S/o'} {config?.couple?.parents2 || `Mr. & Mrs. ${name2.split(' ').pop() || '—'}`}
            </span>
          </p>
        </div>
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${theme.gold}33` }}>
          <p style={{ fontSize: 10, letterSpacing: '0.2em', color: theme.gold, margin: 0 }}>
            {t.saveTheDate || 'Save the Date'}
          </p>
          <EventDetails eventData={eventData} accent={theme.accent} gold={theme.gold} />
        </div>
      </div>
    );
  }

  if (template.id === 'classic') {
    return (
      <div
        ref={ref}
        data-share-card
        style={{
          ...baseWrap,
          backgroundColor: '#FDFBF7',
          border: '8px solid rgba(197, 160, 89, 0.1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 8,
            border: '1px solid rgba(197, 160, 89, 0.2)',
            borderRadius: 16,
            pointerEvents: 'none',
          }}
        />
        <GuestBlock guestName={guestName} t={t} accent={theme.accent} gold={theme.gold} />
        {!guestName && (
          <p
            style={{
              fontSize: 12,
              letterSpacing: '0.4em',
              color: theme.gold,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {t.celebrationOfLove || 'Celebration of Love'}
          </p>
        )}
        <CouplePhoto config={config} />
        <h3 style={{ fontSize: 28, color: theme.accent, margin: '0 0 8px', fontFamily: 'Pinyon Script, cursive' }}>
          {coupleNames}
        </h3>
        <div style={{ width: 40, height: 1, background: 'rgba(197,160,89,0.3)', margin: '0 auto 12px' }} />
        <p style={{ fontSize: 13, color: '#737373', fontStyle: 'italic', margin: '0 0 4px' }}>
          {t.weddingCeremony || 'Wedding Ceremony'}
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'rgba(197,160,89,0.7)',
            fontWeight: 700,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {t.saveTheDate || 'Save the Date'}
        </p>
      </div>
    );
  }

  const emoji =
    template.id === 'haldi' ? '🌼' : template.id === 'sangeet' ? '✨' : template.id === 'wedding' ? '🔥' : '🎉';

  return (
    <div ref={ref} style={baseWrap} data-share-card>
      {template.id === 'sangeet' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 0%, rgba(224,64,251,0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
      )}
      {template.id === 'reception' && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 10,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          ✦ ✦ ✦
        </div>
      )}
      <FloralCorner color={isDark ? 'rgba(255,255,255,0.25)' : theme.gold} />
      <p style={{ fontSize: 32, margin: '0 0 8px' }}>{emoji}</p>
      <GuestBlock guestName={guestName} t={t} accent={theme.accent} gold={theme.gold} />
      <h2
        style={{
          fontSize: 14,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: isDark ? theme.gold : theme.accent,
          margin: '0 0 12px',
          fontFamily: 'Cinzel, serif',
          fontWeight: 700,
        }}
      >
        {eventData.title}
      </h2>
      <CouplePhoto config={config} borderColor={isDark ? theme.gold : '#fff'} />
      <h3
        style={{
          fontSize: 22,
          color: theme.accent,
          margin: '0 0 8px',
          fontFamily: 'Pinyon Script, cursive',
        }}
      >
        {coupleNames}
      </h3>
      <EventDetails eventData={eventData} accent={theme.accent} gold={theme.gold} lightText={isDark} />
    </div>
  );
});

ShareCardCanvas.displayName = 'ShareCardCanvas';

export default ShareCardCanvas;

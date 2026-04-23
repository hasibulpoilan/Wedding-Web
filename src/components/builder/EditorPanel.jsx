import React from 'react';
import { Heart, Calendar, MapPin, Image as ImageIcon, Music, Sparkles } from 'lucide-react';

const EditorPanel = ({ config, updateConfig }) => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gold/10 rounded-lg">
          <Heart className="w-6 h-6 text-gold fill-gold" />
        </div>
        <h1 className="text-xl font-bold text-deep-green serif italic">Wedding Builder</h1>
      </div>

      {/* Couple Info */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-400">
          <Heart className="w-4 h-4" /> Couple Details
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-neutral-600 ml-1">Person 1 Name</label>
            <input 
              type="text" 
              value={config.couple.name1}
              onChange={(e) => updateConfig('couple.name1', e.target.value)}
              className="w-full p-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 ml-1">Person 2 Name</label>
            <input 
              type="text" 
              value={config.couple.name2}
              onChange={(e) => updateConfig('couple.name2', e.target.value)}
              className="w-full p-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 ml-1">Initials (For Wax Seal)</label>
            <input 
              type="text" 
              value={config.couple.initials}
              onChange={(e) => updateConfig('couple.initials', e.target.value)}
              className="w-full p-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
        </div>
      </section>

      {/* Date & Venue */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-400">
          <Calendar className="w-4 h-4" /> Date & Venue
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-neutral-600 ml-1">Wedding Date</label>
            <input 
              type="date" 
              value={config.date}
              onChange={(e) => updateConfig('date', e.target.value)}
              className="w-full p-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 ml-1">Venue Location</label>
            <input 
              type="text" 
              value={config.venue}
              onChange={(e) => updateConfig('venue', e.target.value)}
              className="w-full p-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
        </div>
      </section>

      {/* Events Manager */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-400">
          <Sparkles className="w-4 h-4" /> Events
        </h2>
        <div className="space-y-4">
          {config.events.map((event, idx) => (
            <div key={event.id} className="p-3 border border-neutral-100 rounded-lg bg-neutral-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-serif italic text-gold">{event.title}</span>
                <input 
                  type="checkbox" 
                  checked={event.enabled}
                  onChange={(e) => {
                    const newEvents = [...config.events];
                    newEvents[idx].enabled = e.target.checked;
                    updateConfig('events', newEvents);
                  }}
                  className="accent-gold w-4 h-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Time"
                  value={event.time}
                  onChange={(e) => {
                    const newEvents = [...config.events];
                    newEvents[idx].time = e.target.value;
                    updateConfig('events', newEvents);
                  }}
                  className="p-1.5 text-[10px] border border-neutral-200 rounded bg-white outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Date/Day"
                  value={event.date}
                  onChange={(e) => {
                    const newEvents = [...config.events];
                    newEvents[idx].date = e.target.value;
                    updateConfig('events', newEvents);
                  }}
                  className="p-1.5 text-[10px] border border-neutral-200 rounded bg-white outline-none"
                />
              </div>
              <div className="mt-2 space-y-2">
                <input 
                  type="text" 
                  placeholder="Venue Name (e.g. The Grand Palace)"
                  value={event.venueName}
                  onChange={(e) => {
                    const newEvents = [...config.events];
                    newEvents[idx].venueName = e.target.value;
                    updateConfig('events', newEvents);
                  }}
                  className="w-full p-1.5 text-[10px] border border-neutral-200 rounded bg-white outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Google Maps Link (Venue URL)"
                  value={event.venueUrl}
                  onChange={(e) => {
                    const newEvents = [...config.events];
                    newEvents[idx].venueUrl = e.target.value;
                    updateConfig('events', newEvents);
                  }}
                  className="w-full p-1.5 text-[10px] border border-neutral-200 rounded bg-white outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-neutral-100">
        <button className="w-full py-3 bg-deep-green text-cream rounded-xl font-bold text-sm shadow-xl hover:bg-black transition-all">
          Generate Website
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;

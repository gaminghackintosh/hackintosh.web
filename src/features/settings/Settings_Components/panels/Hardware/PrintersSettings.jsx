import React, { useState } from "react";
import { SettingsPanel, SettingsGroup, SettingsRow } from "../../SettingsPanel";

export const PrintersSettings = () => {
  const [printers, setPrinters] = useState([
    { name: "HP LaserJet Pro", status: "Idle", location: "Office" },
    { name: "Canon PIXMA", status: "Ready", location: "Home" },
  ]);

  return (
    <SettingsPanel 
      title="Printers & Scanners"
      description="Manage printers and scanners connected to your Mac."
      icon="printer"
    >
      <SettingsGroup label="Printers">
        <div className="printers-list" style={{ padding: '10px' }}>
          {printers.map((printer, idx) => (
            <div
              key={idx}
              className="printer-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{printer.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{printer.location}</div>
              </div>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                background: printer.status === 'Ready' ? '#d4edda' : '#f8f9fa',
                color: printer.status === 'Ready' ? '#155724' : '#666'
              }}>
                {printer.status}
              </span>
            </div>
          ))}
        </div>
        <button 
          className="ctrl-btn ctrl-btn--primary"
          style={{ margin: '10px', padding: '8px 16px' }}
          onClick={() => {}}
        >
          Add Printer, Scanner, or Fax...
        </button>
      </SettingsGroup>
    </SettingsPanel>
  );
};

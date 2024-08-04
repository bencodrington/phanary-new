import React from "react";

import "./TabSwitcher.scss";

export interface Tab {
  id: string,
  displayName: string,
  icon: string,
}

interface TabSwitcherProps {
  tabs: Tab[],
  selectedTabId: string,
  onTabClick: (newTabId: string) => void
}
export default function TabSwitcher({ tabs, selectedTabId, onTabClick }: TabSwitcherProps) {
  return (
    <div className="tab-switcher-container">
      {
        tabs.map(tab =>
          <div
            className={`tab ${tab.id === selectedTabId ? 'active' : ''}`}
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
          >
            <i className={`fa-solid fa-${tab.icon}`} />
            <span>
              {tab.displayName}
            </span>
          </div>
        )
      }
    </div>
  )
}
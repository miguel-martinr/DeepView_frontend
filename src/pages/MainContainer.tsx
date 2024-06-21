import React from 'react'
import { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'

import '../App.css'
import { VersionSwitch } from '../features/VersionSwitch/VersionSwitch'
import { AppVersion, VersionContext, VersionContextType } from '../state/context/VersionContext'
import { useAppVersion } from '../state/hooks/useAppVersion'

export const MainContainer = () => {  

  // Version switch  
  const {version, toggleVersion} = useAppVersion();
  const initialVersionContext: VersionContextType = {
    version,
    toggleVersion
  }

  return (
    <div>
      <VersionContext.Provider value={initialVersionContext}>      
        <header className="app-header">          
              <h1 className="app-title">DeepView</h1>
              <div className='version-switch-wrapper'>
                <VersionSwitch toggleVersion={toggleVersion} isOn={version === AppVersion.online}/>                      
              </div>     
        </header>      
      </VersionContext.Provider>
      <Outlet />
    </div>
  )
}

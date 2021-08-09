import React from 'react'

const LoadinCenter = () => (
  <div className="admin-login-container">
    <div className="lds-grid">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <style jsx>
      {`
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(250, 250, 250);
        }
      `}
    </style>
  </div>
)

export default LoadinCenter

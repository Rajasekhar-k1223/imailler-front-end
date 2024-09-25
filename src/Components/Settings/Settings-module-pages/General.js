import React from 'react'

const General = () => {
  return (
    <div className="p-4">
            <h4>Language and time</h4>
            <div className="mb-3">
              <label htmlFor="syncSettings" className="form-label">
                Sync across Microsoft 365
              </label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="syncSettings" />
                <label className="form-check-label" htmlFor="syncSettings">
                  Use my Microsoft 365 settings
                </label>
              </div>
            </div>

            <div className="mb-3">
              <h5>Outlook settings</h5>
              <div className="mb-3">
                <label htmlFor="languageSelect" className="form-label">Language</label>
                <select className="form-select" id="languageSelect">
                  <option>English (United States)</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="dateFormat" className="form-label">Date format</label>
                <select className="form-select" id="dateFormat">
                  <option>9/1/2025</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="timeFormat" className="form-label">Time format</label>
                <select className="form-select" id="timeFormat">
                  <option>1:01 AM - 11:59 PM</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="timeZone" className="form-label">Time zone</label>
                <select className="form-select" id="timeZone">
                  <option>UTC+05:30 Chennai, Kolkata, Mumbai, New Delhi</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>
  )
}

export default General
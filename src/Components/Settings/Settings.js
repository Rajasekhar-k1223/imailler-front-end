import React,{useEffect, useState} from 'react'
import SideMenuPage from '../SideMenu/SideMenuPage'
import HeaderPage from '../Header/HeaderPage'
import General from './Settings-module-pages/General'
import Mail from './Settings-module-pages/Mail'
import Calendar from './Settings-module-pages/Calendar'
import People from './Settings-module-pages/People'
import Appearance from './Settings-module-pages/Appearance'
import Notifications from './Settings-module-pages/Notifications'
import Categories from './Settings-module-pages/Categories'
import Accessibility from './Settings-module-pages/Accessibility'
import Mobile_devices from './Settings-module-pages/Mobile_devices'
import Distribution_groups from './Settings-module-pages/Distribution_groups'
import Storage from './Settings-module-pages/Storage'
import Privacy_and_data from './Settings-module-pages/Privacy_and_data'
import Search from './Settings-module-pages/Search'

const Settings = () => {
    const [activeSection, setActiveSection] = useState("general"); // State for left sidebar selection
    const [activeSectionSubItem,setActiveSectionSubItem] = useState()
    useEffect(()=>{
        console.log(activeSection)
        console.log(activeSectionSubItem)
        if(activeSection === "general"){
            setActiveSectionSubItem("Language and time")
        }
        if(activeSection === "mail"){
            setActiveSectionSubItem("Compose and reply")
        }
        if(activeSection === "calender"){
            setActiveSectionSubItem("View")
        }
    },[activeSection])

    // Sublist items for the General section
    const generalSublist = [
      "Language and time",
      "Appearance",
      "Notifications",
      "Categories",
      "Accessibility",
      "Mobile devices",
      "Distribution groups",
      "Storage",
      "Privacy and data",
      "Search"
    ];
    const MailSublist =[
        "Compose and reply",
        "Smart suggestions",
        "Attachments",
        "Rules",
        "Conditional formatting",
        "Sweep",
        "Junk email",
        "Quick steps",
        "Customize actions",
        "Sync email",
        "Message handling",
        "Forwarding",
        "Automatic replies",
        "Retention policies",
        "S/MIME",
        "Groups"
    ]
    const calendars = [
        "View",
        "Events an Invitations",
        "Weather",
        "Events from Email",
        "Shared Calendars",
        "Customize actions",
        "Accounts",
        "Work hours and location"
    ]
  return (
    <div style={{pverflow:"hidden"}}>
    <HeaderPage />
    <SideMenuPage />
    <div className="container-fluid" style={{paddingLeft:"5rem",overflowY:"auto"}}>
      <div className="row">
        {/* Sidebar */}
        {/* <div className="col-md-3 border-end"> */}
          {/* <h4>Settings</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" onClick={() => setActiveSection("languageTime")}><strong>General</strong></li>
            <li className="list-group-item" onClick={() => setActiveSection("Mail")}>Mail</li>
            <li className="list-group-item" onClick={() => setActiveSection("Calendar")}>Calendar</li>
            <li className="list-group-item" onClick={() => setActiveSection("People")}>People</li>
            <li className="list-group-item" onClick={() => setActiveSection("Appearance")}>Appearance</li>
            <li className="list-group-item" onClick={() => setActiveSection("Notifications")}>Notifications</li>
            <li className="list-group-item" onClick={() => setActiveSection("Categories")}>Categories</li>
            <li className="list-group-item" onClick={() => setActiveSection("Accessibility")}>Accessibility</li>
            <li className="list-group-item" onClick={() => setActiveSection("Mobile_devices")}>Mobile devices</li>
            <li className="list-group-item" onClick={() => setActiveSection("Distribution_groups")}>Distribution groups</li>
            <li className="list-group-item" onClick={() => setActiveSection("Storage")}>Storage</li>
            <li className="list-group-item" onClick={() => setActiveSection("Privacy_and_data")}>Privacy and data</li>
            <li className="list-group-item" onClick={() => setActiveSection("Search")}>Search</li>
          </ul>
        </div> */}
         {/* Sidebar */}
         <div className="col-md-2 border-end">
          <h4>Settings</h4>
          <ul className="list-group list-group-flush">
            <li
              className={`list-group-item ${activeSection === "general" ? "active" : ""}`}
              onClick={() => setActiveSection(activeSection === "general" ? null : "general")} // Toggle General list
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-gear"></i> <strong>General</strong>
            </li>
            <li
              className={`list-group-item ${activeSection === "mail" ? "active" : ""}`}
              onClick={() => setActiveSection("mail")}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-envelope"></i> Mail
            </li>
            <li
              className={`list-group-item ${activeSection === "calendar" ? "active" : ""}`}
              onClick={() => setActiveSection("calendar")}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-calendar"></i> Calendar
            </li>
            <li
              className={`list-group-item ${activeSection === "people" ? "active" : ""}`}
              onClick={() => setActiveSection("people")}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-people"></i> People
            </li>
          </ul>
        </div>

        {/* Right-Side Content */}
        <div className="col-md-2 border-end" style={{overflowY:"auto",height:"90vh"}}>
          {/* Sublist for General */}
          {activeSection === "general" && (
            <div className="p-1">
              <h4>General</h4>
              <ul className="list-group list-group-flush">
                {generalSublist.map((item, index) => (
                  <li key={index} className="list-group-item" style={{ cursor: 'pointer' }}  onClick={() => setActiveSectionSubItem(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
           {activeSection === "mail" && (
            <div className="p-1">
              <h4>General</h4>
              <ul className="list-group list-group-flush">
                {MailSublist.map((item, index) => (
                  <li key={index} className="list-group-item" style={{ cursor: 'pointer' }}  onClick={() => setActiveSectionSubItem(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
           {activeSection === "calendar" && (
            <div className="p-1">
              <h4>General</h4>
              <ul className="list-group list-group-flush">
                {calendars.map((item, index) => (
                  <li key={index} className="list-group-item" style={{ cursor: 'pointer' }}  onClick={() => setActiveSectionSubItem(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          

        </div>
        {/* Main Content */}
        <div className="col-md-7">
            {/* {console.log(activeSectionSubItem)} */}
            {/* Language and Time Section */}
            {activeSectionSubItem === "Language and time" && (
                <General />
            )}
            {/* Mail Section */}
            { activeSectionSubItem === "Mail" && (
              <Mail />
            )}

            {/* Calendar Section */}
            {activeSectionSubItem === "Calendar" && (
              <Calendar />
            )}

            {/* People Section */}
            {activeSectionSubItem === "People" && (
              <People />
            )}
            {/* Appearance Section */}
            {activeSectionSubItem === "Appearance" && (
              <Appearance />
            )}
            {/* Notifications Section */}
            {activeSectionSubItem === "Notifications" && (
              <Notifications />
            )}
            {/* Categories Section */}
            {activeSectionSubItem === "Categories" && (
              <Categories />
            )}
            {/* Accessibility Section */}
            {activeSectionSubItem === "Accessibility" && (
              <Accessibility />
            )}
            {/* Mobile devices Section */}
            {activeSectionSubItem === "Mobile_devices" && (
              <Mobile_devices />
            )}
            {/* Distribution groups Section */}
            {activeSectionSubItem === "Distribution_groups" && (
              <Distribution_groups />
            )}
            {/* Storage Section */}
            {activeSectionSubItem === "Storage" && (
              <Storage />
            )}
            {/* Privacy and data Section */}
            {activeSectionSubItem === "Privacy_and_data" && (
              <Privacy_and_data />
            )}
            {/* Search Section */}
            {activeSectionSubItem === "Search" && (
              <Search />
            )}
          
    
        </div>
      </div>
    </div>
    </div>
  )
}

export default Settings
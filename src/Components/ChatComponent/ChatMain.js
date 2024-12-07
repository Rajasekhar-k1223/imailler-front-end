import React,{ useState,useEffect }  from 'react'
import '../ChatComponent/chat.css'
import { FaAngleDown, FaLessThanEqual } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
const users =[
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },{
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    },
    {
      "username": "user_1",
      "active": false,
      "userdetails": "User details for user_1"
    },
    {
      "username": "user_2",
      "active": true,
      "userdetails": "User details for user_2"
    },
    {
      "username": "user_3",
      "active": false,
      "userdetails": "User details for user_3"
    },
    {
      "username": "user_4",
      "active": true,
      "userdetails": "User details for user_4"
    },
    {
      "username": "user_5",
      "active": false,
      "userdetails": "User details for user_5"
    },
    {
      "username": "user_6",
      "active": true,
      "userdetails": "User details for user_6"
    },
    {
      "username": "user_7",
      "active": false,
      "userdetails": "User details for user_7"
    },
    {
      "username": "user_8",
      "active": true,
      "userdetails": "User details for user_8"
    },
    {
      "username": "user_9",
      "active": false,
      "userdetails": "User details for user_9"
    },
    {
      "username": "user_10",
      "active": true,
      "userdetails": "User details for user_10"
    }
  ]
export default function ChatMain() {
  const [showup,setshowup] = useState(false);
  const [userList,setuserList] =useState([])
  const username = localStorage.getItem('username')
  const showDownEvent = ()=>{
    setshowup(false)
  }
  const showupEvent = ()=>{
    setshowup(true)
  }
  
  useEffect(()=>{
   
    setuserList(users)
  },[])
  const activeUsers = users.filter(user => user.active);
  const inactiveUsers = users.filter(user => !user.active);
  return (
    <div className={showup ?'chatbox-open':'chatbox-close'}>
        <div className='chat-header'>
          <div className='row m-0 p-0'>
            <div className='col-md-10 text-white font-weight-bolder small p-2' style={{fontWeight:600}}>{username}</div>
            <div className='col-md-1 p-1'>
                {showup ?<FaAngleDown color='#fff'  onClick={showDownEvent} className='upDown'/>:<FaAngleUp color='#fff' onClick={showupEvent}  className='upDown'/>}
            </div>
          </div>    
        </div>
        <div className='chat-users-list mt-5'>
        {activeUsers.length > 0 ? (
        <ul style={{listStyleType:'none'}}>
          {activeUsers.map(user => (
            <li key={user.id}><FaUserCircle style={{width:'30px',height:'20px'}}/>{user.username} - {user.email}</li>
          ))}
        </ul>
      ) : (
        null
      )}
      {inactiveUsers.length > 0 ? (
        <ul>
          {inactiveUsers.map(user => (
            <li key={user.id}><FaUserCircle style={{width:'30px',height:'20px'}}/>{user.username} - {user.email}</li>
          ))}
        </ul>
      ) : (
null
      )}
        </div>

    </div>  
  )
}

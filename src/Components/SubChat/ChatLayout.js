import React, {useEffect, useState, useRef, useContext } from 'react';
import { Layout, List, Avatar, Badge, Typography, Card, Input, Button, Upload } from 'antd';
import { SendOutlined, UploadOutlined, SmileOutlined } from '@ant-design/icons';
import { PhoneOutlined, VideoCameraOutlined, SettingOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import SideMenuPage from '../SideMenu/SideMenuPage';
import HeaderPage from '../Header/HeaderPage';
import './ChatLayout.css';
import config from '../../config';
import CallScreen from '../CallSystem/CallScreen';
import { SocketContext } from '../../Context/SocketProvider';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

function ChatLayout() {
    const { socket, message } = useContext(SocketContext);
    console.log(socket)
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [friendsList, setfriendsList] = useState([])
    const [isCallScreenVisible, setCallScreenVisible] = useState(false);
    const messageEndRef = useRef(null);
    const emojiPickerRef = useRef(null); // Reference for emoji picker
    const emojiButtonRef = useRef(null); // Ref for emoji button
//     const friendsList = [
//     { "userName": "Rajasekhar", "profilePic": "https://randomuser.me/api/portraits/men/1.jpg", "active": 1, "lastActive": "2025-02-07 16:53:44" },
//     { "userName": "Vijay", "profilePic": "https://randomuser.me/api/portraits/men/2.jpg", "active": 0, "lastActive": "2025-02-07 15:30:22" },
//     { "userName": "Prabhakar", "profilePic": "https://randomuser.me/api/portraits/men/3.jpg", "active": 1, "lastActive": "2025-02-07 17:10:05" },
//     { "userName": "Sailesh", "profilePic": "https://randomuser.me/api/portraits/men/4.jpg", "active": 1, "lastActive": "2025-02-07 18:05:12" },
//     { "userName": "Mohit", "profilePic": "https://randomuser.me/api/portraits/men/5.jpg", "active": 0, "lastActive": "2025-02-07 14:45:30" },
//     { "userName": "Saichand", "profilePic": "https://randomuser.me/api/portraits/men/6.jpg", "active": 1, "lastActive": "2025-02-07 19:20:33" },
//     { "userName": "Amit", "profilePic": "https://randomuser.me/api/portraits/men/7.jpg", "active": 0, "lastActive": "2025-02-07 13:25:50" },
//     { "userName": "Sandeep", "profilePic": "https://randomuser.me/api/portraits/men/8.jpg", "active": 1, "lastActive": "2025-02-07 20:15:40" },
//     { "userName": "Neha", "profilePic": "https://randomuser.me/api/portraits/women/1.jpg", "active": 1, "lastActive": "2025-02-07 21:05:10" },
//     { "userName": "Pooja", "profilePic": "https://randomuser.me/api/portraits/women/2.jpg", "active": 0, "lastActive": "2025-02-07 10:30:11" },
//     { "userName": "Ravi", "profilePic": "https://randomuser.me/api/portraits/men/9.jpg", "active": 1, "lastActive": "2025-02-07 22:10:22" },
//     { "userName": "Ankit", "profilePic": "https://randomuser.me/api/portraits/men/10.jpg", "active": 1, "lastActive": "2025-02-07 23:45:55" },
//     { "userName": "Megha", "profilePic": "https://randomuser.me/api/portraits/women/3.jpg", "active": 0, "lastActive": "2025-02-07 09:10:19" },
//     { "userName": "Kiran", "profilePic": "https://randomuser.me/api/portraits/men/11.jpg", "active": 1, "lastActive": "2025-02-07 12:50:48" },
//     { "userName": "Divya", "profilePic": "https://randomuser.me/api/portraits/women/4.jpg", "active": 1, "lastActive": "2025-02-07 13:05:33" },
//     { "userName": "Arjun", "profilePic": "https://randomuser.me/api/portraits/men/12.jpg", "active": 0, "lastActive": "2025-02-07 08:20:12" },
//     { "userName": "Suman", "profilePic": "https://randomuser.me/api/portraits/women/5.jpg", "active": 1, "lastActive": "2025-02-07 18:40:15" },
//     { "userName": "Rohit", "profilePic": "https://randomuser.me/api/portraits/men/13.jpg", "active": 1, "lastActive": "2025-02-07 20:30:45" },
//     { "userName": "Simran", "profilePic": "https://randomuser.me/api/portraits/women/6.jpg", "active": 0, "lastActive": "2025-02-07 11:55:32" }
// ];


    const [selectedUser, setSelectedUser] = useState(null);
    const sortedFriendsList = [...friendsList].sort((a, b) => b.active - a.active || a.time - b.time);
     const sendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: 'You' }]);
            setInputValue('');
            setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }
     };
    useEffect(() => {
        getFriendsList();
    },[]);

    const getFriendsList = () => { 
        // const axios = require('axios');
        const [user_name, domain] = username.split("@");
        let data = JSON.stringify({
        "email": username,
        "domain": domain
        });

        let config_data = {
        method: 'get',
        maxBodyLength: Infinity,
        url: config.api.url+'/api/get-friendslist?domain='+domain,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+token
        },
        data : data
        };

        axios.request(config_data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            setfriendsList(response.data)
        })
        .catch((error) => {
        console.log(error);
        });

    }

    // const handleEmojiClick = (event, emojiObject) => {
    //     setInputValue(prev => prev + emojiObject.emoji);
    // };
    // Function to generate a consistent color based on name or email
    const getColorFromString = (str) => {
        if (!str) return "#1890ff"; // Default color if no name/email
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `hsl(${hash % 360}, 70%, 50%)`; // HSL color variation
        return color;
    };

    const handleEmojiClick = (event, emojiData) => {
        console.log(event.emoji)
        console.log(emojiData)
        console.log(emojiData.emoji)
    if (emojiData && event.emoji) {
        setInputValue(prev => prev + event.emoji);
    }
    };
    // Function to handle clicks outside the emoji picker
    // Close emoji picker when clicking outside
    useEffect(() => {
    if (!showEmojiPicker) return; // Don't add event listener if emoji picker is not shown

    const handleClickOutside = (event) => {
        if (
            emojiPickerRef.current && 
            !emojiPickerRef.current.contains(event.target) &&
            emojiButtonRef.current &&
            !emojiButtonRef.current.contains(event.target)
        ) {
            setShowEmojiPicker(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [showEmojiPicker]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <HeaderPage />
            <SideMenuPage />
            <Layout style={{width: "95%",marginLeft: "4%",marginTop: "1%"}}>
                <Sider width={300} theme="light" style={{ padding: '5px', borderRight: '1px solid #f0f0f0', height: '90vh', overflowY: "auto" }}>
                   {console.log(sortedFriendsList)}
                    <List
                        itemLayout="horizontal"
                        dataSource={sortedFriendsList}
                        renderItem={(item) => (
                            <List.Item
                                className="friend-list-item"
                                style={{
                                    backgroundColor: selectedUser?.email === item.email ? '#e6f7ff' : 'transparent',
                                    borderRadius: '5px',
                                    marginBottom: "3px",
                                    padding: "10px",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease",
                                }}
                                onClick={() => setSelectedUser(item)}
                            >
                                {/* <List.Item.Meta
                                    avatar={<Avatar src={item.profilePic} size={30} />}
                                    title={
                                        <Badge dot={item.active === 1} color={item.active ? 'green' : 'red'}>
                                            <Text strong>{item.name || item.email}</Text>
                                        </Badge>
                                    }
                                /> */}
                                <List.Item.Meta
    avatar={
        item.profilePic ? (
            <Avatar src={item.profilePic} size={30} />
        ) : (
            <Avatar
                size={30}
                style={{
                    backgroundColor: getColorFromString(item.name || item.email),
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
            >
                {(item.name || item.email || "?").charAt(0).toUpperCase()}
            </Avatar>
        )
    }
    title={
        <Badge dot={item.active === 1} color={item.active ? "green" : "red"}>
            <Text strong>{item.name || item.email}</Text>
        </Badge>
    }
/>
                            </List.Item>
                        )}
                    />
                </Sider>

                <Layout style={{ padding: '20px', background: '#fff' }}>
                    <Content>
                        {selectedUser ? (
                            <Card style={{ height: '88vh', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        
                                        {selectedUser.profilePic ? (
                                            <Avatar src={selectedUser.profilePic} size={60} style={{ marginRight: '10px' }}  />
                                        ) : (
                                            <Avatar
                                                size={60}
                                                style={{
                                                    backgroundColor: getColorFromString(selectedUser.name || selectedUser.email),
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    marginRight: '10px'
                                                }}
                                            >
                                                {(selectedUser.name || selectedUser.email || "?").charAt(0).toUpperCase()}
                                            </Avatar>
                                        )}
                                        <div>
                                            <Title level={4}>{selectedUser.name || selectedUser.email}</Title>
                                            <Text type="secondary">{selectedUser.active ? 'Online' : 'Offline'}</Text>
                                        </div>
                                    </div>
                                    <div>
                                        <Button icon={<MessageOutlined />} shape="circle" size="large" style={{ marginRight: '10px' }} />
                                        <Button icon={<PhoneOutlined />} onClick={() => setCallScreenVisible(true)} shape="circle" size="large" style={{ marginRight: '10px' }} />
                                        <Button icon={<VideoCameraOutlined />} shape="circle" size="large" style={{ marginRight: '10px' }} />
                                        <Button icon={<SettingOutlined />} shape="circle" size="large" />
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Title level={3} type="secondary">Start a conversation with {selectedUser.userName}</Title> */}
                                     <Content style={{ flex: 1, overflowY: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px',height:"70vh",marginTop:"1rem" }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
                                <Text strong>{msg.sender}:</Text> {msg.text}
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </Content>

                                </div>
                                {/* Chat Input */}
                                <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderTop: '1px solid #ddd' }}>
                                      <Button 
                ref={emojiButtonRef} 
                icon={<SmileOutlined />} 
                onClick={() => setShowEmojiPicker((prev) => !prev)} 
                style={{ marginRight: 10 }} 
            />
                       {showEmojiPicker && (
         <div ref={emojiPickerRef} style={{
                position: "absolute",
                bottom: "50px",
                left: "10px",
                zIndex: 1000,
                display: showEmojiPicker ? "block" : "none", // ✅ Always in DOM, just hidden
                background: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                padding: "5px"
            }}>
                <Picker onEmojiClick={handleEmojiClick} />
            </div>
    )}
                                    <Input
                                        placeholder="Type a message..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onPressEnter={sendMessage}
                                        style={{ flex: 1, marginRight: 10 }}
                                    />
                                    <Upload>
                                        <Button icon={<UploadOutlined />} style={{ marginRight: 10 }} />
                                    </Upload>
                                    <Button type="primary" icon={<SendOutlined />} onClick={sendMessage} />
                                </div>
                            </Card>
                        ) : (
                            <Card style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Title level={3} type="secondary">Select a friend to chat</Title>
                            </Card>
                        )}
                    </Content>
                </Layout>
                {isCallScreenVisible && <CallScreen callerEmail={selectedUser.email} />}
            </Layout>
        </Layout>
    );
}

export default ChatLayout;

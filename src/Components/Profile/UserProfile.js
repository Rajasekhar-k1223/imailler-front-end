import React from 'react';
import './UserProfile.css';  // You can customize this file for media queries.
import HeaderPage from '../Header/HeaderPage';
import SideMenuPage from '../SideMenu/SideMenuPage';

const UserProfile = () => {
    return (
        <>
        <HeaderPage />
        <SideMenuPage />
        <div className="container mt-5">
            <div className="row">
                {/* Left Panel - Profile Info */}
                <div className="col-lg-2 col-md-3 col-sm-12">
                <div className="list-group">
                        <a href="#overview" className="list-group-item list-group-item-action active">Overview</a>
                        <a href="#security" className="list-group-item list-group-item-action">Security Info</a>
                        <a href="#devices" className="list-group-item list-group-item-action">Devices</a>
                        <a href="#password" className="list-group-item list-group-item-action">Password</a>
                        <a href="#organizations" className="list-group-item list-group-item-action">Organizations</a>
                        <a href="#settings" className="list-group-item list-group-item-action">Settings & Privacy</a>
                        <a href="#signins" className="list-group-item list-group-item-action">My Sign-ins</a>
                    </div>
                    </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <img 
                                src="https://via.placeholder.com/150" 
                                alt="profile" 
                                className="rounded-circle mb-3"
                                width="150"
                            />
                            <h5 className="card-title">Rajasekhar Kanamaluri</h5>
                            <p className="text-muted">Lead Software Engineer</p>
                            <p className="text-muted">Tirupati</p>
                            <a href="mailto:rajasekhar@exafluence.com">rajasekhar@exafluence.com</a>
                            <p>9986619756</p>
                            <a href="#signout" className="btn btn-outline-primary mt-3">Sign out everywhere</a>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Overview Cards */}
                <div className="col-lg-7 col-md-5 col-sm-12">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Security Info</h5>
                                    <p className="card-text">Keep your verification methods and security info up to date.</p>
                                    <a href="#updateinfo" className="btn btn-outline-primary">Update Info</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Password</h5>
                                    <p className="card-text">Make your password stronger or change it if needed.</p>
                                    <a href="#changepassword" className="btn btn-outline-primary">Change Password</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Devices</h5>
                                    <p className="card-text">Manage your connected devices and review them.</p>
                                    <a href="#managedevices" className="btn btn-outline-primary">Manage Devices</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Organizations</h5>
                                    <p className="card-text">See all the organizations you're part of.</p>
                                    <a href="#manageorgs" className="btn btn-outline-primary">Manage Organizations</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body text-center">
                                    <h5 className="card-title">My Sign-ins</h5>
                                    <p className="card-text">Review recent sign-in activity.</p>
                                    <a href="#reviewsignins" className="btn btn-outline-primary">Review Activity</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserProfile;

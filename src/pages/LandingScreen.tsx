import React, {useState} from 'react';
import '../App.css'
import "../main.css";
import "../animation.css";
import DOCTOR_BACKGROUND from '../assets/doctor_background.webp';
import LOGO from '../assets/dams_logo.svg';
import LinkButton from "../components/LinkButton.tsx";
import Spinner from "../components/Spinner.tsx";
import {Route, Routes} from "react-router";
import ProtectedRoute from "../components/ProtectedRoute.tsx";

function LandingScreen() {
    return (
        <div style={{flex: 1, backgroundImage: `url(${DOCTOR_BACKGROUND})`, display: 'flex'}}>
            <div style={{
                flex: 1,
                backgroundColor: '#15579078',
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{flex: 2.5}}>
                    <Header/>
                </div>
                <div style={{flex: 7}}>
                    <Content/>
                </div>
                <span
                    style={{
                        flex: .5,
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}>A project by Avinash Kumar</span>
            </div>
        </div>
    )
}

function Header() {
    return (
        <div style={{display: 'flex', flex: 1, justifyContent: "space-between",}}>
            <div style={{
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center',
                gap: 10,
                color: "whitesmoke"
            }}>
                <img src={LOGO} height={60}></img>
                <h2 style={{color: "whitesmoke"}}>DAMS</h2>
                <span style={{textTransform: 'uppercase'}}>Simplify the appointmenting</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <LinkButton title={'Login'} onClick={() => alert("hi")}/>
                <LinkButton title={'Register'} onClick={() => null}/>
            </div>
        </div>
    )
}

function Content() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,}}>
            <h1 style={{color: 'white'}}>Avoid hassels & Delays</h1>
            <span style={{color: "whitesmoke"}}>How is health today, sounds not good</span>
            <button className="btn btn-primary">Make Appointment</button>

        </div>
    )
}

export default LandingScreen;
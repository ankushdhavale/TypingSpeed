import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    *{
        border-sizing:border-box;
    }
    body{
        background-color:${({theme})=>theme.background};
        color:${({theme})=>theme.textColor};
        transition:all 0.5s linear;
        margin:0;
        padding:0;
        // height:100vh;
        overflow-x:hidden;
    }
    
    .canvas{
        display:grid;
        min-height:90vh;
        grid-auto-flow:row;
        grid-template-row:auto 1fr auto;
        gap:0.5rem;
        padding:2rem;
        justify-content:center;
        align-items:center;
        text-align:center;
    }

    .type-box{
        display:block;
        max-width:1000px;
        height:180px;
        margin-left:auto;
        margin-right:auto;
        overflow:hidden;
    }

    .words{
        font-size:2rem;
        display:flex;
        flex-wrap:wrap;
        color:${({theme})=>theme.typeBoxText};
    }

    .word{
        margin:4px;
    }

    .upper-menu{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:2rem;
    }
    
    .modes{
        margin-right:30px;
        display:flex;
        gap:0.6rem;
    }

    .time-mode:hover{
        color:green;
        cursor:pointer;
    }

    .hidden-input{
        opacity:0;
    }

    .footer-menu{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    .socials-media{
        display:flex;
        gap:0.5rem;
        font-size:1.4rem;
    }
     .socials-media a{
        color:${({theme})=>theme.textColor};
     }
    select{
        background-color:#1b263b;
        color:white;
        padding:3px 0px;
        padding-right:25px;
        padding-left:5px;
        border-radius:4px;
        border:1px solid #61a5c2;
    }

    .current{
        border-left:1px solid;
        animation:blinking ease 2s infinite;
    }

    .current-right{
        border-right:1px solid;
        animation:blinkingRight ease 2s infinite;
    }

    @keyframes blinkingRight{
        0% {border-right-color:white;}
        25% {border-right-color:black;}
        50% {border-right-color:white;}
        75% {border-right-color:black;} 
        100% {border-right-color:white;}
    }

    @keyframes blinking{
        0% {border-left-color:white;}
        25% {border-left-color:black;}
        50% {border-left-color:white;}
        75% {border-left-color:black;} 
        100% {border-left-color:white;}
    }

    .correct{
        color:green;
    }

    .incorrect{
        color:red;
    }

    .stats-box{
        display:flex;
        gap:4rem;
        width:1000px;
        justify-content:center;
        align-items:center;
    }

    .left-stats{
        width:20%;
    }

    .right-stats{
        width:60%;
    }

    .header{
        width:1000px;
        display:flex;
        justify-content:space-between;
        background-color:${({theme})=>theme.upperMenuBox};
        box-shadow:1px 10px 100px ${({theme})=>theme.upperMenuBox};
        z-index:1;
        padding:0.5rem 3rem;
        border-radius:5px;
        align-items:center;
        color:black;
    }

    .user-icons{
        font-size:1.5rem;
        display:flex;
        justify-content:center;
        align-items:center;
        color:${({theme})=>theme.textColor};
    }

    .MdAccountCircle{
        cursor:pointer;
    }

    .blockDisplayUpperMenu{
        display:none;
    }

    .logout{
        cursor:pointer;
        margin-left:0.5rem;
    }

    .user-profile{
        width:1000px;
        margin:auto;
        display:flex;
        height:15rem;
        background-color:${({theme})=>theme.upperMenuBox};
        border-radius:20px;
        justify-content:center;
        align-items:center;
        padding:1rem;
        margin-bottom:1rem;
    }

    .user{
        width:50%;
        display:flex;
        margin-top:30px;
        margin-bottom:30px;
        font-size:1.5rem;
        padding:1rem;
    }

    .info-user{
        width:60%;
        padding:1rem;
        margin-top:1rem;
        border-right:4px solid;
    }

    .picture{
        width:40%;
    }

    .total-tests{
        width:50%;
        font-size:3rem;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    .table ,graph-user-page{
        margin:auto;
        width:1000px;
    }

    .center-of-screen{
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
    }

    .homeBtn{
        background-color:${({theme})=>theme.upperMenuBox};
        padding:4px 10px;
        color:${({theme})=>theme.textColor};
        font-size:1.4rem;
        border-radius:3px;
        margin-bottom:2rem;
        display:flex;
        justify-content:start;
        text-decoration:none;
        width:70px
    }

    .googleBtn{
        display:flex;
        align-items:center;
        justify-content:center;
        width:100%;
        margin-top:5px;
    }

    .logo{
        font-size:1.4rem;
        color:${({ theme }) => theme.textColor};
        font-weight:600;
        font-family:'Fira Code', monospace;
    }

`
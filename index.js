import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Comments from './comments'
import Comment from './comment'
import _ from 'lodash'
import {FbAppDB} from './firebaseSetup'
import {fadeInUp, shake} from 'react-animations'
import { StyleSheet, css } from 'aphrodite'
//import Transition from 'react-transition-group/Transition'
const commentsDB = FbAppDB.ref('comments')
//const  messagesRef = FBApp.ref("messages/");


ReactDOM.render(<Comments />, document.getElementById('app'));
//ReactDOM.render(<Comment />, document.getElementById('app'));
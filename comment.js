import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import _ from 'lodash'
import {FbAppDB} from './firebaseSetup'
import {fadeInUp, shake} from 'react-animations'
import { StyleSheet, css } from 'aphrodite'
import './style.scss'

export default class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment: this.props.comment || 'Nopes.',
            hello: 'world',
            visualState: '--empty',
        }
    }
    componentWillMount = () => {
        
        
        /*
		console.log('Comment componentWillMount')
        */
        setTimeout(()=>{
            //console.log('Comment componentDidMount')
			//
        }, 500)
	}
	componentDidMount = () => {
        console.log('Comment componentDidMount')
        
		
        this.setState({visualState:''})
		setTimeout(()=>{
            //console.log('Comment componentDidMount')
			
            console.log('visualState = ', this.state.visualState)
        }, 1500)
        
	}
	componentWillUnMount = () => {
		//console.log('Comment componentWillUnMount')
		setTimeout(()=>{
			//this.setState({visualState:'--exit'})
		}, 2500)
    }
    /*
	shouldComponentUpdate = (newprops) => {
        //console.log('Comment shouldComponentUpdate newprops.comment = ', newprops.comment)
        //console.log('Comment shouldComponentUpdate this.state.comment = ', this.state.comment)
		if(this.state.comment !== newprops.comment){
			console.log('component\'s data was updated! new props = ', newprops.comment)
			//console.log('visualState is new = ', this.state.visualState)
			//this.setState({visualState: 'comment--updated'})
			return true
		} else {
			//console.log('visualState is NOT new, no need to do any re-rendering.')
			return false
		}
    }
    */
    componentWillReceiveProps = (newProps) => {
        //console.log('Comment componentWillReceiveProps newProps.comment = ', newProps.comment)
        //console.log('Comment componentWillReceiveProps this.state.comment = ', this.state.comment)
        if(newProps.comment !== this.state.comment){
            console.log('componentWillReceiveProps newProps is new = ', newProps.comment)
            setTimeout(()=>{
                console.log('Comment componentWillReceiveProps --edited')
                this.setState({visualState: '--edited'})
            }, 500)
        } else {
            //console.log('componentWillReceiveProps newProps is not new = ', newProps.comment)
        }
        
        
    }

    render = () => {
        //console.log('Comment render')
        return (
			<div className={'comment'+this.state.visualState}>
				UserImage UserName Time {this.state.visualState}
				<p>{this.props.comment}</p>
			</div>
		)
    }
}
/*
const comment = StyleSheet.create({
    comment: {
        
        '--empty': {
            animationName: fadeInUp,
            animationDuration: '1s',
            backgroundColor: 'tan',
            ':hover': {
                backgroundColor: 'pink',
                animation: `tada'1s'`
            },
        },
        '--enters': {

        },
        '--exists': {
            backgroundColor: 'green'
        },
        '--exit':{
            backgroundColor: 'red'
        }
        
    },
    fadeInUp: {
		animationName: fadeInUp,
		animationDuration: '1s'
    },

})

const redAnimStyle = StyleSheet.create({
	
})



const styles = StyleSheet.create({
	list: {
		listStyle:'none',
		borderRadius: '10px',
		border: '2px',
		borderColor: 'tomato',
		color:'white',
		margin: '10px',
		padding: '10px',
		animationName: fadeInUp,
		animationDuration: '1s',
		transitionProperty: 'all',
		
	},
	fadeInUp: {
		animationName: fadeInUp,
		animationDuration: '1s'
	},
	shake: {
		animation: 'shake 1s',
    }
})
*/

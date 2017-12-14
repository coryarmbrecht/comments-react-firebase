import React, {Component} from 'react'
import ReactDOM from 'react-dom';
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
		console.log('RedAnimTest componentWillMount')
		setTimeout(()=>{
            console.log('RedAnimTest componentWillMount --enter')
			this.setState({visualState: '--entering'})
		}, 500)
	}
	componentDidMount = () => {
		console.log('RedAnimTest componentDidMount')
		setTimeout(()=>{
            console.log('RedAnimTest componentDidMount')
			this.setState({visualState:''})
		}, 1500)
	}
	componentWillUnMount = () => {
		console.log('RedAnimTest componentWillUnMount')
		setTimeout(()=>{
			this.setState({visualState:'--exit'})
		}, 2500)
	}
	shouldComponentUpdate = (newprops) => {
		
		if(!this.state.comment == newprops){
			console.log('component\'s data was updated! new props = ', newprops)
			console.log('visualState is new = ', this.state.visualState)
			this.setState({visualState: 'comment--updated'})
			return false
		} else {
			console.log('visualState is NOT new, no need to do any re-rendering.')
			return true
		}
    }
    componentWillReceiveProps = (newProps) => {
        if(newProps !== this.state.comment){
            console.log('componentWillReceiveProps newProps is new = ', newProps)
        } else {
            console.log('componentWillReceiveProps newProps is not new = ', newProps)
        }
        
        
    }
    render = () => {
        console.log('Comment render')
        return (
			<div className={'comment'+this.state.visualState}>
				UserImage UserName Time {this.state.visualState}
				<p>{this.props.comment}</p>
			</div>
		)
    }
}

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


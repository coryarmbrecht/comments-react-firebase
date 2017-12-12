import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import {FbAppDB} from './firebaseSetup'
import {fadeInUp, shake} from 'react-animations'
import { StyleSheet, css } from 'aphrodite'

export default class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment: this.props.comment || 'Nopes.',
            hello: 'world'
        }
	}
	shouldComponentUpdate = (newprops) => {
		
		if(!this.state.comment == newprops){
			console.log('component\'s data was updated! new props = ', newprops)
			console.log('visualState is new = ', this.state.visualState)
			this.setState({visualState: '-updated'})
			return false
		} else {
			console.log('visualState is NOT new, no need to do any re-rendering.')
			return true
		}
	}
    render = () => {
        console.log('Comment render')
        return (
			<div className={css([styles.shake,styles.comment])}>
				UserImage UserName Time
				<p>{this.props.comment}</p>
			</div>
		)
    }
}

const styles = StyleSheet.create({
    comment: {
        animationName: fadeInUp,
    },
	list: {
		listStyle:'none',
		backgroundColor:'silver',
		borderRadius: '10px',
		border: '2px',
		borderColor: 'tomato',
		color:'white',
		margin: '10px',
		padding: '10px',
		animationName: fadeInUp,
		animationDuration: '1s',
		transitionProperty: 'all',
		/*
		':hover': {
			animationName: shake
		}
		*/
	},
	fadeInUp: {
		animationName: fadeInUp,
		animationDuration: '1s'
	},
	shake: {
		animation: 'shake 1s',
		':hover': {
			backgroundColor: 'pink',
			animation: 'tada 1s'
		}
	}
})
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import {FbAppDB} from './firebaseSetup'
import {fadeInUp, shake} from 'react-animations'
import { StyleSheet, css } from 'aphrodite'
//import Transition from 'react-transition-group/Transition'
const commentsDB = FbAppDB.ref('comments')
//const  messagesRef = FBApp.ref("messages/");


export default class Comments extends Component{
	constructor(props){
		super(props)
		this.state = {
			loaded: false,
			newComment: 'New Comment',
			store: {},
			comment: 'New Comment',
			comments: [{comment:"Change this page..."}, {comment:"Add this feature..."}, {comment:"You have a bug that..."}],
			commentsRef: commentsDB,
			theme: null,
			toggled: false,
		}
		//this.state = {
	}
	componentWillMount = () => {
		console.log('componentWillMount this.state = ', this.state)
		//this.setState({comments:this.retrievedComments})
		
		let retrievedTopComments = this.state.commentsRef.on("value", (snapshot) => {
		   
		  //console.log('retirevedComments snapshot = ', snapshot.val());
		   
		   const snapshotComments = _.values(snapshot.val());
		  console.log('snapshotComments = ', snapshotComments)
		  console.log('loaded:true')
		   //let snapshotCommentsArray = Object.keys(snapshotComments);
		  //console.log('snapshotCommentsArray = ', snapshotCommentsArray)
		   this.setState({comments: _.reverse(snapshotComments),loaded:true})
		   
		}, function (error) {
		  //console.log("Error: " + error.code);
		});
		
    }
    onBlur = (event) => {
        console.log('onBlur event.target.value = ', event.target.value)
        this.setState({newComment: event.target.value})
    }
	suggest = () => {
		console.log('suggested')
		console.log('newComment = ', this.state.newComment)
		let newCommentKey = this.state.commentsRef.push().key;

		this.state.commentsRef.child(newCommentKey).update({
			comment: this.state.newComment
		})
	}
	componentWillUnmount = () => {
		this.state.commentsRef.off("value", (offval)=>{console.log('componentWillUnmount = ', offval)})
	}
	shouldComponentUpdate = (newprops) => {
		console.log('Comments shouldComponentUpdate, newprops = ', newprops)
		if(this.state.loaded === true){
			
			return false
		}
		return true
		
	}
	render = () => {
		console.log('comments render this.state =', this.state)
		return (
			<div styles={{height:'100%', backgroundColor:'coral',}}>
				<h2 styles={{
					color: 'white',
					fontSize: 20,
					textAlign: 'center',
					margin: .2,
				}}>Comments</h2>
				{/*
				<Transition
					transitionName="listAnim"
					transitionEnterTimeout={1500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={1000}
				>
				<div styles={{alignSelf:'center', backgroundColor:'white','overflowY':'scroll'}}>
                    {
                        this.state.comments.map((comment, index) => {
                            //console.log('comment = ', comment)
                            return <li key={index} ><Comment comment={comment.comment}  /></li>
                        })
                    }
				</div>
				</Transition>
				*/}
				<div className={css(styles.list)} styles={{alignSelf:'center','overflowY':'scroll'}}>
					{
						this.state.comments.map((comment, index) => {
							//console.log('comment = ', comment)
							return <li key={index} ><Comment comment={comment.comment}  /></li>
						})
					}
				</div>
                <div>
                    <label htmlFor="name">Name:</label>
					<input id="name" type="text" onBlur={this.onBlur} placeholder="Enter your comment here..." />
					<button onClick={this.suggest} title="Submit">Submit Comment</button>
					<RedAnimTester /><GreenAnimTester />
				</div>
			</div>
		)
	}
	
}

const redAnimStyle = StyleSheet.create({
	'empty': {
		backgroundColor:'yellow',
	},
	'exists': {
		backgroundColor: 'green'
	},
	'exit':{
		backgroundColor: 'red'
	}
})

class RedAnimTester extends Component {
	constructor(props){
		super(props)
		this.state = {
			visualState: 'empty',
		}
	}
	componentWillMount = () => {
		console.log('RedAnimTest componentWillMount')
		setTimeout(()=>{
			this.setState({visualState: 'enter'})
		}, 1500)
	}
	componentDidMount = () => {
		console.log('RedAnimTest componentDidMount')
		setTimeout(()=>{
			this.setState({visualState:'exists'})
		}, 1500)
	}
	componentWillUnMount = () => {
		console.log('RedAnimTest componentWillUnMount')
		setTimeout(()=>{
			this.setState({visualState:'exit'})
		}, 1500)
	}
	render = () => {
		return (
			<div className={this.state.visualState}>
				Divvvvvv state={this.state.visualState}
			</div>
		)
	}
}


class GreenAnimTester extends Component {
	constructor(props){
		super(props)
		this.state = {
			visualState: '',
		}
	}
	componentWillMount = () => {
		console.log('GreenAnimTest componentWillMount')
		setTimeout(()=>{
			this.setState({visualState: '-enter'})
		}, 500)
	} 
	componentDidMount = () => {
		console.log('GreenAnimTest componentDidMount')
		setTimeout(()=>{
			this.setState({visualState:'-exist'})
		}, 2500)
	}
	
	componentWillUnMount = () => {
		console.log('GreenAnimTest componentWillUnMount')
		setTimeout(()=>{
			this.setState({visualState:'-exit'})
		}, 200)
	}
	render = () => {
		//const currentStateStyle = `greenAnimStyle.${this.state.visualState}`
		return (
			<div className={"greenAnimStyle" + this.state.visualState}>
				Divvvvvv state={this.state.visualState}
			</div>
		)
	}
}






const listAnimStyle = StyleSheet.create({
	'listAnim-enter':{
		opacity: 0
	},
	'listAnim-enter-active':{
		animationName: fadeInUp,
		animationDuration: '1s',
		transitionProperty: 'all'
	},
	'listAnim-leave':{
		
	},
	'listAnim-leave-active':{
		
	}
})
export class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment: this.props.comment,
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
			<div className={css(styles.shake)}>
				UserImage UserName Time
				<p>{this.props.comment}</p>
			</div>
		)
    }
}

const styles = StyleSheet.create({
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
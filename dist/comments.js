'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _timeago = require('timeago.js');

var _timeago2 = _interopRequireDefault(_timeago);

var _firebaseSetup = require('./firebaseSetup');

var _reactAnimations = require('react-animations');

var _aphrodite = require('aphrodite');

require('./style.scss');

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { CSSTransition } from 'react-transition-group/CSSTransition'


//import Transition from 'react-transition-group/Transition'
var commentsDB = _firebaseSetup.FbAppDB.ref('comments');

//const  messagesRef = FBApp.ref("messages/");

var Comments = function (_Component) {
	_inherits(Comments, _Component);

	function Comments(props) {
		_classCallCheck(this, Comments);

		var _this = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

		_this.componentWillMount = function () {
			console.log('componentWillMount this.state = ', _this.state);
			//this.setState({comments:this.retrievedComments})

			var retrievedTopComments = _this.state.commentsRef.on("value", function (snapshot) {

				//console.log('retirevedComments snapshot = ', snapshot.val());

				var snapshotComments = _lodash2.default.values(snapshot.val());
				//console.log('snapshotComments = ', snapshotComments)
				var snapshotCommentsKeys = _lodash2.default.keys(snapshot.val());
				//console.log('snapshotCommentsKeys = ', snapshotCommentsKeys)
				console.log('loaded:true');
				//let snapshotCommentsArray = Object.keys(snapshotComments);
				//console.log('snapshotCommentsArray = ', snapshotCommentsArray)
				_this.setState({ comments: _lodash2.default.reverse(snapshotComments), loaded: true });
			}, function (error) {
				//console.log("Error: " + error.code);
			});
		};

		_this.onBlur = function (event) {
			console.log('onBlur event.target.value = ', event.target.value);
			_this.setState({ newComment: event.target.value });
		};

		_this.suggest = function () {
			console.log('suggested');
			console.log('newComment = ', _this.state.newComment);
			var newCommentKey = _this.state.commentsRef.push().key;

			_this.state.commentsRef.child(newCommentKey).update({
				comment: _this.state.newComment,
				ts: _moment2.default.now(),
				uid: newCommentKey
			});
		};

		_this.componentWillUnmount = function () {
			_this.state.commentsRef.off("value", function (offval) {
				console.log('componentWillUnmount = ', offval);
			});
		};

		_this.componentWillReceiveProps = function (newProps) {
			console.log('Comments shouldComponentUpdate, newprops = ', newprops);
		};

		_this.render = function () {
			console.log('comments render this.state =', _this.state);
			return _react2.default.createElement(
				'div',
				{ styles: { height: '100%', backgroundColor: 'coral' } },
				_react2.default.createElement(
					'h2',
					{ styles: {
							color: 'white',
							fontSize: 20,
							textAlign: 'center',
							margin: .2
						} },
					'Comments'
				),
				_react2.default.createElement(
					'div',
					{ className: (0, _aphrodite.css)(styles.list), styles: { alignSelf: 'center', 'overflowY': 'scroll' } },
					_react2.default.createElement(
						_reactAddonsCssTransitionGroup2.default,
						{
							transitionName: 'fadr',
							transitionEnterTimeout: 3000,
							transitionLeaveTimeout: 1000,
							transitionAppear: true,
							transitionAppearTimeout: 1000

						},
						_this.state.comments.map(function (comment) {
							console.log('comment = ', comment);
							return _react2.default.createElement(
								'li',
								{ key: comment.uid },
								_react2.default.createElement(_comment2.default, { comment: comment.comment })
							);
						})
					)
				),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'label',
						{ htmlFor: 'name' },
						'Name:'
					),
					_react2.default.createElement('input', { id: 'name', type: 'text', onBlur: _this.onBlur, placeholder: 'Enter your comment here...' }),
					_react2.default.createElement(
						'button',
						{ onClick: _this.suggest, title: 'Submit' },
						'Submit Comment'
					)
				)
			);
		};

		_this.state = {
			loaded: false,
			newComment: 'New Comment',
			store: {},
			comment: 'New Comment',
			comments: [{ comment: "Change this page...", uid: '159djb' }, { comment: "Add this feature...", uid: '45adb' }, { comment: "You have a bug that...", uid: 'z5djb' }],
			commentsRef: commentsDB,
			theme: null,
			toggled: false
		};
		return _this;
	}
	/*
 shouldComponentUpdate = (newprops) => {
 console.log('Comments shouldComponentUpdate, newprops = ', newprops)
 if(this.state.loaded === true){
 			return false
 }
 return true
    }
 */


	return Comments;
}(_react.Component);

exports.default = Comments;

var styles = _aphrodite.StyleSheet.create({
	list: {
		listStyle: 'none',
		backgroundColor: 'silver',
		borderRadius: '10px',
		border: '2px',
		borderColor: 'tomato',
		color: 'white',
		margin: '10px',
		padding: '10px',
		height: '250px',
		// Make this a different
		//animationName: fadeInUp,
		animationDuration: '1s',
		transitionProperty: 'all',
		overflowY: 'scroll'
		/*
  ':hover': {
  	animationName: shake
  }
  */
	},
	fadeInUp: {
		animationName: _reactAnimations.fadeInUp,
		animationDuration: '1s'
	},
	shake: {
		animation: 'shake 1s'

	}

});

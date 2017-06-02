var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Login = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        var users = [
                    {
                        number: '7073232208',
                        password: 'ankit123'
                    },
                    {
                        number: '9935166950',
                        password: 'deepak'
                    }
                ] 
        if(localStorage.getItem('registeredUsers') == null) {
           localStorage.setItem('registeredUsers', JSON.stringify(users)); 
        }
    },
    register: function(event) {
        event.preventDefault();
        console.log('Submitted');
        
        var registeringUser = {
            number: this.refs.rnumber.value,
            password: this.refs.rpassword.value
        }
        var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
            registeredUsers.push(registeringUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
       
        this.history.pushState(null, '/chatlist/' + registeringUser.number );
    },
    login: function(event) {
        event.preventDefault();
        var that = this;
        var loggingUser = {
            number: this.refs.lnumber.value,
            password: this.refs.lpassword.value
        }
        var logUser = JSON.parse(localStorage.getItem('registeredUsers'));
        logUser.forEach(function(item, index) {
            if(item.number == loggingUser.number && item.password == loggingUser.password) {
                that.history.pushState(null, '/chatlist/' + loggingUser.number );
            }
            
        });
        
    },
    render: function () {
        return (
            <div>
              <h1>Login</h1>
              <form className="store-selector" onSubmit={this.register}>
                <h2>Register</h2>
                <input type="number" ref="rnumber" placeholder="Enter phone number" required />
                <input type="password" ref="rpassword" placeholder="Enter Password"  required />
                <input type="Submit" />
              </form>
              <form className="store-selector" onSubmit={this.login}>
                <h2>Login</h2>
                <input type="number" ref="lnumber"  placeholder="Enter phone number" required />
                <input type="password" ref="lpassword" placeholder="Enter Password" required />
                <input type="Submit" />
              </form>
            </div>
        )
    }
});

var ChatList = React.createClass({
    
    mixins: [History],
    getInitialState: function() {
        return {
            users: JSON.parse(localStorage.getItem('registeredUsers')),
        }
    },
    go: function(receiver) {
        this.history.pushState(null, '/chatroom/' + receiver + '/'+this.props.params.number);
    },
//    componentDidMount: function() {
//        this.numbers = JSON.parse(localStorage.getItem('registeredUsers'));
//    },
    render: function () {
     var that = this;
     var props = this.props.params.number
     return (
         <ul>
         {
             this.state.users.map(function(item, index) {
                if(item.number != props) {
                    return <li key={index} onClick={() => that.go(item.number)}>{item.number}</li>
                }
                    
            })
         }
            
         </ul>
         
        )
    }
});

var NotFound = React.createClass({
    
    render: function () {
     return (
            <div>
                <h1>Not Found</h1>
            </div>
        )
    }
    
});

var Chat = React.createClass({
    sendMessage: function(event) {
        event.preventDefault();
        var qwe = JSON.parse(localStorage.getItem('objectsave'));
        console.log(this.ind);
        qwe[this.ind].messages.push(this.refs.mess.value);
        console.log(qwe[this.ind].messages);
        localStorage.setItem('objectsave', JSON.stringify(qwe));
        this.messages = JSON.parse(localStorage.getItem('objectsave'))[this.ind].messages;
        console.log(this.receivedMessages);
        this.refs.mess.value = '';
    },
    render: function () {
       var that = this;
       var senderNumber = this.props.params.receiverNumber;
       var receiverNumber = this.props.params.senderNumber;
       var matchingNumber = parseInt(senderNumber) + parseInt(receiverNumber);
       that.receivedMessages;
        if(JSON.parse(localStorage.getItem('uniqueNumber')) == null) {
            localStorage.setItem('uniqueNumber', matchingNumber);
            console.log(JSON.parse(localStorage.getItem('uniqueNumber')));
        } else if(matchingNumber != JSON.parse(localStorage.getItem('uniqueNumber'))) {
            var objectsave = [];
            objectsave.push({
                 unique: matchingNumber,
                 phoneNumber: senderNumber,
                 messages: []
            });
            localStorage.setItem('objectsave', JSON.stringify(objectsave));
        } else if(matchingNumber == JSON.parse(localStorage.getItem('uniqueNumber'))) {
            if(JSON.parse(localStorage.getItem('count') == null)) {
               var t = JSON.parse(localStorage.getItem('objectsave'));
               t.push({
                  unique: matchingNumber,
                  phoneNumber: senderNumber,
                  messages: [] 
               });
              
               localStorage.setItem('objectsave', JSON.stringify(t)); 
                let count = 1;
                
                localStorage.setItem('count', JSON.stringify(count));  
            }
        }
        that.messages = [];
        var user = {
            message: ''
        } 
        
        localStorage.setItem('message', JSON.stringify({
            unique: matchingNumber,
            phnNumber: senderNumber,
            messages: []
        })); 
        
        that.ind;
        
        if(JSON.parse(localStorage.getItem('objectsave')) == null) {
            console.log('if');
            var abcde = [];
            localStorage.setItem('objectsave', JSON.stringify(abcde));
            abcde.push({
                 unique: matchingNumber,
                 phoneNumber: senderNumber,
                 messages: []
             });
            localStorage.setItem('objectsave', JSON.stringify(abcde));
            abcde = JSON.parse(localStorage.getItem('objectsave'));
            abcde.forEach(function(item, index) {
                
                if(item.unique == matchingNumber && item.phoneNumber == receiverNumber) {
                    console.log('if if 1');
                    if(item.messages != undefined) {
                        that.receivedMessages = item.messages;
                    }
                }
                if(item.unique == matchingNumber && item.phoneNumber == senderNumber) {
                    console.log('if if 2');
                    that.ind = index;
                } else if(item.unique == matchingNumber && item.phoneNumber != senderNumber && item.phoneNumber != receiverNumber) {
                    console.log('if else 1');
                    that.ind = JSON.parse(localStorage.getItem('objectsave')).length;
                    var qwerty = JSON.parse(localStorage.getItem('objectsave'));
                    qwerty.push({
                         unique: matchingNumber,
                         phoneNumber: senderNumber,
                         messages: []
                     });
                    localStorage.setItem('objectsave', JSON.stringify(qwerty));
                }
            });
        } else {
             console.log('else');
             var poiuy = JSON.parse(localStorage.getItem('objectsave'));
             
             poiuy.forEach(function(item, index) {
                if(item.unique == matchingNumber && item.phoneNumber == receiverNumber) {
                    if(item.messages != undefined) {
                        that.receivedMessages = item.messages;
                    }
                }
                if(item.unique == matchingNumber && item.phoneNumber == senderNumber) {
                    console.log('else if');
                    if(item.messages != undefined) {
                       that.messages = item.messages; 
                    }
                    that.ind = index;
                }
                else if(item.unique == matchingNumber && item.phoneNumber != senderNumber && item.phoneNumber != receiverNumber) {
                    console.log('else else if');
                    that.ind = JSON.parse(localStorage.getItem('objectsave')).length;
                    var qwert = JSON.parse(localStorage.getItem('objectsave'));
                    qwert.push({
                         unique: matchingNumber,
                         phoneNumber: senderNumber,
                         messages: []
                     });
                    localStorage.setItem('objectsave', JSON.stringify(qwert));
                }
             });
            
             
        }
     return (
            <div>
                <h1>Chat with me</h1>
                <form className="store-selector" onSubmit={this.sendMessage}>
                    <h2>Send</h2>
                    <input type="text" ref="mess"  placeholder="Send Message" required />
                    <input type="Submit" />
                </form>
                <h1> sent messages </h1>
                {
                    that.messages.map(function(item, index){
                        return <li key={index}>{item}</li>;
                    })
                }
                <h1> Received messages: </h1>
                {
    
                    that.receivedMessages != undefined ? that.receivedMessages.map(function(item, index){
                        return <li key={index}>{item}</li>;
                    }): ''

                }
                
            </div>
        )
    }
});

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Login}/>
    <Route path="/chatlist/:number" component={ChatList}/>
    <Route path="/chatroom/:senderNumber/:receiverNumber" component={Chat}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById("main"));
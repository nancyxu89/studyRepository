import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {App, Header, Login, Hello, List} from "./components.js";
import {Provider} from "mobx-react";
import stores from "../stores";

// import {observable, computed, autorun, action, map, extendObservable} from "mobx";

// const routeConfig = {
//     path: '/',
//     component: withRouter(App),
//     indexRoute: {component: withRouter(Login)},
//     childRoutes: [
//         {path: 'counter', component: withRouter(Hello)},
//         {path: 'welcome', component: withRouter(Hello)},
//         {path: '404', component: withRouter(Hello)},
//         {path: 'chartInbox', component: withRouter(Hello)},
//         {path: 'inputMain', component: withRouter(Hello)},
//         {
//             path: 'inbox', component: withRouter(Hello),
//             childRoutes: [
//                 {path: '/messages/:id', component: withRouter(Hello)},
//                 {
//                     path: 'messages/:id',
//                     onEnter: function (nextState, replaceState) {
//                         replaceState(null, '/messages/' + nextState.params.id)
//                     }
//                 }
//             ]
//         }
//     ]
// }

class ROOT extends Component {
    render() {
        return (
            <Provider stores={stores}>
                <Router>
                    <div>
                        <Header></Header>
                        <Switch>
                            <Route exact path="/" component={ App }></Route>
                            <Route path="/home" component={ App }></Route>
                            <Route path="/hello/:id" component={ Hello }></Route>
                            <Route path="/list" component={ List }></Route>
                            <Route path="/login" component={ Login }></Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default ROOT
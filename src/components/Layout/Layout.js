import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sidedrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sidedrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){

        return(
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sidedrawerToggleHandler} />
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sidedrawerClosedHandler} />
                <main className="content">
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;
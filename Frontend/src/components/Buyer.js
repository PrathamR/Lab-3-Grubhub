import React from 'react';
import { Switch, Route ,Link} from 'react-router-dom';
import BuyerLogin from './BuyerLogin';
import BuyerHome from './BuyerHome';
import BuyerSignup from './BuyerSignup';
import BuyerAccount from './BuyerAccount';

import BuyerSearch from './BuyerSearch';

class Buyer extends React.Component{
    
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/buyer/login" component={BuyerLogin}/>
                    <Route path="/buyer/home" component={BuyerHome}/>
                    <Route path="/buyer/signup" component={BuyerSignup}/>
                    <Route path="/buyer/account/:id" component={BuyerAccount}/>
                    <Route path="/buyer/search/:menuItem" component={BuyerSearch}/>
                    <Route path="/buyer/search/" component={BuyerSearch}/>

                </Switch>
            </div>
            )
    }
}

export default Buyer
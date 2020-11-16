import React, {useEffect} from 'react';
import 'antd/dist/antd.css'
import './App.css';
import {MainPage} from './components/MainPage/MainPage';
import {Route, Switch} from 'react-router-dom';
import {Pokemon} from './components/Pokemon/Pokemon';
import {useDispatch, useSelector} from 'react-redux';
import {AppInitialStateType, InitializeApp} from './Redux/AppReducer';
import {routes} from './Common/routes';
import {Header} from './components/Header/Header';
import {AppStateType} from './Redux/Store';
import {Preloader} from './Common/Preloader';
import {Error404} from './Common/Error404Page';
import {NativeFooter} from './components/Footer/Footer';

function App() {

    const appProps = useSelector<AppStateType, AppInitialStateType>(state => state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(InitializeApp())
    }, [dispatch])

    return <div className='app'>
        <div className="headerWrapper">
            <Header/>
        </div>
        <div className="appWrapper">
            {!appProps.isInitialise
                ? <Preloader/>
                : appProps.Error
                    ? <Error404 message={appProps.Error}/>
                    :
                    <div className='contentWrapper'>
                        <Switch>
                            <Route exact path={routes.default}
                                   render={() => <MainPage/>}/>
                            <Route exact path={routes.mainPage}
                                   render={() => <MainPage/>}/>
                            <Route exact path={routes.pokemon}
                                   render={() => <Pokemon/>}/>
                            <Route path={routes.notfound}
                                   render={() => <div>ERROR 404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
            }
        </div>
        <div className='footer'>
            <NativeFooter/>
        </div>
    </div>
}

export default App;

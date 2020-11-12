import React, {useEffect} from 'react';
import 'antd/dist/antd.css'
import './App.css';
import {Breadcrumb, Button, Layout, Menu} from "antd";
import {MainPage} from "./components/MainPage/MainPage";
import {Link, Route, Switch, useLocation} from "react-router-dom";
import {Pokemon} from "./components/Pokemon/Pokemon";
import {useDispatch} from "react-redux";
import {InitializeApp} from "./Redux/AppReducer";
import {routeLinks, routes} from './Common/routes';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

function App() {

    // const appProps = useSelector<AppStateType>(state => state.app)

    const url = useLocation()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(InitializeApp())
    }, [dispatch])

    return <div>
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[`${url.pathname === "/mainPage"||url.pathname === "/"
                        ? "/mainPage" : "/Pokemon/"}`]}
                >
                    <Menu.Item key="/mainPage"><Link to={routeLinks.mainPage}/>Main Page</Menu.Item>
                    <Menu.Item key="/Pokemon/"><Link to={routeLinks.defaultPokemon}/>Pokemon page</Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Content style={{padding: '0 5px', minHeight: 280}}>
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
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </div>
}

export default App;

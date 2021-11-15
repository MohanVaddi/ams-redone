import { Container } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { AdminHome } from './pages/AdminHome';
import { FacultyHome } from './pages/FacultyHome';
import { FacultyUpdate } from './pages/FacultyUpdate';
import { Login } from './pages/Login';
import { StudentHome } from './pages/StudentHome';

interface AppProps {}
export const App: React.FC<AppProps> = () => {
    const GlobalStyles = css`
        /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
        .js-focus-visible :focus:not([data-focus-visible-added]) {
            outline: none;
            box-shadow: none;
        }
    `;
    return (
        <Fragment>
            <Global styles={GlobalStyles} />
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Layout>
                    <Container maxW='container.xl' p={0}>
                        <Route path='/facultyHome'>
                            <FacultyHome />
                        </Route>
                        <Route path='/facultyUpdate'>
                            <FacultyUpdate />
                        </Route>
                        <Route path='/studentHome'>
                            <StudentHome />
                        </Route>
                        <Route path='/adminHome'>
                            <AdminHome />
                        </Route>
                    </Container>
                </Layout>
            </Switch>
        </Fragment>
    );
};

export default App;

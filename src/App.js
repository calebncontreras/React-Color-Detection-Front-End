import React from 'react'
// import Clarifai from 'clarifai'
import Particles from 'react-particles-js'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import ImageInputForm from './components/ImageInputForm/ImageInputForm'
import ColorDetection from './components/ColorDetection/ColorDetection'
import SignIn from './components/page components/SignIn/SignIn'
import Register from './components/page components/Register/Register'
import Footer from './components/Footer/Footer'
import Rank from './components/Rank/Rank'

import './App.css'

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
}

const initialState = {
    input: '',
    imageURL: '',
    colors: [],
    detectSuccess: false,
    isSignedIn: false,
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    },
}

class App extends React.Component {
    constructor() {
        super()
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        })
    }

    onInputChange = (event) => this.setState({ input: event.target.value })

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ initialState })
            this.setState({ isSignedIn: false })
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route })
    }

    onSubmitForm = () => {
        this.setState({ imageURL: this.state.input })
        // .predict(Clarifai.COLOR_MODEL, this.state.input)
        console.log(this.state.imageURL)
        fetch('http://localhost:3000/image', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.user.id,
                image: this.state.imageURL,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.extractColorData(data)
                this.setState({ loaded: true })
                this.onColorDetectSuccess()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    IncrementScore = () => {
        fetch('http://localhost:3000/imageSuccess', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.user.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('return data', data)
                this.setState({ user: { entries: data['entries'] } })
            })
            .catch((err) => {
                console.log('Error: ', err)
            })
    }

    // saveColors = (data) => {
    //     fetch('http://localhost:3000/saveColors', {
    //         method: 'put',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             id: this.state.user.id,
    //         }),
    //     }).catch((err) => {
    //         console.log('Error: problem in /saveColors', err)
    //     })
    // }

    onColorDetectSuccess = () => {
        this.setState({ detectSuccess: true })
        this.IncrementScore()
    }

    extractColorData = (data) => {
        console.log(data)
        const colorsArr = data.outputs[0].data.colors.map((color) => {
            console.log(color)
            return color['w3c']
        })

        this.setState({
            colors: colorsArr,
        })
        return colorsArr
    }

    deleteResults = () => {
        this.setState({ imageURL: '' })
        this.setState({ colors: [] })
        this.setState({ detectSuccess: false })
    }

    render() {
        const {
            imageURL,
            colors,
            isSignedIn,
            route,
            detectSuccess,
        } = this.state
        const { entries, name } = this.state.user
        return (
            <div className="App serif vh-100">
                <Particles className="particles" params={particlesOptions} />
                <Navigation
                    className=""
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {route === 'home' ? (
                    <div className="body">
                        <Logo />
                        <Rank
                            className="center"
                            name={name}
                            entries={entries}
                        />
                        <ImageInputForm
                            onInputChange={this.onInputChange}
                            onSubmitForm={this.onSubmitForm}
                        />
                        {detectSuccess === true ? (
                            <ColorDetection
                                deleteResults={this.deleteResults}
                                colors={colors}
                                imageURL={imageURL}
                            />
                        ) : (
                            <p className="pa5 f4">No Image Detected</p>
                        )}
                        <Footer />
                    </div>
                ) : route === 'signin' ? (
                    <SignIn
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                ) : (
                    <Register
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                    />
                )}
            </div>
        )
    }
}

export default App

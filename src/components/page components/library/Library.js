import React from 'react'

class Library extends React.Component {
    constructor() {
        super()
        this.state = {
            colorLibrary: this.props.colorLibrary,
        }
    }

    render() {
        const { colorLibrary } = this.state
        return (
            <section id="color-grid" className="w-80">
                {colorLibrary.map((color) => {
                    ;<div>
                        {`${color.hex}`}
                        <div className="dim" style={{ background: hex }}></div>
                    </div>
                })}
            </section>
        )
    }
}

export default Library

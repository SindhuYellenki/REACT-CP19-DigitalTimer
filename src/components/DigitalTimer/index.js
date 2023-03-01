import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: '00',
    play: false,
    displayTime: 25,
  }

  onClickPausePlay = () => {
    const {play} = this.state
    if (play === false) {
      const {minutes, seconds} = this.state
      let totalSeconds = minutes * 60 + parseInt(seconds)
      this.timerId = setInterval(() => {
        totalSeconds = totalSeconds - 1
        let newMinutes = Math.floor(totalSeconds / 60)
        if (newMinutes < 10) {
          newMinutes = `0${newMinutes}`
        }
        let newSeconds = totalSeconds - newMinutes * 60
        if (newSeconds < 10) {
          newSeconds = `0${newSeconds}`
        }
        this.setState({
          minutes: newMinutes,
          seconds: newSeconds,
          play: true,
        })
        if (newMinutes === 0 && newSeconds === 0) {
          this.setState({play: false})
          clearInterval(this.timerId)
        }
      }, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState({play: false})
    }
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState({play: false, minutes: 25, seconds: '00'})
  }

  onClickIncrease = () => {
    this.setState(p => ({
      minutes: p.minutes + 1,
      seconds: '00',
      displayTime: p.displayTime + 1,
    }))
  }

  onClickDecrease = () => {
    this.setState(p => ({
      minutes: p.minutes - 1,
      seconds: '00',
      displayTime: p.displayTime - 1,
    }))
  }

  getPlayObj = () => {
    const {play} = this.state
    return play
      ? {
          timerText: 'Running',
          buttonUrl:
            'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
          buttonAlt: 'pause icon',
          buttonText: 'Pause',
        }
      : {
          timerText: 'Paused',
          buttonUrl:
            'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
          buttonAlt: 'play icon',
          buttonText: 'Start',
        }
  }

  render() {
    const {play, minutes, seconds, displayTime} = this.state
    const playObj = this.getPlayObj()
    const {timerText, buttonUrl, buttonText, buttonAlt} = playObj
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-text-container">
          <div className="timer-container">
            <div className="timer-round-container">
              <h1 className="timer">
                {minutes}:{seconds}
              </h1>
              <p className="timerStatus">{timerText}</p>
            </div>
          </div>
          <div className="text-container">
            <div className="start-reset-pause-container">
              <div className="start-pause-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.onClickPausePlay}
                >
                  <img
                    className="start-stop-image"
                    src={buttonUrl}
                    alt={buttonAlt}
                  />
                  {buttonText}
                </button>
              </div>
              <button
                type="button"
                className="button"
                onClick={this.onClickReset}
              >
                <img
                  className="start-stop-image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="para">Set Timer Limit</p>
            <div className="plus-minus-container">
              <button
                className="sign"
                type="button"
                disabled={play}
                onClick={this.onClickDecrease}
              >
                -
              </button>
              <p type="text" className="setTime">
                {displayTime}
              </p>
              <button
                className="sign"
                type="button"
                disabled={play}
                onClick={this.onClickIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

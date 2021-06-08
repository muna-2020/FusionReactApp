/**
* @name GetInitialState
* @summary Initializes the objContext.state.
* @returns {object} initial objContext.state. object
*/
export function GetInitialState(props) {
    let iCurrentTime = props.iCurrentTime ? props.iCurrentTime : 0;
    iCurrentTime = Math.ceil(iCurrentTime);
    let iEndTime = props.iEndTime ? props.iEndTime : 0
    iEndTime = Math.ceil(iEndTime);
    let blnControlsRestricted = props.ControlsRestricted != null ? props.ControlsRestricted : false;
    return {
        "SliderControls": {
            "iCurrentTime": iCurrentTime,
            "iEndTime": iEndTime,
            "blnPlay": false,
            "blnMute": false,
            "blnDisableVolumeControl": props.DisableVolumeControl != null ? props.DisableVolumeControl : false,
            "blnDisplayPlayControl": props.DisablePlayControl != null ? props.DisablePlayControl : false,
            "blnPlayerSliderActive": false,
            "PlayerSliderWidth": 0,
            "blnVolumeSliderActive": false,
            "VolumeSliderWidth": 50,
            "blnResetPlayer": false,
            "blnFastForward": blnControlsRestricted && props.iMediaReplay != null && props.iMediaReplay <= 2 ? false : true,
            "blnDisablePlayClick": props.DisablePlayClick != null ? props.DisablePlayClick : false,
            "blnDisablePauseClick": props.DisablePauseClick != null ? props.DisablePauseClick : false,
            "iMediaReplay": props.iMediaReplay != null ? props.iMediaReplay : 3, // 3 is a default value for unlimited times
            "blnControlsRestricted": blnControlsRestricted,
            "iMediaPlayed": 0,
            "blnDisplayTextMessage": props.DisplayTextMessage != null ? props.DisplayTextMessage : true,
            "blnInitialRender": true
        }
    }
}

export function GetDefaultDisplayText() {
    return {
        "Initial1Time": "Playable One time",
        "Initial2Time": "Playable Two time",
        "UnlimitedPlay": "Playable unlimited time",
        "Play1Time": "Play 1 of 1",
        "Play2Time": "Play # of 2",
        "Limit1Play": "You have already heard the audio once. No further playback",
        "Limit2Play": "You have already heard the audio twice. No further playback"
    }
}